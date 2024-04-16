import { connect, createDataItemSigner } from '@permaweb/aoconnect';
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

    if (result.Output?.data?.output) {
        return result.Output?.data?.output
    }

    return undefined
}

export async function loadBluePrint(name: string) {
    try {
        const data = await fetch(`https://raw.githubusercontent.com/permaweb/aos/main/blueprints/${name}.lua`);
        const response = await data.text();
        return response;
    } catch (error: any) {
        console.error("Error loading blueprint: ", error.message);
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

    return data.data?.transactions?.edges?.map((x: any) => x.node.id);
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
              id
            }
          }
        }
      }`
}