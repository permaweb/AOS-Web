import { useContext } from "react";
import { ConnectedProcessContext } from "../../context/ConnectedProcess";
import SmallButton from "../SmallButton";

export default function NewProcessConnectedToast({
  processId,
}: {
  processId: string;
}) {
  const { lastNewProcess, setLastNewProcess } = useContext(
    ConnectedProcessContext
  );

  const handleClick = () => {
    setLastNewProcess(null);
  };

  if (lastNewProcess && lastNewProcess.id === processId) {
    return (
      <div className="absolute top-0 bottom-0 left-0 right-0 flex items-center justify-center z-[1]">
        <div className=" text-center animate-scale-in  mb-2 flex flex-col gap-6 font-bold bg-primary-dark-color text-white rounded-lg p-4 font-dm-sans shadow-xl">
          <div className="flex flex-col items-center gap-2 font-normal">
            <span>
              New Process was successfully connected, with the process ID:
            </span>
            <div className="p-2 border border-dark-gray-color rounded-lg border-dashed font-bold tracking-wider font-roboto-mono break-all">
              {lastNewProcess.id}
            </div>
            <span>Your terminal has been switched to this process.</span>
          </div>
          <SmallButton text="Got it" state="white" handleClick={handleClick} />
        </div>
      </div>
    );
  }

  return;
}
