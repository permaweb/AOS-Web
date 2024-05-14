import { useContext, useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import SidebarProcessPanel from "../../components/data_component/SidebarProcessPanel";
import BreadcrumbChevron from "../../components/icons/BreadcrumbChevron";
import TerminalIcon from "../../components/icons/TerminalIcon";
import TerminalEmptyState from "../../components/empty_states/TerminalEmptyState";
import SmallButton from "../../components/SmallButton";
import FeedIcon from "../../components/icons/FeedIcon";
import { MainLayout } from "../../components/layouts";
import FeedTerminal from "../../components/data_component/FeedTerminal";
import { ConnectedProcessContext } from "../../context/ConnectedProcess";
import ConnectProcessModal from "../../components/modals/ConnectProcessModal";
import CreateProcessModal from "../../components/modals/CreateProcessModel";
import { TextareaField } from "../../components/input";
import { InputTerminal } from "../../components/Terminals";
import { loadBluePrint } from "../../helpers/aos";
import PreDefinedCommands from "../../components/PreDefinedCommands";
import EditorModal from "../../components/modals/EditorModal";

export default function Dashboard() {
  const { processId } = useParams();
  const { connectProcess, sendCommand } = useContext(ConnectedProcessContext);
  const [commandToRun, setCommandToRun] = useState<string>("");
  const [userCommand, setUserCommand] = useState<string>("");
  const [userCommandResult, setUserCommandResult] = useState<any>(null);
  const [sendingCommand, setSendingCommand] = useState<boolean>(false);
  const [showEditor, setShowEditor] = useState<boolean>(false);
  const [editorValue, setEditorValue] = useState<string>("");

  const mode: "starter" | "process" = processId ? "process" : "starter";

  const resizeElement = useRef<HTMLDivElement>(null);
  const terminalResizeElement = useRef<HTMLDivElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const terminalParentRef = useRef<HTMLDivElement>(null);
  const [sideBarWidth, setSideBarWidth] = useState<number>(() => {
    const localStorageWidth: string | null =
      localStorage.getItem("sideBarWidth");
    if (typeof localStorageWidth === "string")
      return parseFloat(localStorageWidth);
    return 250;
  });
  const [terminalWidth, setTerminalWidth] = useState<number>(() => {
    const localStorageWidth: string | null =
      localStorage.getItem("terminalWidth");
    if (typeof localStorageWidth === "string")
      return parseFloat(localStorageWidth);
    return 600;
  });

  const [createModelOpen, setCreateModelOpen] = useState<boolean>(false);
  const [connectModelOpen, setConnectModelOpen] = useState<boolean>(false);

  useEffect(() => {
    if (resizeElement.current) {
      const resizeSidebar = (e: MouseEvent) => {

        if (resizeElement.current) {
          const newWidth = e.clientX;
          setSideBarWidth(newWidth);
          localStorage.setItem("sideBarWidth", `${newWidth}`);
        }
      };
      const stopResize = () => {
        window.removeEventListener("mousemove", resizeSidebar, false);
        window.removeEventListener("mouseup", stopResize, false);
      };
      const initResize = () => {
        window.addEventListener("mousemove", resizeSidebar, false);
        window.addEventListener("mouseup", stopResize, false);
      };
      resizeElement.current.addEventListener("mousedown", initResize, false);

      return () => {
        if (resizeElement.current)
          resizeElement.current.removeEventListener(
            "mousedown",
            initResize,
            false
          );
        stopResize();
      };
    }
  }, [resizeElement]);

  useEffect(() => {
    if (
      terminalResizeElement.current &&
      terminalRef.current &&
      terminalParentRef.current
    ) {
      const resizeTerminal = (e: MouseEvent) => {
        if (terminalParentRef.current) {
          const parentWidth = terminalParentRef.current.offsetWidth;
          const resizeOffsetLeft =
            terminalResizeElement.current?.getBoundingClientRect().width || 0;
          if (terminalRef.current && terminalResizeElement.current) {
            const newWidth =
              ((e.clientX -
                terminalRef.current.getBoundingClientRect().left +
                resizeOffsetLeft / 2) /
                parentWidth) *
              100;
            setTerminalWidth(newWidth);
            localStorage.setItem("terminalWidth", newWidth.toString());
          }
        }
      };

      const stopResize = () => {
        window.removeEventListener("mousemove", resizeTerminal, false);
        window.removeEventListener("mouseup", stopResize, false);
      };

      const initResize = () => {
        window.addEventListener("mousemove", resizeTerminal, false);
        window.addEventListener("mouseup", stopResize, false);
      };

      terminalResizeElement.current.addEventListener(
        "mousedown",
        initResize,
        false
      );

      return () => {
        if (terminalResizeElement.current) {
          terminalResizeElement.current.removeEventListener(
            "mousedown",
            initResize,
            false
          );
        }
        stopResize();
      };
    }
  }, [terminalResizeElement, terminalRef, terminalParentRef]);

  // procecssId
  useEffect(() => {
    if (processId !== undefined && processId !== null && processId !== "") {
      connectProcess(processId);
    }
  }, [processId]);

  const [showPreDefinedCommands, setShowPreDefinedCommands] = useState<boolean>(false);
  const handleKeyUp = (e: any) => {
    const position = e.target.selectionStart;
    const lastChar = commandToRun.slice(position - 1, position);
    if (lastChar === "/") {
      setShowPreDefinedCommands(true);
    } else {
      setShowPreDefinedCommands(false);
    }
  };

  const handleRunCommand = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (commandToRun === "") return;
      if (/\.editor/.test(commandToRun)) {
        setShowEditor(true);
        setCommandToRun("");
        return;
      }

      if (processId === undefined || processId === null || processId === "") return;
      setSendingCommand(true);
      setUserCommand(commandToRun);
      let command = commandToRun;
      setCommandToRun("");

      const loadBlueprintExp = /\.load-blueprint\s+(\w*)/;
      if (loadBlueprintExp.test(command)) {
        const [, name] = command.match(loadBlueprintExp) || [];
        setUserCommandResult(`loading ${name}...`);
        await loadBluePrint(name);
        setUserCommandResult(`undefined`);
      } else {
        const result = await sendCommand(processId, command);
        setUserCommandResult(`${result}`);
      }

      setSendingCommand(false);
    } catch (error) {
      setSendingCommand(false);
      console.error(error);
      setUserCommand(`failed: ${error}`);
    }
  };

  const handleExpressionLoad = async () => {
    try {
      if (processId === undefined || processId === null || processId === "") return;
      setSendingCommand(true);
      setUserCommand("load expression");

      const result = await sendCommand(processId, editorValue);
      setUserCommandResult(`${result}`);
      console.log(result);

      setSendingCommand(false);
      setEditorValue("");
      setShowEditor(false);
    } catch (error) {
      setShowEditor(false);
      setSendingCommand(false);
      console.error(error);
      setUserCommand(`failed to load expression: ${error}`);
    }
  };

  return (
    <MainLayout>
      <>
        <div className="grid grid-rows-[auto,1fr] h-full w-full overflow-clip">
          <div className="grid grid-cols-[auto,1fr] min-h-0">
            <div
              className="flex flex-col relative gap-5 border-r-1 border-light-gray-color "
              style={{ width: Math.max(sideBarWidth, 200) }}
            >
              <div
                ref={resizeElement}
                className="absolute -right-2 top-0 bottom-0 w-4 hover:cursor-col-resize select-none h-[92vh] "
              />
              <SidebarProcessPanel
                processId={processId}
                showConnectModal={setConnectModelOpen}
                showCreateModal={setCreateModelOpen}
              />
            </div>

            <div className="flex flex-col p-5 gap-5 min-h-0 ">
              {processId && (
                <div className="text-xs uppercase flex items-center gap-2">
                  <Link to={"/"}>My Processes</Link>

                  <BreadcrumbChevron />
                  <Link to={`/process/${processId}`} className="normal-case">{processId}</Link>
                </div>
              )}

              <div ref={terminalParentRef} className="flex flex-grow min-h-0">
                <div
                  ref={terminalRef}
                  style={{
                    width: `${Math.min(Math.max(terminalWidth, 20), 90)}%`,
                  }}
                  className="relative flex-shrink-0 flex flex-col min-h-0 pr-5"
                >
                  <div
                    ref={terminalResizeElement}
                    className="absolute right-0 top-0 bottom-0 w-6 hover:cursor-col-resize select-none"
                  />
                  <div className="text-xs uppercase flex gap-1.5 items-center  ">
                    <TerminalIcon />
                    <span>Terminal</span>
                  </div>
                  <div className="flex flex-col flex-grow overflow-y-auto overflow-x-hidden min-h-0">
                    {mode === "starter" ? (
                      <TerminalEmptyState
                        showCreateModal={setCreateModelOpen}
                        showConnectModal={setConnectModelOpen}
                      />
                    ) : mode === "process" ? (
                      <InputTerminal
                        userCommand={userCommand}
                        userCommandResult={userCommandResult}
                      />
                    ) : ""
                    }
                  </div>
                  <form
                    onSubmit={handleRunCommand}
                    className={
                      "relative flex gap-2 border-1 transition-colors border-gray-text-color rounded-lg  focus-within:border-primary-dark-color " +
                      (mode === "starter"
                        ? "select-none pointer-events-none opacity-50"
                        : "")
                    }
                  >
                    {
                      sendingCommand && (
                        <span className="absolute bottom-16 text-sm left-1/2 -translate-x-1/2 ">Processing...</span>
                      )
                    }

                    <PreDefinedCommands
                      isOpen={showPreDefinedCommands}
                      setIsOpen={setShowPreDefinedCommands}
                      setSendingCommand={setSendingCommand}
                      setUserCommand={setUserCommand}
                      setUserCommandResult={setUserCommandResult}
                      setCommandToRun={setCommandToRun}
                    />

                    <label
                      htmlFor="runCommandInput"
                      className="flex-grow h-full relative"
                    >
                      <span className="absolute left-3 top-3">{"aos>"}</span>
                      <TextareaField
                        name="runCommandInput"
                        className="py-3 pl-13 w-full bg-transparent h-12 resize-none outline-none min-h-0 overflow-hidden "
                        spellCheck="false"
                        onChange={(e: any) => setCommandToRun(e.target.value)}
                        value={commandToRun}
                        onKeyUp={handleKeyUp}
                      />
                    </label>

                    <div className="p-1.5">
                      <SmallButton text="run" type="submit" />
                    </div>
                  </form>
                </div>
                <div className="flex flex-grow flex-shrink flex-col border-1 border-light-gray-color rounded-smd min-h-0 min-w-0">
                  <div className="text-xs uppercase flex gap-1.5 items-center border-b-1 border-light-gray-color px-4 py-2.5">
                    <FeedIcon />
                    <span>Feed</span>
                  </div>
                  <div className="flex flex-grow overflow-y-auto overflow-x-hidden min-h-0">
                    <FeedTerminal />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ConnectProcessModal openModal={connectModelOpen} setOpenModal={setConnectModelOpen} />
        <CreateProcessModal openModal={createModelOpen} setOpenModal={setCreateModelOpen} />
        <EditorModal openModal={showEditor} setOpenModal={setShowEditor} editorValue={editorValue} setEditorValue={setEditorValue} loadCode={handleExpressionLoad} />
      </>
    </MainLayout>
  )
}
