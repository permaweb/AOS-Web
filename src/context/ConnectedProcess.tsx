import { createContext, useState, useEffect, ReactNode } from "react";
import { evaluate, findMyPIDs, live, register } from "../helpers/aos";

export type ProcessProps = {
  selectedProcessHistory?: any;
  isConnected?: boolean;
};

type ConnectedProcessContextType = {
  processHistoryList: string[];
  findProcessHistory: (owner: string) => void;
  connectedProcess: ProcessProps | null;
  connectProcess: (process: string) => void;
  createProcess: (name: string) => void;
  sendCommand: (processId: string, command: string) => void;
  disconnectProcess: () => void;
};

const ConnectedProcessContext = createContext<ConnectedProcessContextType>({
  processHistoryList: [],
  findProcessHistory: (_owner: string) => {},
  connectedProcess: null,
  connectProcess: (_process: string) => {},
  createProcess: (_name: string) => {},
  sendCommand: (_processId: string, _command: string) => {},
  disconnectProcess: () => {},
});

const ConnectedProcessProvider = ({ children }: { children: ReactNode }) => {
  const [processHistoryList, setProcessHistoryList] = useState<string[]>([]);
  const [connectedProcess, setConnectedProcess] = useState<ProcessProps | null>(
    null
  );
  const interval = 3000; // 5 seconds
  const [timer, setTimer] = useState<any>(null);

  const createProcess = async (name: string) => {
    console.log("Creating process with name: ", name);
    const globalWallet: any = globalThis;
    const signer = globalWallet.arweaveWallet;
    // await signer.connect();

    if (signer === undefined || signer === null || signer === "") {
      console.error("Please connect your wallet to create a process");
      return;
    }

    const pid = await register(name, signer);
    await connectProcess(pid);
    console.log("pid ", pid);
    return pid;
  };

  const findProcessHistory = async (owner: string) => {
    const processes = await findMyPIDs(owner);
    console.log(processes);
    setProcessHistoryList(processes);
  };

  const connectProcess = async (processId: string) => {
    const data = await live(processId);

    if (data === null || data === "") {
      setConnectedProcess({
        selectedProcessHistory: data,
        isConnected: true,
      });
    }
    setTimer(
      setInterval(async () => {
        const newData = await live(processId);
        if (newData !== null && newData !== "") {
          // console.log("data ", data);
          setConnectedProcess({
            selectedProcessHistory: newData,
            isConnected: true,
          });
        }
      }, interval)
    );
  };

  const sendCommand = async (processId: string, command: string) => {
    const globalWallet: any = globalThis;
    const signer = globalWallet.arweaveWallet;
    // await signer.connect();

    if (signer === undefined || signer === null || signer === "") {
      throw new Error("Please connect your wallet to send a command");
    }

    const result = await evaluate(processId, command, signer);
    return result;
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
      value={{
        connectedProcess,
        connectProcess,
        disconnectProcess,
        createProcess,
        sendCommand,
        processHistoryList,
        findProcessHistory,
      }}
    >
      {children}
    </ConnectedProcessContext.Provider>
  );
};

export { ConnectedProcessContext, ConnectedProcessProvider };
