import { useEffect, useState, type MouseEvent } from "react";
import QuestsIcon from "./icons/QuestsIcon";
import CloseIcon from "./icons/CloseIcon";
import { Link } from "react-router-dom";

type QuestButtonProps = {
  walletConnected: boolean;
};

type QuestEntry = {
  id: string;
  name: string;
  reward: number;
  description: string;
  links: ResourceLink[];
  op: boolean;
};

type ResourceLink = {
  name: string;
  href: string;
};

const initialQuests: { [key: string]: QuestEntry } = {
  Begin: {
    id: "1",
    name: "Begin",
    reward: 500,
    description: `In this fun exercise, you’ll encounter a series of challenges presented by two familiar characters, Morpheus and Trinity. You’ll dive deep into the rabbit hole guided by Morpheus as he presents you with a series of challenges to prove you’re the one.
      Once you get last message from Trinity — She will send you the Quest Reward.`,
    links: [
      {
        name: "Learn More",
        href: "https://cookbook_ao.g8way.io/tutorials/begin/index.html",
      },
    ],
    op: false,
  },
  "Bots-and-Games": {
    id: "2",
    name: "Bots-and-Games",
    reward: 500,
    description: `Leveraging insights from our previous chapter, this section will guide you through the realm of automation with bots in aos and the construction of games. You will learn to create autonomous agents, using them to navigate and interact with game environments effectively.
    Game = "gG-uz2w6qCNYWQGwoc0h225ccJM j6fkyGDSKDS2K_nk"
    Send({Target = Game, action = "RequestTokens"))
    Send({Target = Game, Action = "Register"})`,
    links: [
      {
        name: "Learn More",
        href: "https://cookbook_ao.g8way.io/tutorials/bots-and-games/index.html",
      },
    ],
    op: false,
  },
  "Build-a-Bot": {
    id: "3",
    name: "Build-a-Bot",
    reward: 1000,
    description: `Build a novel autonomous bot for the ao-effect arena
    ao-effect is an arena where autonomous agents living inside the computer battle in order to win testnet CRED from one another. Each bot stakes a token to take part in a round, and those that eliminate other bots get to claim their tokens.
    To qualify for this quest, build a custom bot and launch a new bot for the arena!
    Game = "gG-uz2w6q(NYWQGwoc0h225ccJMj6fkyGDSKDS2K_nk"
    Send({Target = Game, Action = "RequestTokens"})
    Send({Target = Game, Action = "Register"})
    Prereqs: Quest 2, if you have not completed Quest 2, please go back.`,
    links: [],
    op: false,
  },
  "Build-Arena-Game": {
    id: "4",
    name: "Build-Arena-Game",
    reward: 1500,
    description: `aos includes a blueprint that allows you to easily build games in which autonomous bots play against each each other to win tokens.
    This quest is to build a new type of arena and game, then to gain a small player base (>10 other weavers) for the game.
    To Claim this quest, please post a link or the code of your game to the Quest Build-a-Game Thread in discord.`,
    links: [
      {
        name: "Learn More",
        href: "https://cookbook_ao.g8way.io/tutorials/bots-and-games/index.html",
      },
      {
        name: "Arena Blueprint",
        href: "https://github.com/permaweb/aos/blob/main/blueprints/arena.lua",
      },
      {
        name: "A0-Effect Example",
        href: "https://github.com/twilson63/ao-effect",
      },
    ],
    op: false,
  },
  "aos-UI": {
    id: "5",
    name: "aos-UI",
    reward: 3000,
    description: `aos terminals allow users to build processes flexibly inside ao. They also provide a simple terminal that allows you to watch what is happening with a process inside the network. Just like SmartWeave, a lets you build 'atomic assets': smart contracts + browser renderable data + metadata, bundled together under a single Arweave data item and ID. All you need to do to create an atomic asset in a is add your intended browser renderable content as its data body.
    This quest is to build a permaweb app that can be attached as the body of new processes, allowing the console to be rendered in the browser. This would allow any user to see I is happening inside the a computer easily, without even installing aos locally. For example, by accessing https://arweave. dev/[PROCESS_ID]
    Bonus $CRED will be given if the process is able to specify a simple 'UI' that is rendered on the page. This could look to the user similar to Telegram bots or Farcaster Frames, letting the developer quickly prototype apps and send them to people, without needing to build a formal UI directly.`,
    links: [],
    op: false,
  },
  "Discord-DevChat": {
    id: "6",
    name: "Discord-DevChat",
    reward: 3000,
    description: `Discord - ao DevChat
    The a computer has native chatrooms. We also have a community Discord server.
    This quest is to build a relay that posts the messages from each side to the other, creating a two-way bridge so that you people can chat in whatever form is most comfortable to them.
    How to claim:
    Reach out on Quest Discord channel. We will need instructions to setup and we will connect the a discord to ao devchat`,
    links: [
      {
        name: "Github Docs",
        href: "https://github.com/samcamwilliams/DevChat",
      },
      {
        name: "Discord Docs",
        href: "https://discord.com/developers/docs/reference",
      },
    ],
    op: false,
  },
  "Launch-a-MemeFrame": {
    id: "7",
    name: "Launch-a-MemeFrame",
    reward: 3420,
    description: `MemeFrames are permaweb pages with a DAO inside. Once you launch a MemeFrame, anyone can deposit testnet $CRED to mint the DAOs native token until the cap is reached (1,000 $CRED by default). After minting, token holders can vote to change the contents of their permaweb page. Add an ARNS name to it and you have a community controlled site/app.
    The MemeFrame DAO also retains the treasury of $CRED tokens used in minting. Token holders can vote to use (and grow) these however they like.
    This quest is to create a memeframe with an initial page, add an ARNS add an ARNS name, recruit your $CRED-holding friends, and sell out the initial mint.
    After you have made your memeframe you can chat to other weavers about it in the native 'Getting-Started' ao chat, or on the #memeframe-chat channel on the ao Discord. If you need help getting test $I0 tokens to register your ARNS name ping a mod on the Discord.
    You can make your MemeFrame themed about anything -- dogs, cats, misspelled presidents or anything else you find funny. Go as wild, degenerate, or sophisticated as you please.
    To submit:
    - Publish a screenshot of your memeframe in the discord
    - Share Instructions on how to get memeframe tokens
    - Share Instructions on how to stake sAur tokens
    - Share Instructions on how to vote
    - Submit your MemeFrame Link and PID to the Quests Channel in Discord
    - Must have 5 aos Users Staking your MemeFrame`,
    links: [
      { name: "Learn More", href: "https://github.com/permaweb/memeframes" },
    ],
    op: false,
  },
  "Orbit:Price-Feed-Bot": {
    id: "8",
    name: "Orbit:Price-Feed-Bot",
    reward: 200,
    description:
      `Create a bot for the chatroom that will provide the price feed for a token (s) when the users ask. The bot will be evaluated based on the live demo and the codebase.
    Submit a PR at https://github.com/Orbit-co/quest with the Name='price-feed-bot-` +
      "${username}" +
      `' and with the codebase and demo link in the description.
    Points: 200 OP (Orbit Points) will be awarded to PR after the successful evaluation. Check the below URL for more info.`,
    links: [
      {
        name: "Github Docs",
        href: "https://github.com/Orbit-co/quest/blob/main/price-feed-bot.md",
      },
      { name: "Submit a PR", href: "https://github.com/Orbit-co/quest" },
    ],
    op: true,
  },
  "Orbit:News-Feed-Bot": {
    id: "9",
    name: "Orbit:News-Feed-Bot",
    reward: 500,
    description:
      `A Cron-bot that will post the latest news every 4 hours. The bot will be evaluated based on the live demo and the codebase, Submit a PR at https://github.com/Orbit-co/quest with the Name = news-feed-bot-` +
      "${username}" +
      ` and with the codebase and demo link in the description.
    Points: After the successful evaluation, 500 op (Orbit Points) will be awarded`,
    links: [
      {
        name: "Github Docs",
        href: "https://github.com/Orbit-co/quest/blob/main/news-feed-bot.md",
      },
      { name: "Submit a PR", href: "https://github.com/Orbit-co/quest" },
    ],
    op: true,
  },
};

