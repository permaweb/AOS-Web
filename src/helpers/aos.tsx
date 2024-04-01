import { connect } from '@permaweb/aoconnect'

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
        (x: any) => x.node.Output.data.output !== null
    )[0]

    if (xnode) {
        cursor = xnode.cursor
        // console.log(xnode.node.Output.data)
        return xnode.node.Output.data
    }

    return null
}