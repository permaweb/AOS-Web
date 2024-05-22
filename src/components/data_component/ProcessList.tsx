import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import ProcessesBarEmptyState from "../empty_states/ProcessesBarEmptyState";
import EmptySearchIcon from "../icons/EmptySearchIcon";
import {
  ConnectedProcessContext,
  ProcessHistoryItemProps,
} from "../../context/ConnectedProcess";
import CopyIcon from "../icons/CopyIcon";
import CopyCheck from "../icons/CopyCheck";

type ProcessListItemProps = {
  process: { id: string; name: string };
  active: boolean;
};

type ProcessListProps = {
  searchParam: string | null;
  currentId: string;
};

function ProcessListItem({ process, active }: ProcessListItemProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(process.id).then(() => {
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 1000);
    });
  };

  return (
    <div className={"font-dm-sans tracking-wider flex  relative "}>
      <Link
        to={`/process/${process?.id}`}
        className="peer flex min-w-0 items-center py-1.5 pl-5 pr-2 flex-grow relative z-[1] transition-opacity active:opacity-25"
      >
        <div className="overflow-hidden truncate flex-grow min-w-0">
          {process.name}
        </div>
        <div className="tabular-nums min-w-14 font-roboto-mono">
          #{process.id.slice(0, 5)}
        </div>
      </Link>

      <div
        className={`absolute left-0 top-0 right-0 bottom-0 transition  peer-active:opacity-25
        ${active ? " bg-light-gray-color" : " peer-hover:bg-[#e7e7e7] "}`}
      />
      <div className="py-1 pr-5 flex items-center transition-opacity peer-active:opacity-25 ">
        <div className="relative">
          <button
            onClick={handleCopy}
            className={`base-transition ${
              active
                ? "hover:bg-medium-gray-color"
                : "hover:bg-light-gray-color"
            } hover:text-primary-dark-color p-2 rounded-lg`}
          >
            {copied ? <CopyCheck /> : <CopyIcon />}
          </button>
          {copied && (
            <div className="absolute right-full mr-2 md:left-full  bottom-0  top-0 md:right-auto md:ml-2 md:mr-0 flex justify-end select-none z-10">
              <div className="animate-slide-in-right md:animate-slide-in-left min-w-max bg-primary-dark-color text-white px-2.5 py-1 rounded-md">
                Copied ID!
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ProcessList({
  currentId,
  searchParam,
}: ProcessListProps) {
  const { processHistoryList } = useContext(ConnectedProcessContext);

  const [filteredProcess, setFilteredProcess] =
    useState<ProcessHistoryItemProps[]>(processHistoryList);
  useEffect(() => {
    if (searchParam && processHistoryList.length > 0) {
      const searchParamLower = searchParam.toLowerCase();
      const filtered = processHistoryList.filter(
        (process) =>
          process.name.toLocaleLowerCase().includes(searchParamLower) ||
          process.id.toLocaleLowerCase().includes(searchParamLower)
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
                process={process}
                active={currentId === process?.id}
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
      </div>
    );
  }
  return <ProcessesBarEmptyState />;
}
