import { createContext, useState, useEffect, ReactNode } from "react";
import { evaluate, findMyPIDs, live, register } from "../helpers/aos";
import { useApi } from "arweave-wallet-kit";

export type ProcessProps = {
  selectedProcessHistory?: any;
  isConnected?: boolean;
};

type LastNewProcess = {
  id: string;
};

export type ProcessHistoryItemProps = {
  id: string;
  name: string;
  cursor: string;
};

type ConnectedProcessContextType = {
  processHistoryList: ProcessHistoryItemProps[];
  findProcessHistory: (
    owner: string,
    length?: number,
    cursor?: string,
    pName?: string
  ) => void;
  connectedProcess: ProcessProps | null;
  lastNewProcess: LastNewProcess | null;
  setLastNewProcess: (value: LastNewProcess | null) => void;
  connectProcess: (process: string) => void;
  createProcess: (name: string) => void;
  sendCommand: (processId: string, command: string) => void;
  disconnectProcess: () => void;
};

const ConnectedProcessContext = createContext<ConnectedProcessContextType>({
  processHistoryList: [],
  findProcessHistory: (
    _owner: string,
    _length?: number,
    _cursor?: string,
    _pName?: string
  ) => {},
  connectedProcess: null,
  lastNewProcess: null,
  setLastNewProcess: (_value: LastNewProcess | null) => {},
  connectProcess: (_process: string) => {},
  createProcess: (_name: string) => {},
  sendCommand: (_processId: string, _command: string) => {},
  disconnectProcess: () => {},
});

const ConnectedProcessProvider = ({ children }: { children: ReactNode }) => {
  const api = useApi();
  const [processHistoryList, setProcessHistoryList] = useState<
    ProcessHistoryItemProps[]
  >([]);
  const [connectedProcess, setConnectedProcess] = useState<ProcessProps | null>(
    null
  );
  const [lastNewProcess, setLastNewProcess] = useState<LastNewProcess | null>(
    null
  );
  const interval = 3000; // 5 seconds
  const [timer, setTimer] = useState<any>(null);

  const createProcess = async (name: string) => {
    console.log("Creating process with name: ", name);
    const signer = api;
    // await signer.connect();
    console.log(signer)
    if (signer === undefined || signer === null || !("signDataItem" in signer)) {
      console.error("Please connect your wallet to create a process");
      return;
    }

    const pid = await register(name, signer);
    console.log("pid ", pid);
    return pid;
  };

  const findProcessHistory = async (
    owner: string,
    length?: any,
    cursor?: any,
    pName?: any
  ) => {
    if (pName) {
      const processes = await findMyPIDs(owner, length, cursor, pName);
      setProcessHistoryList(processes);
      return processes;
    } else if (cursor) {
      const processes = await findMyPIDs(owner, length, cursor);
      setProcessHistoryList((prev) => {
        return [...prev, ...processes];
      });
      return processes;
    } else {
      const processes = await findMyPIDs(owner, length);
      setProcessHistoryList(processes);
      return processes;
    }
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

    const signer = api;
    // await signer.connect();

    if (signer === undefined || signer === null || !('signDataItem' in signer)) {
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
        lastNewProcess,
        setLastNewProcess,
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
