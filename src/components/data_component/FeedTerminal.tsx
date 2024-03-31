import { Terminal } from "@xterm/xterm";
import { useContext, useEffect } from "react";
import { ConnectedProcessContext } from "../../context/ConnectedProcess";

export default function FeedTerminal() {
    const { connectedProcess, disconnectProcess } = useContext(ConnectedProcessContext);
    let feed: Terminal | null = null;

    const goLive = () => {
        if (!feed) {
            feed = new Terminal({
                theme: {
                    background: "#FFF",
                    foreground: "#191A19",
                    selectionForeground: "#FFF",
                    selectionBackground: "#191A19",
                    cursor: "black",
                    cursorAccent: "black",
                    black: "#191A19",
                },
            });

            const liveFeed = document.getElementById("live_feed");
            if (liveFeed) {
                feed.open(liveFeed);
                feed.resize(feed.cols, 100);
            }
        }

        feed.writeln("Connecting to your process...");
        connectedProcess?.data.split("\n").map((row: any) => feed!.writeln("\r" + row));
    }

    useEffect(() => {
        if (connectedProcess && feed !== null) {
            goLive();
        }

        return () => {
            disconnectProcess();
            if (feed) {
                feed.dispose();
                feed = null;
            }
        };
    }, [connectedProcess?.data]);

    return (
        <div className="w-full h-full flex items-center justify-center p-5">
            <div className="flex flex-col gap-1 w-full">
                <span className="uppercase font-bold max-w-52">This is your feed</span>
                {
                    connectedProcess?.data ? (
                        <div id="live_feed" className="w-full h-96 bg-white rounded-md shadow-md"></div>
                    ) : (
                        <div className="font-dm-sans">
                            Outputs from your commands will show up here.
                        </div>
                    )
                }
            </div>
        </div>
    )
}