import { Terminal } from "@xterm/xterm";
import { FitAddon } from "xterm-addon-fit";
import { useEffect, useRef, useState, useContext } from "react";
import { ConnectedProcessContext } from "../../context/ConnectedProcess";
import "xterm/css/xterm.css";
import { useParams } from "react-router-dom";

export default function FeedTerminal() {
  const { processId } = useParams();
  const { connectedProcess, disconnectProcess } = useContext(
    ConnectedProcessContext
  );
  const terminalRef = useRef<HTMLDivElement | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const [terminal, setTerminal] = useState<Terminal | null>(null);
  const [fitAddon, setFitAddon] = useState<FitAddon | null>(null);
  const [isTerminalInitialized, setIsTerminalInitialized] = useState(false);

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

      const newFitAddon = new FitAddon();
      newTerminal.loadAddon(newFitAddon);
      newTerminal.open(terminalRef.current);
      newFitAddon.fit();

      setTerminal(newTerminal);
      setFitAddon(newFitAddon);
      setIsTerminalInitialized(true);
    }

    return () => {
      terminalRef.current = null;
      terminal?.dispose();
      disconnectProcess();
    };
  }, [terminal, isTerminalInitialized]);

  useEffect(() => {
    if (isTerminalInitialized && terminal && connectedProcess?.isConnected) {
      try {
        const liveFeed: any = connectedProcess?.selectedProcessHistory;
        if (liveFeed) {
          liveFeed
            .split("\n")
            .map((feed: any) => terminal.writeln("\r" + feed));
          terminal.scrollToBottom();
        }
      } catch (error: any) {
        console.error("Error displaying data:", error.message);
      }
    }
  }, [
    connectedProcess?.selectedProcessHistory,
    terminal,
    isTerminalInitialized,
  ]);

  useEffect(() => {
    if (terminal !== null) {
      terminal.reset();
    }
  }, [processId]);

  // Observe wrapperRef changes
  useEffect(() => {
    if (wrapperRef.current) {
      const resizeObserver = new ResizeObserver(() => {
        if (fitAddon) {
          fitAddon.fit();
        }
      });

      resizeObserver.observe(wrapperRef.current);

      return () => {
        resizeObserver.disconnect();
      };
    }
  }, [wrapperRef.current, fitAddon]);

  return (
    <div ref={wrapperRef} className=" w-full h-full relative">
      <div
        ref={terminalRef}
        className={`w-full h-full absolute top-0 left-0 right-0 bottom-0 p-2 overflow-hidden ${
          connectedProcess?.isConnected ? "h-96" : "opacity-0"
        }`}
      ></div>
    </div>
  );
}
