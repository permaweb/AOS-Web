import AOSLogo from "./components/icons/AOSLogo";
import SearchIcon from "./components/icons/SearchIcon";
import SmallButton from "./components/SmallButton";
import SmallPlus from "./components/icons/SmallPlus";
import EmptyBoxIcon from "./components/icons/EmptyBoxIcon";
import { useEffect, useRef, useState } from "react";
import TerminalIcon from "./components/icons/TerminalIcon";
import FeedIcon from "./components/icons/FeedIcon";
import FeedEmptyState from "./components/empty_states/FeedEmptyState";
import TerminalEmptyState from "./components/empty_states/TerminalEmptyState";
import ProcessesBarEmptyState from "./components/empty_states/ProcessesBarEmptyState";

function HomePage() {
  const resizeElement = useRef<HTMLDivElement>(null);
  const terminalResizeElement = useRef<HTMLDivElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [sideBarWidth, setSideBarWidth] = useState<number>(250);
  const [terminalWidth, setTerminalWidth] = useState<number>(600);

  useEffect(() => {
    if (resizeElement.current) {
      const resizeSidebar = (e: MouseEvent) => {
        if (resizeElement.current) {
          setSideBarWidth(e.clientX);
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
        const offsetLeft = terminalRef.current?.offsetLeft || 0; // Get the offset left of the terminal
        const resizeOffsetLeft =
          terminalResizeElement.current?.getBoundingClientRect().width || 0;
        if (terminalResizeElement.current) {
          const newWidth = e.clientX - offsetLeft - resizeOffsetLeft / 2; // Calculate the new width based on the cursor's position and offset left
          setTerminalWidth(Math.max(newWidth, 180)); // Update the state, ensuring a minimum width
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
    <div className="fixed left-0 top-0 right-0 bottom-0 font-roboto-mono text-primary-dark-color bg-bg-color text-sm">
      <div className="grid grid-rows-[5.25rem,auto] h-full w-full">
        <div className="flex justify-between items-center p-5 border-b-1 border-light-gray-color ">
          <AOSLogo />
        </div>
        <div className="grid grid-cols-[auto,1fr] min-h-0">
          <div
            className="flex flex-col relative gap-5 py-5 border-r-1 border-light-gray-color "
            style={{ width: Math.max(sideBarWidth, 180) }}
          >
            <div
              ref={resizeElement}
              className="absolute -right-2 top-0 bottom-0 w-4 hover:cursor-col-resize select-none"
            />
            <div className="flex flex-col gap-2.5 px-5">
              <span className="uppercase">MY PROCESSES</span>
              <div className="flex flex-col gap-1.5">
                <label className="relative" htmlFor="searchProcesses">
                  <input
                    type="text"
                    name="searchProcesses"
                    placeholder="Search"
                    className="w-full pr-3 pl-8 py-2  outline outline-light-gray-color bg-bg-color outline-1 rounded-smd leading-none font-dm-sans 
                      placeholder:text-gray-text-color focus:outline-primary-dark-color peer transition-colors"
                    spellCheck="false"
                  ></input>
                  <SearchIcon className="absolute left-2.5 top-0 bottom-0 m-auto transition-colors text-gray-text-color peer-focus:text-primary-dark-color" />
                </label>
                <SmallButton
                  text="Add Process"
                  handleClick={() => {}}
                  IconComponent={SmallPlus}
                />
              </div>
            </div>

            <ProcessesBarEmptyState />
          </div>
          <div className="flex flex-col p-5 gap-5 min-h-0">
            <div className="text-xs uppercase">
              <span>My Processes</span>
            </div>
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
                  <TerminalEmptyState />
                </div>
                <div className="flex gap-2 border-1 transition-colors border-gray-text-color rounded-lg  focus-within:border-primary-dark-color ">
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
                  <FeedEmptyState />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
