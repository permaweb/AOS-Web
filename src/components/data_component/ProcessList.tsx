import { Link } from "react-router-dom";
import {
  MyProcessesContext,
  ProcessProps,
} from "../../context/ProcessesContext";
import GlobalIcon from "../icons/GlobalIcon";
import { useContext, useState } from "react";
import ProcessesBarEmptyState from "../empty_states/ProcessesBarEmptyState";
import Toggle from "../Toggle";

type ProcessListItemProps = ProcessProps & {
  active: boolean;
};

type ProcessListProps = {
  currentId: string;
};

function ProcessListItem({ id, isGlobal, active }: ProcessListItemProps) {
  return (
    <Link
      to={`/process/${id}`}
      className={
        " font-dm-sans tracking-wider  " + (active ? "bg-light-gray-color" : "")
      }
    >
      <div className="base-transition flex gap-2 items-center py-1.5 pl-5 pr-2 ">
        <span className="truncate max-w-28">{id}</span>
        {isGlobal ? <GlobalIcon /> : <div className="w-3" />}
      </div>
    </Link>
  );
}

export default function ProcessList({ currentId }: ProcessListProps) {
  const { myProcesses } = useContext(MyProcessesContext);
  const [processDisplaySettings, setProcessDisplaySettings] = useState<{
    showGlobalProcesses: boolean;
    showMyProcesses: boolean;
  }>({ showGlobalProcesses: true, showMyProcesses: true });

  const handleToggleGlobalProcesses = () =>
    setProcessDisplaySettings((prevValue) => {
      const invertGlobalProcesses = !prevValue.showGlobalProcesses;
      return { ...prevValue, showGlobalProcesses: invertGlobalProcesses };
    });

  const handleToggleMyProcesses = () =>
    setProcessDisplaySettings((prevValue) => {
      const invertMyProcesses = !prevValue.showMyProcesses;
      return { ...prevValue, showMyProcesses: invertMyProcesses };
    });

  if (myProcesses.length > 0) {
    return (
      <div className="flex flex-col flex-grow min-h-0">
        <div className="flex flex-col flex-grow min-h-0">
          {myProcesses
            .filter((process) =>
              process.isGlobal
                ? processDisplaySettings.showGlobalProcesses
                : processDisplaySettings.showMyProcesses
            )
            .map((process) => (
              <ProcessListItem
                key={process.id}
                {...process}
                active={currentId === process.id}
              />
            ))}
        </div>
        {myProcesses.some((process) => process.isGlobal) &&
          myProcesses.some((process) => !process.isGlobal) && (
            <div className="flex flex-col gap-2 p-5 border-t-1 border-light-gray-color">
              <span className="uppercase">Filter Processes</span>
              <button
                className="flex gap-2 items-center font-dm-sans"
                onClick={handleToggleMyProcesses}
              >
                <Toggle on={processDisplaySettings.showMyProcesses} />
                <span>My Processes</span>
              </button>
              <button
                className="flex gap-2 items-center font-dm-sans"
                onClick={handleToggleGlobalProcesses}
              >
                <Toggle on={processDisplaySettings.showGlobalProcesses} />
                <div className="flex items-center gap-1">
                  <span>Global</span>
                  <div className="flex items-center">
                    <span>{"("}</span>
                    <GlobalIcon />
                    <span>{")"}</span>
                  </div>
                </div>
              </button>
            </div>
          )}
      </div>
    );
  }
  return <ProcessesBarEmptyState />;
}
