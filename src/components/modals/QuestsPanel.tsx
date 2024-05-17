import { useEffect, useState } from "react";
import { useActiveAddress } from "arweave-wallet-kit";
import { getQuest, getQuests } from "../../helpers/aos";
import QuestEmptyState from "../empty_states/QuestEmptyState";
import CloseIcon from "../icons/CloseIcon";

type Props = {
  mode?: "default" | "inline";
};

export default function QuestsPanel({ mode = "default" }: Props) {
  const walletAddress = useActiveAddress();
  const [chosenQuestID, setChosenQuestID] = useState<"none" | string>("none");
  const [chosenQuest, setChosenQuest] = useState<any>(null);
  const [chosenQuestLoading, setChosenQuestLoading] = useState<boolean>(false);
  const [quests, setQuests] = useState<any | null>(null);

  const handleCloseChosenQuest = () => {
    setChosenQuestID("none");
  };

  const handleOpenChosenQuest = async (questKey: { QuestId: string }) => {
    if (!!walletAddress) {
      setChosenQuestLoading(true);
      setChosenQuestID(questKey.QuestId);

      const quest: string = await getQuest(walletAddress, questKey.QuestId);
      const formattedQuest = formatQuestText(quest);
      setChosenQuest(formattedQuest);

      setChosenQuestLoading(false);
    }
  };

  useEffect(() => {
    if (!!walletAddress) {
      getQuests(walletAddress).then((val) => {
        setQuests(val);
      });
    }
  }, [walletAddress]);

  function formatQuestText(inputText: string): string {
    const keys = [
      "CRED:",
      "Name:",
      "Description:",
      "Points:",
      "URL:",
      "From:",
      "Submit:",
      "Visit:",
    ];
    const regexKey = new RegExp(`^(${keys.join("|")})`, "i");

    const sections = inputText.split("\n\n");

    const formattedSections = sections.map((section) => {
      const lines = section.split("\n");
      let formattedLines: string[] = [];

      for (let i = 0; i < lines.length; i++) {
        if (lines[i] === undefined) continue;
        if (regexKey.test(lines[i].trim()) || lines[i].trim() === "") {
          formattedLines.push(lines[i].trim());
        } else if (i > 0 && regexKey.test(lines[i - 1].trim())) {
          formattedLines.push(lines[i].trim());
        } else {
          if (lines[i].trim().startsWith("http")) {
            formattedLines[formattedLines.length - 1] =
              formattedLines[formattedLines.length - 1].trim() +
              "\n" +
              lines[i].trim();
          } else {
            if (formattedLines.length > 0) {
              formattedLines[formattedLines.length - 1] =
                formattedLines[formattedLines.length - 1].trim() +
                " " +
                lines[i].trim();
            } else {
              formattedLines.push(lines[i].trim());
            }
          }
        }
      }

      return formattedLines.join("\n");
    });

    return formattedSections.join("\n\n");
  }

  return (
    <div
      className={
        (mode === "inline"
          ? "relative w-full max-w-full"
          : "absolute animate-slide-in-top z-50 top-full right-0 mt-1 w-screen max-w-[22rem]") +
        " flex flex-col leading-none gap-5 bg-primary-dark-color text-bg-color p-5 rounded-3xl"
      }
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      {!walletAddress && !quests && <QuestEmptyState />}
      {walletAddress && !quests && <div className="p-5">Loading...</div>}
      {quests && quests.length > 0 && (
        <>
          <span className="uppercase font-bold">Quests</span>
          <div className="flex flex-col gap-2">
            <div className="flex justify-between uppercase">
              <span>Name</span>
              <span>{"Reward (Cred)"}</span>
            </div>
            <div className="flex flex-col gap-1.5">
              {quests.map((quest: any, id: number) => (
                <div className="relative" key={id}>
                  <button
                    className={
                      "p-3 border-1 w-full rounded-lg flex justify-between base-transition " +
                      (chosenQuestID === quest
                        ? "border-bg-color"
                        : "border-dark-gray-color")
                    }
                    onClick={() => handleOpenChosenQuest(quest)}
                  >
                    <span className="font-dm-sans">{quest?.Name}</span>
                    <span className="font-roboto-mono">{quest?.CRED}</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {chosenQuestID !== "none" && (
        <div
          className={
            mode === "inline"
              ? "relative w-full mt-5"
              : "absolute right-full -top-0.5 -bottom-0.5 w-screen max-w-lg"
          }
        >
          <div className="border-2 border-bg-color bg-primary-dark-color p-5 h-full rounded-3xl flex flex-col gap-4">
            <button
              className="absolute right-5 top-5"
              onClick={handleCloseChosenQuest}
            >
              <CloseIcon />
            </button>

            {chosenQuestLoading ? (
              <div className="w-full h-full flex items-center justify-center">
                Loading...
              </div>
            ) : chosenQuest ? (
              <pre className="w-full h-full overflow-auto whitespace-pre-wrap break-words tracking-wide leading-normal font-dm-sans scrollbar-style text-white">
                {chosenQuest}
              </pre>
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                No data found
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
