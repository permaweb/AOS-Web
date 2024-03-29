import React, { createContext, useState, useEffect, ReactNode } from "react";

export type ProcessProps = {
  id: string;
  isGlobal: boolean;
};

type ProcessesContextType = {
  myProcesses: ProcessProps[];
  addProcess: (process: ProcessProps) => void;
  removeProcess: (processId: string) => void;
};

const MyProcessesContext = createContext<ProcessesContextType>({
  myProcesses: [],
  addProcess: (process: ProcessProps) => {},
  removeProcess: (processId: string) => {},
});

const MyProcessesProvider = ({ children }: { children: ReactNode }) => {
  const [myProcesses, setMyProcesses] = useState<ProcessProps[]>([]);

  const addProcess = (process: ProcessProps) => {
    setMyProcesses((currentProcesses) => [...currentProcesses, process]);
  };

  const removeProcess = (processId: string) => {
    setMyProcesses((currentProcesses) =>
      currentProcesses.filter((process) => process.id !== processId)
    );
  };

  useEffect(() => {
    console.log("Current Processes:", myProcesses);
  }, [myProcesses]);

  return (
    <MyProcessesContext.Provider
      value={{ myProcesses, addProcess, removeProcess }}
    >
      {children}
    </MyProcessesContext.Provider>
  );
};

export { MyProcessesContext, MyProcessesProvider };
