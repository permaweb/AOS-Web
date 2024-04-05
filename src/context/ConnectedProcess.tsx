import { createContext, useState, useEffect, ReactNode } from "react";
import { live } from "../helpers/aos";

export type ProcessProps = {
  data: any;
  isConnected: boolean;
};

type ConnectedProcessContextType = {
  connectedProcess: ProcessProps | null;
  connectProcess: (process: string) => void;
  disconnectProcess: () => void;
};

const ConnectedProcessContext = createContext<ConnectedProcessContextType>({
  connectedProcess: null,
  connectProcess: () => {},
  disconnectProcess: () => {},
});

const ConnectedProcessProvider = ({ children }: { children: ReactNode }) => {
  const [connectedProcess, setConnectedProcess] = useState<ProcessProps | null>(
    null
  );
  const interval = 3000; // 5 seconds
  const [timer, setTimer] = useState<any>(null);

  const connectProcess = async (processId: string) => {
    const data = await live(processId);

    if (data) {
      setConnectedProcess({
        data: data,
        isConnected: true,
      });
      setTimer(
        setInterval(async () => {
          const newData = await live(processId);
          if (newData !== null && newData !== "") {
            // console.log("data ", data);
            setConnectedProcess({
              data: newData,
              isConnected: true,
            });
          }
        }, interval)
      );
    }
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
      value={{ connectedProcess, connectProcess, disconnectProcess }}
    >
      {children}
    </ConnectedProcessContext.Provider>
  );
};

export { ConnectedProcessContext, ConnectedProcessProvider };
