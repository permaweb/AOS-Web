import { Terminal } from "@xterm/xterm";
import { FitAddon } from 'xterm-addon-fit';
import React from "react";
import 'xterm/css/xterm.css';

interface InputTerminalProps {
    userCommand: string;
    userCommandResult: string;
}

export default function InputTerminal({ userCommand, userCommandResult }: InputTerminalProps) {
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
        };
    }, [terminal, isTerminalInitialized]);

    React.useEffect(() => {
        if (isTerminalInitialized && terminal) {
            terminal.focus();
        }
    }, [isTerminalInitialized, terminal]);

    // Write the command to the terminal
    React.useEffect(() => {
        if (isTerminalInitialized && terminal) {
            terminal.writeln(`aos> ${userCommand}`); // Write the command
        }
    }, [userCommand]);

    React.useEffect(() => {
        if (isTerminalInitialized && terminal) {
            console.log("userCommandResult", userCommandResult);
            terminal.writeln("\r" + ">" + userCommandResult); // Write the command result
        }
    }, [userCommandResult]);

    return (
        <>
            <div ref={terminalRef} className={`w-full h-full mt-4 `}></div>
        </>
    )
}