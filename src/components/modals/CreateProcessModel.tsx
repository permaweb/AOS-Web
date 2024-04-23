import { Label, Modal } from "flowbite-react";
import SmallButton from "../SmallButton";
import { useContext, useState } from "react";
import { InputField } from "../input";
import { ConnectedProcessContext } from "../../context/ConnectedProcess";
import { usePublicKey } from "arweave-wallet-kit";
import { useNavigate } from "react-router";

interface Props {
    openModal: boolean;
    setOpenModal: (value: boolean) => void;
}

export default function CreateProcessModal({ openModal, setOpenModal }: Props) {
    const navigate = useNavigate();
    const { createProcess } = useContext(ConnectedProcessContext);
    const publicKey = usePublicKey();
    const [error, setError] = useState<string>("");
    const [pName, setPName] = useState<string>("");

    const handleCreate = async () => {
        if (pName === "") {
            setError("Please enter a Process Name");
            return;
        }
        if (publicKey === null || publicKey === "" || publicKey === undefined) {
            setError("Please connect your wallet to create a process");
            return;
        }

        const pid: any = await createProcess(pName);
        setOpenModal(false);

        if (pid) {
            navigate(`/process/${pid}`);
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

                    <SmallButton text="Create" state="black" handleClick={handleCreate} />
                </div>
            </Modal.Body>
        </Modal>
    )
}