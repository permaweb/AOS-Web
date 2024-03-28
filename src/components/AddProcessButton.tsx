import { MouseEvent } from "react";

import { useEffect, useState } from "react";
import SmallButton from "./SmallButton";
import SmallPlus from "./icons/SmallPlus";
import TerminalIcon from "./icons/TerminalIcon";
import ConnectIcon from "./icons/ConnectIcon";

export default function AddProcessButton() {
  const [showOptions, setShowOptions] = useState<boolean>(false);

  const handleClick = (e: MouseEvent) => {
    e.stopPropagation();
    setShowOptions((prevValue) => !prevValue);
  };

  useEffect(() => {
    const closeOptions = () => setShowOptions(false);

    window.addEventListener("click", closeOptions);
    return () => window.removeEventListener("click", closeOptions);
  }, []);

  return (
    <div className="relative flex flex-col">
      <SmallButton
        text="Add Process"
        state="white"
        handleClick={handleClick}
        IconComponent={SmallPlus}
      />
      {showOptions && (
        <div
          className="animate-slide-in-left absolute min-w-max flex flex-col gap-3 leading-none left-full -top-1 ml-5 bg-primary-dark-color text-bg-color p-4 rounded-smd z-50"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <ArrowLeft />
          <button className="flex items-center gap-3 uppercase transition hover:scale-[1.0125] active:scale-[0.975] active:opacity-50">
            <TerminalIcon />
            <span>Create a new process</span>
          </button>
          <button className="flex items-center gap-3 uppercase transition hover:scale-[1.0125] active:scale-[0.975] active:opacity-50">
            <ConnectIcon />
            <span>Connect to a process</span>
          </button>
        </div>
      )}
    </div>
  );
}

function ArrowLeft() {
  return (
    <svg
      width="12"
      height="21"
      viewBox="0 0 12 21"
      className="fill-primary-dark-color absolute right-full -mr-0.5 top-3"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M0.822991 8.96859L11.4999 0V21L0.82299 12.0314C-0.128497 11.2322 -0.128496 9.76784 0.822991 8.96859Z" />
    </svg>
  );
}
