import { useState, type MouseEvent, useEffect } from "react";
import QuestsIcon from "./icons/QuestsIcon";
import QuestsPanel from "./modals/QuestsPanel";

export default function QuestsButton() {
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
    <div className="relative  items-stretch py-1 hidden md:flex">
      <button
        className="uppercase pr-4 pl-3.5 flex items-center gap-2 border-1 rounded-smd base-transition border-[#033FF3] text-[#033FF3] bg-[#DAE0FF]"
        onClick={handleClick}
      >
        <QuestsIcon />
        <span>Quests</span>
      </button>
      {showOptions && <QuestsPanel />}
    </div>
  );
}
