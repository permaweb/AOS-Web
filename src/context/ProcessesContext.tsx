import React, { createContext, useState, useEffect, ReactNode } from "react";

type ProcessProps = {
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

// Step 2: Create the provider component
const MyProcessesProvider = ({ children }: { children: ReactNode }) => {
  const [myProcesses, setMyProcesses] = useState<ProcessProps[]>([]);

  // Function to add a process
  const addProcess = (process: ProcessProps) => {
    setMyProcesses((currentProcesses) => [...currentProcesses, process]);
  };

  // Function to remove a process
  const removeProcess = (processId: string) => {
    setMyProcesses((currentProcesses) =>
      currentProcesses.filter((process) => process.id !== processId)
    );
  };

  // Effect to log the current processes, can be replaced with any other side effects
  useEffect(() => {
    console.log("Current Processes:", myProcesses);
  }, [myProcesses]);

  // Step 3: Return the provider with the context value
  return (
    <MyProcessesContext.Provider
      value={{ myProcesses, addProcess, removeProcess }}
    >
      {children}
    </MyProcessesContext.Provider>
  );
};

// Export the context and provider
export { MyProcessesContext, MyProcessesProvider };
