import { Label, Modal } from "flowbite-react";
import SmallButton from "../SmallButton";
import { useContext, useEffect, useState } from "react";
import { InputField } from "../input";
import { ConnectedProcessContext } from "../../context/ConnectedProcess";

interface Props {
    openModal: boolean;
    setOpenModal: (value: boolean) => void;
}

export default function ConnectProcessModal({ openModal, setOpenModal }: Props) {
    const { connectProcess, connectedProcess } = useContext(ConnectedProcessContext);

    const [error, setError] = useState<string>("");
    const [pid, setPid] = useState<string>("");

    const handleConnect = async () => {
        if (pid === "") {
            setError("Please enter a Process Id");
            return;
        }

        connectProcess(pid);

        setOpenModal(false);
    };

    useEffect(() => {
        console.log("connectedProcess", connectedProcess);
    }, [connectedProcess]);

    return (
        <Modal show={openModal} onClose={() => setOpenModal(false)}>
            <Modal.Header>Connect with a Process</Modal.Header>
            <Modal.Body>
                <div className="space-y-6">
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="processId" value="Enter your Process Id" />
                        </div>

                        <InputField
                            id="processId"
                            placeholder="Process Id"
                            required
                            helperText={error || "Enter the Process Id of the Process you want to connect with."}
                            value={pid}
                            onChange={(e: any) => setPid(e.target.value)}
                        />
                    </div>

                    <SmallButton text="Connect" state="black" handleClick={handleConnect} />
                </div>
            </Modal.Body>
        </Modal>
    )
}