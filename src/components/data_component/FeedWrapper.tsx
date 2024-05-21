import FeedEmptyState from "../empty_states/FeedEmptyState";
import FeedIcon from "../icons/FeedIcon";
import FeedTerminal from "./FeedTerminal";

export default function FeedWrapper({ mode }: { mode: "starter" | "process" }) {
  return (
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
  );
}
