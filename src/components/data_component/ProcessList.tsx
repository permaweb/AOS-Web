import { Link } from "react-router-dom";
import {
  MyProcessesContext,
  ProcessProps,
} from "../../context/ProcessesContext";
import GlobalIcon from "../icons/GlobalIcon";
import { useContext, useEffect, useState } from "react";
import ProcessesBarEmptyState from "../empty_states/ProcessesBarEmptyState";
import Toggle from "../Toggle";
import { ArrowLeft } from "../AddProcessButton";
import EmptySearchIcon from "../icons/EmptySearchIcon";
import { ConnectedProcessContext } from "../../context/ConnectedProcess";

type ProcessListItemProps = ProcessProps & {
  active: boolean;
};

type ProcessListProps = {
  searchParam: string | null;
  currentId: string;
};

function GlobalProcessInfo() {
  return (
    <div className="hidden group-hover:flex flex-col gap-3 animate-slide-in-left absolute w-max max-w-48 left-full font-roboto-mono -top-2 ml-3 bg-primary-dark-color text-bg-color p-3 rounded-smd z-40">
      <ArrowLeft />
      <GlobalIcon />
      <span className="font-bold uppercase leading-none">Global Process</span>
      <span className="font-dm-sans">
        This process is from a different user’s wallet, so you cannot run
        commands in it.
      </span>
    </div>
  );
}

function ProcessListItem({ id, active }: ProcessListItemProps) {
  return (
    <Link
      to={`/process/${id}`}
      className={
        " font-dm-sans tracking-wider  " + (active ? "bg-light-gray-color" : "")
      }
    >
      <div className="base-transition flex gap-2 items-center py-1.5 pl-5 pr-2 ">
        <span className="truncate max-w-28">{id}</span>
        {/* {isGlobal ? (
          <div className="group p-2 relative -m-2">
            <GlobalIcon />
            <GlobalProcessInfo />
          </div>
        ) : ( */}
        <div className="w-3" />
        {/* )} */}
      </div>
    </Link>
  );
}

export default function ProcessList({
  currentId,
  searchParam,
}: ProcessListProps) {
  const { processHistoryList } = useContext(ConnectedProcessContext);
  // const { myProcesses } = useContext(MyProcessesContext);
  // const [processDisplaySettings, setProcessDisplaySettings] = useState<{
  //   showGlobalProcesses: boolean;
  //   showMyProcesses: boolean;
  // }>({ showGlobalProcesses: true, showMyProcesses: true });

  // const handleToggleGlobalProcesses = () =>
  //   setProcessDisplaySettings((prevValue) => {
  //     const invertGlobalProcesses = !prevValue.showGlobalProcesses;
  //     return { ...prevValue, showGlobalProcesses: invertGlobalProcesses };
  //   });

  // const handleToggleMyProcesses = () =>
  //   setProcessDisplaySettings((prevValue) => {
  //     const invertMyProcesses = !prevValue.showMyProcesses;
  //     return { ...prevValue, showMyProcesses: invertMyProcesses };
  //   });

  // const filteredProcess = processHistoryList.filter(
  //   (process: any) =>
  //     (process.isGlobal
  //       ? processDisplaySettings.showGlobalProcesses
  //       : processDisplaySettings.showMyProcesses) &&
  //     (searchParam ? process.id.includes(searchParam) : true)
  // );

  const [filteredProcess, setFilteredProcess] = useState(processHistoryList);
  useEffect(() => {
    if (searchParam && processHistoryList.length > 0) {
      const searchParamLower = searchParam.toLowerCase();
      const filtered = processHistoryList.filter((process) =>
        process.toLocaleLowerCase().includes(searchParamLower)
      );
      setFilteredProcess(filtered);
    } else {
      setFilteredProcess(processHistoryList || []);
    }
  }, [searchParam, processHistoryList]);

  if (processHistoryList.length > 0) {
    return (
      <div className="flex flex-col flex-grow min-h-0 mb-4">
        <div className="flex flex-col flex-grow min-h-0">
          {filteredProcess.length > 0 ? (
            filteredProcess.map((process, id) => (
              <ProcessListItem
                key={id}
                id={process}
                active={currentId === process}
              />
            ))
          ) : (
            <div className="p-5">
              <div className="flex flex-col items-center gap-4 p-4 border-1 text-center border-gray-text-color rounded-xl border-dashed">
                <EmptySearchIcon />
                <div className="flex flex-col items-center gap-2">
                  <span className="uppercase font-bold leading-none">
                    No results
                  </span>
                  <span className="font-dm-sans">
                    Looks like there’s no processes that match this query
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
        {/* {myProcesses.some((process) => process.isGlobal) &&
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
          )} */}
      </div>
    );
  }
  return <ProcessesBarEmptyState />;
}
