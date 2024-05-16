import { useEffect, useState, type MouseEvent } from "react";
import QuestsIcon from "./icons/QuestsIcon";
import CloseIcon from "./icons/CloseIcon";
import { useActiveAddress } from "arweave-wallet-kit";
import { getQuest, getQuests } from "../helpers/aos";

type QuestButtonProps = {
  walletConnected: boolean;
};

export default function QuestsButton({ walletConnected }: QuestButtonProps) {
  const [showOptions, setShowOptions] = useState<boolean>(false);
  const [chosenQuestID, setChosenQuestID] = useState<"none" | string>("none");
  const [chosenQuest, setChosenQuest] = useState<any>(null);
  const [chosenQuestLoading, setChosenQuestLoading] = useState<boolean>(false);
  const walletAddress = useActiveAddress();
  const [quests, setQuests] = useState<any>([]);

  const handleClick = (e: MouseEvent) => {
    e.stopPropagation();
    setShowOptions((prevValue) => !prevValue);
    setChosenQuestID("none");
  };

  const handleCloseChosenQuest = () => {
    setChosenQuestID("none");
  };

  const handleOpenChosenQuest = async (questKey: any) => {
    // console.log("questKey", questKey);
    if (!!walletAddress) {
      setChosenQuestLoading(true);

      setChosenQuestID(questKey.QuestId);
      const quest = await getQuest(walletAddress, questKey.QuestId);
      setChosenQuest(quest);
      // console.log("quest", quest);

      setChosenQuestLoading(false);
    }
  };

  useEffect(() => {
    const closeOptions = () => setShowOptions(false);

    window.addEventListener("click", closeOptions);
    return () => window.removeEventListener("click", closeOptions);
  }, []);

  useEffect(() => {
    if (!!walletAddress) {
      getQuests(walletAddress).then((val) => {
        console.log("quests", val);
        setQuests(val);
      });
    }
  }, [walletAddress]);

  return (
    <div className="relative flex items-stretch py-1">
      <button
        className={
          "uppercase pr-4 pl-3.5 flex items-center gap-2 border-1 rounded-smd base-transition " +
          (walletConnected
            ? "border-[#033FF3] text-[#033FF3] bg-[#DAE0FF]"
            : "border-light-gray-color")
        }
        onClick={handleClick}
      >
        {walletConnected && <QuestsIcon />}
        <span>Quests</span>
      </button>
      {showOptions && (
        <div
          className="absolute animate-slide-in-top z-50 top-full right-0 mt-1 w-screen max-w-[22rem] flex flex-col leading-none gap-5 bg-primary-dark-color text-bg-color p-5 rounded-3xl "
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <span className="uppercase font-bold">Quests</span>
          <div className="flex flex-col gap-2">
            <div className="flex justify-between uppercase">
              <span>Name</span>
              <span>{"Reward (Cred)"}</span>
            </div>
            <div className="flex flex-col gap-1.5">
              {quests?.map((quest: any, id: number) => {
                return (
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

                    {chosenQuestID === quest && <QuestInfoArrow />}
                  </div>
                );
              })}
            </div>
          </div>

          {chosenQuestID !== "none" && (
            <div className="absolute right-full -top-0.5 -bottom-0.5 w-screen max-w-lg">
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
                  <pre className="w-full h-full  overflow-auto whitespace-pre-wrap break-words tracking-wide leading-normal font-dm-sans scrollbar-style text-white">
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
      )}
    </div>
  );
}

const QuestInfoArrow = () => (
  <svg
    width="19"
    height="29"
    viewBox="0 0 19 29"
    fill="none"
    className="z-10 absolute top-0 bottom-0 my-auto right-full mr-1"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M14.6297 10.7798L0 0V28L14.6297 17.2202C16.7993 15.6216 16.7993 12.3784 14.6297 10.7798Z"
      fill="#222326"
    />
    <path
      d="M2 28V27.5L14.9805 17.192C17.0207 15.5718 16.9923 12.4647 14.9227 10.8821L2 1V0"
      stroke="#F2F2F2"
      strokeWidth="2"
      strokeLinejoin="round"
    />
  </svg>
);
