import { Label, Modal } from "flowbite-react";
import SmallButton from "../SmallButton";
import { useContext, useState } from "react";
import { InputField } from "../input";
import { ConnectedProcessContext } from "../../context/ConnectedProcess";
import { usePublicKey } from "arweave-wallet-kit";
import { useNavigate } from "react-router";
import StatusLoadingIcon from "../icons/StatusLoadingIcon";

interface Props {
  openModal: boolean;
  setOpenModal: (value: boolean) => void;
}

export default function CreateProcessModal({ openModal, setOpenModal }: Props) {
  const navigate = useNavigate();
  const { createProcess, setLastNewProcess } = useContext(
    ConnectedProcessContext
  );
  const publicKey = usePublicKey();
  const [error, setError] = useState<string>("");
  const [pName, setPName] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleCreate = async () => {
    setIsLoading(true);
    if (pName === "") {
      setError("Please enter a Process Name");
      setIsLoading(false);
      return;
    }
    if (publicKey === null || publicKey === "" || publicKey === undefined) {
      setError("Please connect your wallet to create a process");
      setIsLoading(false);
      return;
    }

    const pid: any = await createProcess(pName);
    setIsLoading(false);
    setOpenModal(false);

    if (pid) {
      navigate(`/process/${pid}`);
      setLastNewProcess({ id: pid });
    }
  };

  return (
    <Modal show={openModal} onClose={() => setOpenModal(false)}>
      <Modal.Header>Create a Process</Modal.Header>
      <Modal.Body>
        <div className="space-y-6">
          <div>
            <div className="mb-2 block">
              <Label htmlFor="processName" value="Enter your Process Name" />
            </div>

            <InputField
              id="processName"
              placeholder="Process Name"
              required
              helperText={error || "Enter the Process Name you want to create"}
              value={pName}
              onChange={(e: any) => setPName(e.target.value)}
            />
          </div>
          {!isLoading ? (
            <SmallButton
              text="Create"
              state="black"
              handleClick={handleCreate}
            />
          ) : (
            <SmallButton
              text="Create"
              state="black"
              IconComponent={StatusLoadingIcon}
            />
          )}
        </div>
      </Modal.Body>
    </Modal>
  );
}
