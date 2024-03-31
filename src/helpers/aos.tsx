import { connect } from '@permaweb/aoconnect'

export async function live(pid: string) {
    let cursor: any = "";

    let results = await connect().results({
        process: pid,
        sort: "DESC",
        limit: 1
    });

    const xnode = results.edges.filter(
        (x: any) => x.node.Output.print === true
    )[0]

    if (xnode) {
        cursor = xnode.cursor
        //console.log(xnode.node.Output.data)
        return xnode.node.Output.data
    }

    return null
}