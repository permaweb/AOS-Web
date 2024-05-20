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
import { TabSelector } from "../../components/input";
import { TabState } from "../../components/input/TabSelector";
import QuestsPanel from "../../components/modals/QuestsPanel";
import { formatId } from "../../helpers/helper";
import SmallQuestIcon from "../../components/icons/SmallQuestIcon";
import StatusLoadingIcon from "../../components/icons/StatusLoadingIcon";
import FeedEmptyState from "../../components/empty_states/FeedEmptyState";

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
            {processId && (
              <div className="flex items-center gap-2 text-xs uppercase leading-none">
                <Link
                  className="hover:ring-2 ring-offset-4 ring-light-gray-color hover:bg-light-gray-color hover:rounded-sm ring-offset-light-gray-color active:text-gray"
                  to="/"
                >
                  My Processes
                </Link>
                <BreadcrumbChevron />
                <Link
                  to={`/process/${processId}`}
                  className="hover:ring-2 ring-offset-4 ring-light-gray-color hover:bg-light-gray-color hover:rounded-sm ring-offset-light-gray-color active:text-gray normal-case"
                >
                  {processId}
                </Link>
              </div>
            )}

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
                <div className="flex gap-1.5 items-center text-xs uppercase">
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
                  ) : (
                    ""
                  )}
                </div>
                <form
                  onSubmit={handleRunCommand}
                  className={`relative flex gap-2 border transition-colors border-gray rounded-lg focus-within:border-primary-dark focus-within:ring-2 ring-offset-2 focus-within:bg-white ${
                    mode === "starter"
                      ? "select-none pointer-events-none opacity-50"
                      : ""
                  }`}
                >
                  {sendingCommand && (
                    <span className="absolute bottom-16 left-1/2 -translate-x-1/2 text-sm">
                      Processing...
                    </span>
                  )}

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
                    className="relative flex-grow h-full"
                  >
                    <span className="absolute left-3 top-3">{"aos>"}</span>
                    <TextareaField
                      name="runCommandInput"
                      className="w-full h-12 py-3 pl-13 bg-transparent resize-none outline-none min-h-0 overflow-hidden"
                      spellCheck="false"
                      onChange={(e: any) => setCommandToRun(e.target.value)}
                      value={commandToRun}
                      onKeyUp={handleKeyUp}
                    />
                  </label>

                  <div className="p-1.5">
                    {sendingCommand ? (
                      <div className="pointer-events-none select-none">
                        <SmallButton
                          text="run"
                          type="submit"
                          IconComponent={StatusLoadingIcon}
                        />
                      </div>
                    ) : (
                      <SmallButton text="run" type="submit" />
                    )}
                  </div>
                </form>
              </div>
              <div className="flex flex-grow flex-shrink flex-col border border-light-gray rounded-smd min-h-0 min-w-0">
                <div className="flex items-center gap-1.5 text-xs uppercase border-b border-light-gray px-4 py-2.5">
                  <FeedIcon />
                  <span>Feed</span>
                </div>
                <div className="flex flex-col flex-grow overflow-y-auto overflow-x-hidden min-h-0">
                  {mode === "starter" ? (
                    <FeedEmptyState />
                  ) : mode === "process" ? (
                    <FeedTerminal />
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="h-full w-full flex flex-col min-h-0 md:hidden flex-grow">
          <div className="flex items-center  bg-white gap-2 px-4 py-3 border-b-1 border-light-gray-color text-xs uppercase leading-none justify-between">
            <div className="flex gap-2">
              <Link
                className="hover:ring-2 ring-offset-4 ring-light-gray-color hover:bg-light-gray-color hover:rounded-sm ring-offset-light-gray-color active:text-gray"
                to="/"
              >
                My Processes
              </Link>
              {processId && (
                <>
                  <BreadcrumbChevron />
                  <Link
                    to={`/process/${processId}`}
                    className="hover:ring-2 ring-offset-4 ring-light-gray-color hover:bg-light-gray-color hover:rounded-sm ring-offset-light-gray-color active:text-gray normal-case"
                  >
                    {formatId(processId)}
                  </Link>
                </>
              )}
            </div>
            <button
              className="py-1.5 px-2.5 border-1 flex items-center gap-2 rounded-smd base-transition border-[#033FF3] text-[#033FF3] bg-[#DAE0FF]"
              onClick={() => setShowMobileQuests((prevValue) => !prevValue)}
            >
              <SmallQuestIcon />
              <span> QUESTS </span>

              <svg
                width="11"
                height="7"
                viewBox="0 0 11 7"
                fill="none"
                className={`transition-transform ${
                  showMobileQuests ? "-rotate-180" : ""
                }`}
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1 1L5.5 6L10 1"
                  stroke="#033FF3"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
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
              <div className="grid grid-rows-[auto,1fr,auto]   flex-grow p-4">
                <div className="flex gap-1.5 items-center text-xs uppercase">
                  <TerminalIcon />
                  <span>Terminal</span>
                </div>
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
                ) : (
                  ""
                )}
                <form
                  onSubmit={handleRunCommand}
                  className={`relative flex gap-2 border transition-colors border-gray rounded-lg focus-within:border-primary-dark focus-within:ring-2 ring-offset-2 focus-within:bg-white ${
                    mode === "starter"
                      ? "select-none pointer-events-none opacity-50"
                      : ""
                  }`}
                >
                  {sendingCommand && (
                    <span className="absolute bottom-16 left-1/2 -translate-x-1/2 text-sm">
                      Processing...
                    </span>
                  )}
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
                    className="relative flex-grow  "
                  >
                    <span className="absolute left-3 top-3">{"aos>"}</span>
                    <TextareaField
                      name="runCommandInput"
                      className="w-full h-12 py-3 pl-13 bg-transparent resize-none outline-none min-h-0 overflow-hidden"
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
            </div>
            <div
              className={`flex flex-col min-h-0 flex-grow ${
                !showMobileQuests && currentTab === "feed" && processId
                  ? "block"
                  : "hidden"
              }`}
            >
              <div className="min-h-0 min-w-0 flex flex-col   flex-grow flex-shrink p-4">
                <div className="flex flex-grow  flex-col border border-light-gray rounded-smd min-h-0 min-w-0">
                  <div className="flex items-center gap-1.5 text-xs uppercase border-b border-light-gray px-4 py-2.5">
                    <FeedIcon />
                    <span>Feed</span>
                  </div>
                  <div className="flex flex-col flex-grow overflow-y-auto overflow-x-hidden min-h-0">
                    <FeedTerminal />
                  </div>
                </div>
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
