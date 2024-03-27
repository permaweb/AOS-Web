import AOSLogo from "./components/icons/AOSLogo";
import SearchIcon from "./components/icons/SearchIcon";
import SmallButton from "./components/SmallButton";
import SmallPlus from "./components/icons/SmallPlus";
import EmptyBoxIcon from "./components/icons/EmptyBoxIcon";
import { useEffect, useRef, useState } from "react";

function HomePage() {
  const resizeElement = useRef<HTMLDivElement>(null);
  const [sideBarWidth, setSideBarWidth] = useState<number>(250);

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
    }
  }, [resizeElement]);

  return (
    <div className="flex flex-col fixed left-0 top-0 right-0 bottom-0 font-roboto-mono text-primary-dark-color bg-bg-color text-sm">
      <div className="flex justify-between p-5 border-b-1 border-light-gray-color">
        <AOSLogo />
      </div>
      <div className="grid grid-cols-[auto,1fr] flex-grow">
        <div
          className="flex flex-col relative gap-5 py-5 border-r-1 border-light-gray-color"
          style={{ width: sideBarWidth }}
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
                  className="w-full pr-3 pl-8 py-2 
                  outline outline-light-gray-color bg-bg-color outline-1 rounded-smd 
                  leading-none font-dm-sans 
                  placeholder:text-gray-text-color
                  focus:outline-primary-dark-color
                  peer transition-colors"
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

          <div className="p-5 flex flex-col gap-3 font-dm-sans">
            <EmptyBoxIcon />
            <span>
              Nothing’s here yet. You’ll see processes here when you connect or
              create them.
            </span>
          </div>
        </div>
        <div></div>
      </div>
    </div>
  );
}

export default HomePage;
