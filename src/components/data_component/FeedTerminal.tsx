import { Terminal } from "@xterm/xterm";
import { FitAddon } from 'xterm-addon-fit';
import React from "react";
import { ConnectedProcessContext } from "../../context/ConnectedProcess";
import 'xterm/css/xterm.css';
import { useParams } from "react-router-dom";

export default function FeedTerminal() {
    const { processId } = useParams();
    const { connectedProcess, disconnectProcess } = React.useContext(ConnectedProcessContext);
    const terminalRef = React.useRef<any>(null);
    const [terminal, setTerminal] = React.useState<any>(null);
    const [isTerminalInitialized, setIsTerminalInitialized] = React.useState(false);

    React.useEffect(() => {
        if (terminalRef.current && terminal == null && !isTerminalInitialized) {
            const newTerminal = new Terminal({
                cursorBlink: true,
                theme: {
                    background: "#f2f2f2",
                    foreground: "#191A19",
                    selectionForeground: "#f2f2f2",
                    selectionBackground: "#191A19",
                    cursor: "black",
                    cursorAccent: "black",
                    black: "#191A19",
                },
            });

            const fitAddon = new FitAddon();
            newTerminal.loadAddon(fitAddon);
            newTerminal.open(terminalRef.current);
            fitAddon.fit();

            setTerminal(newTerminal); // Save the terminal instance
            setIsTerminalInitialized(true);
        }

        return () => {
            terminalRef.current = null
            terminal?.dispose();
            disconnectProcess();
        };
    }, [terminal, isTerminalInitialized]);

    React.useEffect(() => {
        if (isTerminalInitialized && terminal && connectedProcess?.isConnected) {
            try {
                const liveFeed: any = connectedProcess?.selectedProcessHistory;
                if (liveFeed) {
                    liveFeed.split("\n").map((feed: any) => terminal.writeln("\r" + feed));
                    terminal.scrollToBottom();
                }
            } catch (error: any) {
                console.error("Error displaying data:", error.message);
            }
        }
    }, [connectedProcess?.selectedProcessHistory, terminal, isTerminalInitialized]);

    React.useEffect(() => {
        if (terminal !== null) {
            terminal.reset();
        }
    }, [processId]);

    return (
        <div className="w-full h-full flex items-center justify-center p-5">
            <div className="flex flex-col gap-1 w-full relative">
                <span className="uppercase font-bold max-w-52">This is your feed</span>
                <div ref={terminalRef} className={`w-full  ${connectedProcess?.isConnected ? "h-96" : "opacity-0"}`}></div>

                <div className={`font-dm-sans absolute top-10  ${connectedProcess?.isConnected ? "hidden" : "block"}`}>
                    Outputs from your commands will show up here.
                </div>
            </div>
        </div>
    )
}