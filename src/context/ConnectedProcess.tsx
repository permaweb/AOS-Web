import { createContext, useState, useEffect, ReactNode } from "react";
import { live, register } from "../helpers/aos";

export type ProcessProps = {
    data: any;
    isConnected: boolean;
};

type ConnectedProcessContextType = {
    connectedProcess: ProcessProps | null;
    connectProcess: (process: string) => void;
    createProcess: (name: string) => void;
    disconnectProcess: () => void;
};

const ConnectedProcessContext = createContext<ConnectedProcessContextType>({
    connectedProcess: null,
    connectProcess: (process: string) => { },
    createProcess: (name: string) => { },
    disconnectProcess: () => { },
});

const ConnectedProcessProvider = ({ children }: { children: ReactNode }) => {
    const [connectedProcess, setConnectedProcess] = useState<ProcessProps | null>(null);
    const interval = 3000; // 5 seconds
    const [timer, setTimer] = useState<any>(null);

    const createProcess = async (name: string) => {
        console.log("Creating process with name: ", name);
        const globalWallet: any = globalThis;
        const signer = globalWallet.arweaveWallet;

        if (signer === undefined || signer === null || signer === "") {
            console.error("Please connect your wallet to create a process");
            return;
        }

        const pid = await register(name, signer);
        console.log("pid ", pid);
        return pid;
    }

    const connectProcess = async (processId: string) => {
        const data = await live(processId);

        if (data === null || data === "") {
            setConnectedProcess({
                data: data,
                isConnected: true
            });
        }
        setTimer(setInterval(async () => {
            const newData = await live(processId);
            if (newData !== null && newData !== "") {
                // console.log("data ", data);
                setConnectedProcess({
                    data: newData,
                    isConnected: true
                });
            }
        }, interval));
        // }
    };

    const disconnectProcess = () => {
        setConnectedProcess(null);
    };

    useEffect(() => {
        return () => {
            if (timer) {
                console.log("clearing interval");
                clearInterval(timer);
            }
        };
    }, [timer]);

    return (
        <ConnectedProcessContext.Provider
            value={{ connectedProcess, connectProcess, disconnectProcess, createProcess }}
        >
            {children}
        </ConnectedProcessContext.Provider>
    );
};

export { ConnectedProcessContext, ConnectedProcessProvider };