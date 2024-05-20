import { Link } from "react-router-dom";
import { ProcessProps } from "../../context/ProcessesContext";
import { useContext, useEffect, useState } from "react";
import ProcessesBarEmptyState from "../empty_states/ProcessesBarEmptyState";
import EmptySearchIcon from "../icons/EmptySearchIcon";
import { ConnectedProcessContext } from "../../context/ConnectedProcess";
import CopyIcon from "../icons/CopyIcon";
import CopyCheck from "../icons/CopyCheck";
import { formatId } from "../../helpers/helper";

type ProcessListItemProps = ProcessProps & {
  active: boolean;
};

type ProcessListProps = {
  searchParam: string | null;
  currentId: string;
};

function ProcessListItem({ id, active }: ProcessListItemProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(id).then(() => {
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 1000);
    });
  };

  return (
    <div className={"font-dm-sans tracking-wider flex  relative "}>
      <Link
        to={`/process/${id}`}
        className="peer flex gap-2 items-center py-1.5 pl-5 pr-2 flex-grow relative z-[1] transition-opacity active:opacity-25"
      >
        <span>{formatId(id)}</span>
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
              <div className="animate-slide-in-right md:animate-slide-in-left  bg-primary-dark-color text-white px-2.5 py-1 rounded-md">
                Copied!
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
      </div>
    );
  }
  return <ProcessesBarEmptyState />;
}
