import { Terminal } from "@xterm/xterm";
import { FitAddon } from "xterm-addon-fit";
import { useEffect, useRef, useState } from "react";
import "xterm/css/xterm.css";
import { useParams } from "react-router-dom";
import { Readline } from "xterm-readline";

interface InputTerminalProps {
  userCommand: string;
  userCommandResult: string;
}

export default function InputTerminal({
  userCommand,
  userCommandResult,
}: InputTerminalProps) {
  const { processId } = useParams();
  const terminalRef = useRef<HTMLDivElement | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const [terminal, setTerminal] = useState<Terminal | null>(null);
  const [fitAddon, setFitAddon] = useState<FitAddon | null>(null);
  const [isTerminalInitialized, setIsTerminalInitialized] = useState(false);
  const [readLine, setReadLine] = useState<any>(null);

  // Initialize the terminal and basic configurations
  useEffect(() => {
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

      setTerminal(newTerminal);
      setFitAddon(new FitAddon());

      newTerminal.open(terminalRef.current);
      setIsTerminalInitialized(true);
    }

    return () => {
      terminalRef.current = null;
      terminal?.dispose();
    };
  }, [terminal, isTerminalInitialized]);

  // Load add-ons after fitAddon is set
  useEffect(() => {
    if (fitAddon && terminal) {
      terminal.loadAddon(fitAddon);
      const readline = new Readline();
      setReadLine(readline);
      terminal.loadAddon(readline);
      fitAddon.fit();
    }
  }, [fitAddon, terminal]);

  // Focus the terminal after initialization
  useEffect(() => {
    if (isTerminalInitialized && terminal) {
      terminal.focus();
    }
  }, [isTerminalInitialized, terminal]);

  // Write the command to the terminal
  useEffect(() => {
    if (isTerminalInitialized && terminal && userCommand) {
      terminal.writeln(`aos> ${userCommand}`); // Write the command
    }
  }, [userCommand, isTerminalInitialized, terminal]);

  // Write the command result to the terminal
  useEffect(() => {
    if (isTerminalInitialized && terminal && readLine && userCommandResult) {
      readLine.println("\r" + ">" + userCommandResult);
    }
  }, [userCommandResult, isTerminalInitialized, terminal, readLine]);

  // Reset the terminal on processId change
  useEffect(() => {
    if (terminal !== null) {
      terminal.reset();
    }
  }, [processId, terminal]);

  // Handle resize button click
  const handleResize = () => {
    if (fitAddon) {
      fitAddon.fit();
    }
  };

  // Observe wrapperRef changes
  useEffect(() => {
    if (wrapperRef.current) {
      const resizeObserver = new ResizeObserver(() => {
        handleResize();
      });

      resizeObserver.observe(wrapperRef.current);

      return () => {
        resizeObserver.disconnect();
      };
    }
  }, [wrapperRef.current, fitAddon]);

  return (
    <div ref={wrapperRef} className="relative h-full w-full">
      <div
        ref={terminalRef}
        className="w-full h-full absolute left-0 top-0 right-0 bottom-0 overflow-hidden flex flex-col "
      ></div>
    </div>
  );
}
