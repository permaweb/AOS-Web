import { MouseEvent } from "react";

import { useEffect, useState } from "react";
import SmallButton from "./SmallButton";
import SmallPlus from "./icons/SmallPlus";
import TerminalIcon from "./icons/TerminalIcon";
import ConnectIcon from "./icons/ConnectIcon";

export type AddProcessButtonProps = {
  showConnectModal: (val: boolean) => void;
  showCreateModal: (val: boolean) => void;
};

export default function AddProcessButton({
  showConnectModal,
  showCreateModal,
}: AddProcessButtonProps) {
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

  const handleCreateProcessThenClose = () => {
    setShowOptions(false);

    showConnectModal(false);
    showCreateModal(true);
  };

  const handleConnectProcessThenClose = () => {
    setShowOptions(false);

    showCreateModal(false);
    showConnectModal(true);
  };

  return (
    <>
      <div className="relative flex flex-col">
        <SmallButton
          text="Add Process"
          state="white"
          handleClick={handleClick}
          IconComponent={SmallPlus}
        />
        {showOptions && (
          <div
            className="absolute min-w-max flex flex-col gap-3 leading-none top-full left-0 right-0 mt-2 bg-primary-dark-color text-bg-color p-4 rounded-smd z-40 md:left-full md:-top-1 md:mt-0 md:ml-5 animate-slide-in-top md:animate-slide-in-left"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <ArrowLeft />

            <button
              className="flex items-center gap-3 uppercase transition base-transition p-1 md:p-0"
              onClick={handleCreateProcessThenClose}
            >
              <TerminalIcon />
              <span>Create a new process</span>
            </button>
            <button
              className="flex items-center gap-3 uppercase transition base-transition p-1 md:p-0"
              onClick={handleConnectProcessThenClose}
            >
              <ConnectIcon />
              <span>Connect to a process</span>
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export function ArrowLeft() {
  return (
    <svg
      width="12"
      height="21"
      viewBox="0 0 12 21"
      className="fill-primary-dark-color absolute right-full -mr-0.5 top-3 hidden md:block"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M0.822991 8.96859L11.4999 0V21L0.82299 12.0314C-0.128497 11.2322 -0.128496 9.76784 0.822991 8.96859Z" />
    </svg>
  );
}
