import { useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import SidebarProcessPanel from "../../components/data_component/SidebarProcessPanel";
import { MainLayout } from "../../components/layouts";
import { ConnectedProcessContext } from "../../context/ConnectedProcess";
import ConnectProcessModal from "../../components/modals/ConnectProcessModal";
import CreateProcessModal from "../../components/modals/CreateProcessModel";
import { loadBluePrint } from "../../helpers/aos";
import EditorModal from "../../components/modals/EditorModal";
import { TabSelector } from "../../components/input";
import { TabState } from "../../components/input/TabSelector";
import QuestsPanel from "../../components/modals/QuestsPanel";
import Breadcrumbs from "../../components/dashboard_components/Breadcrumbs";
import FeedWrapper from "../../components/data_component/FeedWrapper";
import SmallQuestsButton from "../../components/SmallQuestionsButton";
import CommandInputForm from "../../components/input/CommandInputForm";
import TerminalOutput from "../../components/data_component/TerminalOutput";

export default function Dashboard() {
  const { processId } = useParams();
  const { connectProcess, sendCommand, connectedProcess } = useContext(
    ConnectedProcessContext
  );
  const [commandToRun, setCommandToRun] = useState<string>("");
  const [userCommand, setUserCommand] = useState<string>("");
  const [userCommandResult, setUserCommandResult] = useState<any>(null);
  const [sendingCommand, setSendingCommand] = useState<boolean>(false);
  const [showEditor, setShowEditor] = useState<boolean>(false);
  const [editorValue, setEditorValue] = useState<string>("");
  const [prompt, setPrompt] = useState("aos> ");

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
    return 50;
  });

  const [createModelOpen, setCreateModelOpen] = useState<boolean>(false);
  const [connectModelOpen, setConnectModelOpen] = useState<boolean>(false);
  const [currentTab, setCurrentTab] = useState<TabState>("terminal"); // Track the current tab
  const [showMobileQuests, setShowMobileQuests] = useState<boolean>(false);

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

  const [showPreDefinedCommands, setShowPreDefinedCommands] =
    useState<boolean>(false);
  const handleKeyUp = (e: any) => {
    const position = e.target.selectionStart;
    const lastChar = commandToRun.slice(position - 1, position);
    if (lastChar === ".") {
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

      if (processId === undefined || processId === null || processId === "")
        return;
      setSendingCommand(true);
      setUserCommand(commandToRun);
      let command = commandToRun;
      setCommandToRun("");

      const loadBlueprintExp = /\.load-blueprint\s+(\w*)/;
      let result: any = null;
      if (loadBlueprintExp.test(command)) {
        const [, name] = command.match(loadBlueprintExp) || [];
        setUserCommandResult(`loading ${name}...`);
        const bluePrint = await loadBluePrint(name);

        result = await sendCommand(processId, bluePrint);
        // console.log("result", result);
        // console.log("bluePrint", bluePrint);
      } else {
        result = await sendCommand(processId, command);
        // console.log("result", result);
      }

      if (result?.output) {
        setUserCommandResult(`${result?.output}`);
      }
      setPrompt(result?.prompt);

      setSendingCommand(false);
      console.log("command sent", connectedProcess);
    } catch (error) {
      setSendingCommand(false);
      console.error(error);
      setUserCommand(`failed: ${error}`);
    }
  };

  const handleExpressionLoad = async () => {
    try {
      if (processId === undefined || processId === null || processId === "")
        return;
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
        <div className="h-full w-full flex-grow hidden md:grid grid-cols-[auto,1fr] min-h-0 ">
          <div
            className="relative flex flex-col gap-5 border-r border-light-gray"
            style={{ width: Math.max(sideBarWidth, 200) }}
          >
            <div
              ref={resizeElement}
              className="absolute -right-2 top-0 bottom-0 w-4 cursor-col-resize select-none"
            />
            <SidebarProcessPanel
              processId={processId}
              showConnectModal={setConnectModelOpen}
              showCreateModal={setCreateModelOpen}
            />
          </div>

          <div className="flex flex-col gap-5 p-5 min-h-0">
            {processId && <Breadcrumbs processId={processId} />}

            <div ref={terminalParentRef} className="flex flex-grow min-h-0">
              <div
                ref={terminalRef}
                style={{
                  width: `${Math.min(Math.max(terminalWidth, 20), 90)}%`,
                }}
                className="relative flex flex-col gap-2 flex-shrink-0 min-h-0 pr-5"
              >
                <div
                  ref={terminalResizeElement}
                  className="absolute right-0 top-0 bottom-0 w-6 cursor-col-resize select-none"
                />

                <TerminalOutput
                  mode={mode}
                  setCreateModelOpen={setCreateModelOpen}
                  setConnectModelOpen={setConnectModelOpen}
                  userCommand={userCommand}
                  userCommandResult={userCommandResult}
                />

                <CommandInputForm
                  handleRunCommand={handleRunCommand}
                  processId={processId}
                  mode={mode}
                  sendingCommand={sendingCommand}
                  showPreDefinedCommands={showPreDefinedCommands}
                  setShowPreDefinedCommands={setShowPreDefinedCommands}
                  setSendingCommand={setSendingCommand}
                  setUserCommand={setUserCommand}
                  setUserCommandResult={setUserCommandResult}
                  setCommandToRun={setCommandToRun}
                  prompt={prompt}
                  commandToRun={commandToRun}
                  handleKeyUp={handleKeyUp}
                />
              </div>
              <FeedWrapper mode={mode} />
            </div>
          </div>
        </div>
        <div className="h-full w-full flex flex-col min-h-0 md:hidden flex-grow">
          <div className="flex items-center  bg-white gap-2 px-4 py-3 border-b-1 border-light-gray-color text-xs uppercase leading-none justify-between">
            <Breadcrumbs processId={processId ? processId : null} />
            <SmallQuestsButton
              handleClick={() => setShowMobileQuests((prevValue) => !prevValue)}
              open={showMobileQuests}
            />
          </div>
          {!showMobileQuests && processId && (
            <TabSelector
              currentTab={currentTab}
              setCurrentTab={setCurrentTab}
            />
          )}

          <div className="flex flex-col flex-grow overflow-y-auto overflow-x-hidden min-h-0">
            <div
              className={!showMobileQuests && !processId ? "block" : "hidden"}
            >
              <SidebarProcessPanel
                processId={processId}
                showConnectModal={setConnectModelOpen}
                showCreateModal={setCreateModelOpen}
              />
            </div>
            <div
              className={` flex-grow flex flex-col min-h-0  ${
                !showMobileQuests && currentTab === "terminal" && processId
                  ? "block"
                  : "hidden"
              }`}
            >
              <div className="grid grid-rows-[1fr,auto] flex-grow p-4">
                <TerminalOutput
                  mode={mode}
                  setCreateModelOpen={setCreateModelOpen}
                  setConnectModelOpen={setConnectModelOpen}
                  userCommand={userCommand}
                  userCommandResult={userCommandResult}
                />
                <CommandInputForm
                  handleRunCommand={handleRunCommand}
                  processId={processId}
                  mode={mode}
                  sendingCommand={sendingCommand}
                  showPreDefinedCommands={showPreDefinedCommands}
                  setShowPreDefinedCommands={setShowPreDefinedCommands}
                  setSendingCommand={setSendingCommand}
                  setUserCommand={setUserCommand}
                  setUserCommandResult={setUserCommandResult}
                  setCommandToRun={setCommandToRun}
                  prompt={prompt}
                  commandToRun={commandToRun}
                  handleKeyUp={handleKeyUp}
                />
              </div>
            </div>
            <div
              className={`flex flex-col min-h-0 flex-grow ${
                !showMobileQuests && currentTab === "feed" && processId
                  ? "block"
                  : "hidden"
              }`}
            >
              <div className="min-h-0 min-w-0 flex flex-col flex-grow flex-shrink p-4">
                <FeedWrapper mode={mode} />
              </div>
            </div>
            {showMobileQuests && (
              <div className="flex flex-col flex-grow bg-primary-dark-color">
                <div className="animate-slide-in-top">
                  <QuestsPanel mode="inline" />
                </div>
              </div>
            )}
          </div>
        </div>
        <ConnectProcessModal
          openModal={connectModelOpen}
          setOpenModal={setConnectModelOpen}
        />
        <CreateProcessModal
          openModal={createModelOpen}
          setOpenModal={setCreateModelOpen}
        />
        <EditorModal
          openModal={showEditor}
          setOpenModal={setShowEditor}
          editorValue={editorValue}
          setEditorValue={setEditorValue}
          loadCode={handleExpressionLoad}
        />
      </>
    </MainLayout>
  );
}
