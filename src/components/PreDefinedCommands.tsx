import { loadBluePrint } from "../helpers/aos";

interface PreDefinedCommandsProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    setSendingCommand: (sendingCommand: boolean) => void;
    setUserCommand: (userCommand: string) => void;
    setUserCommandResult: (userCommandResult: string) => void;
    setCommandToRun: (commandToRun: string) => void;
}

export default function PreDefinedCommands({ isOpen, setIsOpen, setSendingCommand, setUserCommand, setUserCommandResult, setCommandToRun }: PreDefinedCommandsProps) {
    const blueprintsList = [
        {
            name: "Chatroom Blueprint",
            command: "chatroom"
        },
        {
            name: "CRED Blueprint",
            command: "cred"
        }, {
            name: "Staking Blueprint",
            command: "staking"
        }, {
            name: "Token Blueprint",
            command: "token"
        }, {
            name: "Voting Blueprint",
            command: "voting"
        },
    ]

    const handleClick = async (item: any) => {
        try {
            setIsOpen(false);
            console.log(`selected item: `, item);
            setSendingCommand(true);
            setUserCommand(`.load-blueprint ${item.command}`);
            setCommandToRun("");

            await loadBluePrint(item.command);

            setSendingCommand(false);
            setUserCommandResult(`Loaded ${item.command} blueprint successfully.`);
        } catch (error) {
            console.error(`Error loading blueprint: `, error);
            setSendingCommand(false);
            setUserCommandResult(`Error loading ${item.command} blueprint.`);
        }
    }

    return (
        <ul className={`absolute bottom-13 w-full h-44 bg-white text-black p-4 rounded-md border border-gray-200 rounded-b-none flex flex-col gap-2 overflow-auto transition-all duration-200 ${isOpen ? 'flex' : 'hidden'
            }`}>
            {
                blueprintsList.map((item: any, index: number) => {
                    return <li key={index}>
                        <button type="button" className="w-full bg-gray-100 hover:bg-gray-200 text-left rounded-md pt-2 pr-2 pb-2" onClick={() => handleClick(item)}>
                            <span className="bg-black text-white p-2 rounded-l-md">/{item.command}</span>
                            <span className="ml-2">{item.name}</span>
                        </button>
                    </li>
                })
            }
        </ul>
    )
}