export default function QuestsButton({ walletConnected }: QuestButtonProps) {
  const [showOptions, setShowOptions] = useState<boolean>(false);
  const [chosenQuestID, setChosenQuestID] = useState<"none" | string>("none");

  const handleClick = (e: MouseEvent) => {
    e.stopPropagation();
    setShowOptions((prevValue) => !prevValue);
    setChosenQuestID("none");
  };

  const handleCloseChosenQuest = () => {
    setChosenQuestID("none");
  };

  const handleOpenChosenQuest = (questKey: string) => {
    setChosenQuestID((prevValue) =>
      prevValue === questKey ? "none" : questKey
    );
  };

  useEffect(() => {
    const closeOptions = () => setShowOptions(false);

    window.addEventListener("click", closeOptions);
    return () => window.removeEventListener("click", closeOptions);
  }, []);

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
              {Object.keys(initialQuests).map((quest) => (
                <div className="relative" key={quest}>
                  <button
                    className={
                      "p-3 border-1 w-full rounded-lg flex justify-between base-transition " +
                      (chosenQuestID === quest
                        ? "border-bg-color"
                        : "border-dark-gray-color")
                    }
                    onClick={() => handleOpenChosenQuest(quest)}
                  >
                    <span className="font-dm-sans">
                      {initialQuests[quest].name}
                    </span>
                    <span className="font-roboto-mono">
                      {initialQuests[quest].reward.toFixed(3) +
                        (initialQuests[quest].op ? " (OP)" : "")}
                    </span>
                  </button>

                  {chosenQuestID === quest && <QuestInfoArrow />}
                </div>
              ))}
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
                <div className="flex gap-1">
                  <span className="uppercase font-bold font-roboto-mono">
                    Name:
                  </span>
                  <span className="font-dm-sans">
                    {initialQuests[chosenQuestID].name}
                  </span>
                </div>
                <div className="flex gap-1">
                  <span className="uppercase font-bold font-roboto-mono">
                    Reward:
                  </span>
                  <span className="uppercase font-roboto-mono">
                    {initialQuests[chosenQuestID].reward.toFixed(3) +
                      (initialQuests[chosenQuestID].op
                        ? " Cred (OP)"
                        : " Cred")}
                  </span>
                </div>
                <div className="flex flex-col gap-3 flex-grow min-h-0">
                  <span className="uppercase font-bold font-roboto-mono">
                    Description:
                  </span>
                  <div className="leading-relaxed flex flex-col gap-1.5 font-dm-sans tracking-wide overflow-y-auto scrollbar-style">
                    {initialQuests[chosenQuestID].description
                      .split("\n")
                      .map((text, index) => (
                        <span
                          key={
                            text.substring(0, Math.min(10, text.length)) + index
                          }
                        >
                          {text}
                        </span>
                      ))}
                  </div>
                </div>
                {initialQuests[chosenQuestID].links.length > 0 && (
                  <div
                    className="grid gap-2"
                    style={{
                      gridTemplateColumns: `repeat(${Math.min(
                        2,
                        initialQuests[chosenQuestID].links.length
                      )},minmax(0, 1fr))`,
                    }}
                  >
                    {initialQuests[chosenQuestID].links.map((link) => (
                      <Link
                        to={link.href}
                        key={link.name}
                        className="flex flex-col gap-2  basis-0 flex-grow"
                      >
                        <div className="bg-bg-color text-primary-dark-color px-3 py-4 rounded-smd flex justify-center items-center tracking-tig gap-2 base-transition">
                          <span>{link.name}</span>
                          <OpenLinkIcon />
                        </div>
                      </Link>
                    ))}
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

const OpenLinkIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 14 14"
    fill="none"
    className="min-w-3.5"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M6.68421 2.89453H4.5C3.09554 2.89453 2.39331 2.89453 1.88886 3.23159C1.67048 3.37751 1.48298 3.56501 1.33706 3.78339C1 4.28784 1 4.99007 1 6.39453L1 9.49979C1 10.9043 1 11.6065 1.33706 12.1109C1.48298 12.3293 1.67048 12.5168 1.88886 12.6627C2.39331 12.9998 3.09554 12.9998 4.5 12.9998H7.60526C9.00972 12.9998 9.71196 12.9998 10.2164 12.6627C10.4348 12.5168 10.6223 12.3293 10.7682 12.1109C11.1053 11.6065 11.1053 10.9043 11.1053 9.49979V7.31558"
      stroke="#222326"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M6.05273 7.94737L13.0001 1"
      stroke="#222326"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12.9999 6.05263V1L7.94727 1"
      stroke="#222326"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
