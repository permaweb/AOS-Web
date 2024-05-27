import { useContext, useEffect, useState } from "react";
import { ConnectedProcessContext } from "../../context/ConnectedProcess";
import SmallButton from "../SmallButton";

export default function NewProcessConnectedToast({
  processId,
}: {
  processId: string;
}) {
  const { isNewProcess, setIsNewProcess } = useContext(ConnectedProcessContext);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [savedID, setSavedID] = useState<string | null>(null);

  const handleClick = () => {
    setIsNewProcess(false);
    setShowModal(false);
    setSavedID(null);
  };

  useEffect(() => {
    if (isNewProcess) {
      setShowModal(true);
      setSavedID(processId);
    }
  }, [isNewProcess]);

  if (showModal && processId === savedID) {
    return (
      <div className="absolute animate-slide-in-top bottom-full left-0 right-0 mb-2 flex flex-col gap-2 bg-primary-dark-color text-white rounded-lg p-4 font-dm-sans">
        <span>
          New Process was successfully connected, with the process ID:
        </span>
        <div className="p-2 border border-dark-gray-color rounded-lg border-dashed font-bold tracking-wider font-roboto-mono">
          {savedID}
        </div>
        <span>Your terminal has been switched to this process.</span>
        <SmallButton text="Got it" state="white" handleClick={handleClick} />
      </div>
    );
  }

  return;
}
