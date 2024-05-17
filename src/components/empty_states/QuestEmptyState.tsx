export default function QuestEmptyState() {
  return (
    <div className="flex flex-col gap-4 justify-center items-center">
      <img src="quests.png" />
      <span className="max-w-52 text-center leading-normal text-base font-bold">
        Connect your wallet to view quests.
      </span>
    </div>
  );
}
