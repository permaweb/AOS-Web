export type TabState = "terminal" | "feed";

type Props = { currentTab: TabState; setCurrentTab: (tab: TabState) => void };

export default function TabSelector({ currentTab, setCurrentTab }: Props) {
  return (
    <div className="flex gap-2 p-4">
      <button
        onClick={() => setCurrentTab("terminal")}
        className={`py-2 px-4 rounded-lg  border-1  ${
          currentTab === "terminal"
            ? "font-bold bg-light-gray-color  border-gray-text-color"
            : ""
        }`}
      >
        Terminal
      </button>
      <button
        onClick={() => setCurrentTab("feed")}
        className={`py-2 px-4 rounded-lg   border-1  ${
          currentTab === "feed"
            ? "font-bold bg-light-gray-color   border-gray-text-color"
            : ""
        }`}
      >
        Feed
      </button>
    </div>
  );
}
