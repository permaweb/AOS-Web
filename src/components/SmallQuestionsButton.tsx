import SmallQuestIcon from "./icons/SmallQuestIcon";

export default function SmallQuestsButton({
  open,
  handleClick,
}: {
  open: boolean;
  handleClick: () => void;
}) {
  return (
    <button
      className="py-1.5 px-2.5 border-1 flex items-center gap-2 rounded-smd base-transition border-[#033FF3] text-[#033FF3] bg-[#DAE0FF]"
      onClick={handleClick}
    >
      <SmallQuestIcon />
      <span> QUESTS </span>

      <svg
        width="11"
        height="7"
        viewBox="0 0 11 7"
        fill="none"
        className={`transition-transform ${open ? "-rotate-180" : ""}`}
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
  );
}
