import { connect, createDataItemSigner, dryrun } from '@permaweb/aoconnect';
import { AOS_MODULE, AOS_SCHEDULER, GOLD_SKY_GQL } from './constants';

export async function live(pid: string) {
    let cursor: any = "";

    const connection = {
        process: pid,
        sort: "DESC",
        cursor,
        limit: 1
    }

    let results = await connect().results(connection);

    const xnode = results.edges.filter(
        (x: any) => x.node.Output.print === true
    )[0]

    if (xnode) {
        cursor = xnode.cursor
        // console.log("xnode.node.Output.data", xnode.node.Output.data)
        return xnode.node.Output.data
    }

    return null
}

export async function register(name: string, signer: any) {
    if (name === "") {
        throw new Error("Name cannot be empty")
    }


    const aos = connect();
    const pid = await aos.spawn({
        module: AOS_MODULE,
        scheduler: AOS_SCHEDULER,
        signer: createDataItemSigner(signer),
        tags: [
            { name: 'Name', value: name },
            { name: 'Version', value: 'web-0.0.1' }
        ],
        data: '1984'
    })

    return pid
}

export async function evaluate(pid: string, command: string, signer: any) {
    const aos = connect();

    const messageId = await aos.message({
        process: pid,
        signer: createDataItemSigner(signer),
        tags: [{ name: 'Action', value: 'Eval' }],
        data: command
    });

    const result = await aos.result({
        process: pid,
        message: messageId
    });


    if (result.Error) {
        throw new Error(result.Error)
    }

    if (result.Output?.data) {
        return result.Output?.data
    }

    return undefined
}

export async function loadBluePrint(name: string) {
    try {
        const data = await fetch(`https://raw.githubusercontent.com/permaweb/aos/main/blueprints/${name}.lua`);
        if (data.status == 200) {
            const response = await data.text();
            return response;
        }
        return `-- Error loading blueprint: ${data.statusText}`
    } catch (error: any) {
        console.error("Error loading blueprint: ", error.message);
        return `-- Error loading blueprint: ${error.message}`
    }
}

export async function getQuests(owner: string) {
    try {
        const response = await dryrun({
            process: "ge3fE2WaLbPYAfRIf7fRMC_R4A2_V729Yws6U0kGBy4",
            Owner: owner,
            tags: [
                { name: 'Action', value: 'List' },
                { name: 'Format', value: 'json' }
            ],
        });

        const data = response.Messages[0].Data;
        // Remove the headers and separators from the rows
        let rows = data.trim().split('\n');
        rows.shift(); // remove the header row
        rows.shift(); // remove the separator row

        // console.log("rows", rows);

        // Create the array of objects
        const dataArray = rows.map((row: any) => {
            const matches = row.match(/^\s*(\d+)\s+([\w\s-:<>\(\)]+?)\s+(\d+(?:\.\d+)?(?:\s*\(\w+\))?)\s*$/);

            return {
                QuestId: matches && matches[1] ? matches[1].trim() : null,
                Name: matches && matches[2] ? matches[2].trim() : null,
                CRED: matches && matches[3] ? matches[3].trim() : null,
            };
        });

        return dataArray;
    } catch (error: any) {
        console.error("Error getting quests: ", error.message);
        return [];
    }
};

export async function getQuest(owner: string, questId: string) {
    try {
        const quest = await dryrun({
            process: "ge3fE2WaLbPYAfRIf7fRMC_R4A2_V729Yws6U0kGBy4",
            Owner: owner,
            tags: [
                { name: 'Action', value: 'Detail' },
                { name: 'Index', value: questId },
            ],
        });

        const data = quest.Messages[0].Data;

        return data;
    } catch (error: any) {
        console.error("Error getting quest: ", error.message);
        return null;
    }
}

export async function findMyPIDs(signer: any) {
    const processes = await fetch(GOLD_SKY_GQL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            query: findMyPIDsQuery(signer)
        })
    });

    const data = await processes.json();
    if (data.errors) {
        throw new Error(data.errors[0].message)
    }

    return data.data?.transactions?.edges?.map((x: any) => {
        // x.node.id
        const processName = x.node.tags.find((tag: any) => tag.name === "Name")?.value;
        return {
            id: x.node.id,
            name: processName
        }
    });
}

function findMyPIDsQuery(owner: string) {
    return `query {
        transactions(owners: ["${owner}"], tags: [
          {name: "Type", values: ["Process"]},
          {name: "Variant", values: ["ao.TN.1"]},
          {name: "Data-Protocol", values: ["ao"]}
        ]) {
          edges {
            node {
              id,
              tags{
                name,
                value
              }
            }
          }
        }
      }`
}