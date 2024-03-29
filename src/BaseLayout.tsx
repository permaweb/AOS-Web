import AOSLogo from "./components/icons/AOSLogo";
import SmallButton from "./components/SmallButton";
import { useContext, useEffect, useRef, useState } from "react";
import TerminalIcon from "./components/icons/TerminalIcon";
import FeedIcon from "./components/icons/FeedIcon";
import FeedEmptyState from "./components/empty_states/FeedEmptyState";
import TerminalEmptyState from "./components/empty_states/TerminalEmptyState";
import { Link, useParams } from "react-router-dom";
import ProcessModal from "./components/modals/ProcessModal";
import BreadcrumbChevron from "./components/icons/BreadcrumbChevron";
import SidebarProcessPanel from "./components/data_component/SidebarProcessPanel";
import { WalletContext } from "./context/WalletContext";
import WalletModal from "./components/modals/WalletModal";

function BaseLayout() {
  const { processId } = useParams();
  const { myWallet } = useContext(WalletContext);

  const mode: "starter" | "process" = processId ? "process" : "starter";

  const resizeElement = useRef<HTMLDivElement>(null);
  const terminalResizeElement = useRef<HTMLDivElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
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
  const [modalShown, setModalShown] = useState<
    "none" | "create" | "connect" | "wallet"
  >("none");

  const showConnectModal = () => setModalShown("connect");
  const showCreateModal = () => setModalShown("create");
  const showWalletModal = () => setModalShown("wallet");
  const closeModal = () => setModalShown("none");

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
    if (terminalResizeElement.current && terminalRef.current) {
      const resizeTerminal = (e: MouseEvent) => {
        const offsetLeft = terminalRef.current?.offsetLeft || 0;
        const resizeOffsetLeft =
          terminalResizeElement.current?.getBoundingClientRect().width || 0;
        if (terminalResizeElement.current) {
          const newWidth = e.clientX - offsetLeft - resizeOffsetLeft / 2;
          setTerminalWidth(newWidth);
          localStorage.setItem("terminalWidth", `${newWidth}`);
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
  }, [terminalResizeElement, terminalRef]);

  useEffect(() => {
    const handleResize = () => {
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";

        const lineHeightPx = 1.25 * 16;
        textareaRef.current.style.height = `${lineHeightPx}px`;

        const newHeight = textareaRef.current.scrollHeight;
        textareaRef.current.style.height = `${newHeight}px`;
      }
    };

    textareaRef.current?.addEventListener("input", handleResize);

    handleResize();

    return () => {
      textareaRef.current?.removeEventListener("input", handleResize);
    };
  }, []);

  return (
    <>
      {modalShown === "wallet" && <WalletModal closeModal={closeModal} />}
      {modalShown === "connect" && (
        <ProcessModal
          closeModal={closeModal}
          text="Connect to a process"
          placeholder="Enter Process ID"
          buttonText="Connect"
          mode="connect"
        />
      )}
      {modalShown === "create" && (
        <ProcessModal
          closeModal={closeModal}
          text="Create a new process"
          placeholder="Type Name"
          buttonText="Create"
          mode="create"
        />
      )}
      <div className="fixed left-0 top-0 right-0 bottom-0 font-roboto-mono text-primary-dark-color bg-bg-color text-sm">
        <div className="grid grid-rows-[auto,1fr] h-full w-full">
          <div className="flex justify-between items-center p-5 border-b-1 border-light-gray-color ">
            <Link to={"/"}>
              <AOSLogo />
            </Link>
            {myWallet && "id" in myWallet ? (
              <div className="px-4 py-2.5 flex items-center gap-2 font-dm-sans text-base border-1 transition leading-none rounded-smd border-light-gray-color base-transition">
                <div className="rounded-full bg-dark-gray-color aspect-square w-5"></div>
                <div className="truncate max-w-24">Placeholder Name</div>
              </div>
            ) : (
              <button
                onClick={showWalletModal}
                className="px-4 py-2.5 font-dm-sans text-base border-1 transition leading-none rounded-smd text-[#FF0E0E] bg-[#FBDADA] border-[#DD8686] base-transition"
              >
                Connect Wallet
              </button>
            )}
          </div>
          <div className="grid grid-cols-[auto,1fr] min-h-0">
            <div
              className="flex flex-col relative gap-5 pt-5 border-r-1 border-light-gray-color "
              style={{ width: Math.max(sideBarWidth, 200) }}
            >
              <div
                ref={resizeElement}
                className="absolute -right-2 top-0 bottom-0 w-4 hover:cursor-col-resize select-none"
              />
              <SidebarProcessPanel
                processId={processId}
                showConnectModal={showConnectModal}
                showCreateModal={showCreateModal}
              />
            </div>
            <div className="flex flex-col p-5 gap-5 min-h-0">
              {processId && (
                <div className="text-xs uppercase flex items-center gap-2">
                  <Link to={"/"}>My Processes</Link>

                  <BreadcrumbChevron />
                  <Link to={`/process/${processId}`}>{processId}</Link>
                </div>
              )}
              <div className="grid grid-cols-[auto,1fr] gap-5 flex-grow min-h-0">
                <div
                  ref={terminalRef}
                  style={{ width: Math.max(terminalWidth, 180) }}
                  className="relative flex flex-col min-h-0"
                >
                  <div
                    ref={terminalResizeElement}
                    className="absolute -right-6 top-0 bottom-0 w-6 hover:cursor-col-resize select-none"
                  />
                  <div className="text-xs uppercase flex gap-1.5 items-center  ">
                    <TerminalIcon />
                    <span>Terminal</span>
                  </div>
                  <div className="flex flex-col flex-grow overflow-y-auto overflow-x-hidden min-h-0">
                    {mode === "starter" && (
                      <TerminalEmptyState
                        handleCreateProcess={showCreateModal}
                        handleConnectProcess={showConnectModal}
                      />
                    )}
                  </div>
                  <div
                    className={
                      "flex gap-2 border-1 transition-colors border-gray-text-color rounded-lg  focus-within:border-primary-dark-color " +
                      (mode === "starter"
                        ? "select-none pointer-events-none opacity-50"
                        : "")
                    }
                  >
                    <label
                      htmlFor="runCommandInput"
                      className="flex-grow h-full relative"
                    >
                      <span className="absolute left-3 top-3">{"aos>"}</span>
                      <textarea
                        ref={textareaRef}
                        name="runCommandInput"
                        className="py-3 pl-13 w-full bg-transparent h-full resize-none outline-none min-h-0 overflow-hidden "
                        spellCheck="false"
                      ></textarea>
                    </label>
                    <div className="p-1.5">
                      <SmallButton handleClick={() => {}} text="run" />
                    </div>
                  </div>
                </div>
                <div className="flex flex-col ronuded-smd border-1 border-light-gray-color rounded-smd min-h-0">
                  <div className="text-xs uppercase flex gap-1.5 items-center border-b-1 border-light-gray-color px-4 py-2.5">
                    <FeedIcon />
                    <span>Feed</span>
                  </div>
                  <div className="flex flex-grow overflow-y-auto overflow-x-hidden min-h-0">
                    {mode === "starter" && <FeedEmptyState />}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default BaseLayout;
