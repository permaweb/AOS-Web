import { useContext, useEffect, useState } from "react";
import ProcessesBarEmptyState from "../empty_states/ProcessesBarEmptyState";
import EmptySearchIcon from "../icons/EmptySearchIcon";
import {
  ConnectedProcessContext,
  ProcessHistoryItemProps,
} from "../../context/ConnectedProcess";
import ProcessListItem, { EmptyProcessListItem } from "./ProcessListItem";

type ProcessListProps = {
  currentId: string;
  currentPage: number;
  mode: "loading" | "default" | "search results";
};

export default function ProcessList({
  currentId,
  currentPage,
  mode,
}: ProcessListProps) {
  const { processHistoryList } = useContext(ConnectedProcessContext);
  const [filteredProcess, setFilteredProcess] = useState<
    ProcessHistoryItemProps[]
  >([]);

  useEffect(() => {
    const itemsPerPage = 10;

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const filtered = processHistoryList.slice(startIndex, endIndex);
    setFilteredProcess(filtered);
  }, [processHistoryList, currentPage]);

  if (mode === "loading")
    return (
      <div className="flex flex-col flex-grow min-h-0 mb-4">
        <div className="flex flex-col flex-grow min-h-0">
          {Array(10)
            .fill("")
            .map((_, index) => (
              <EmptyProcessListItem key={`empty-loading-item-${index}`} />
            ))}
        </div>
      </div>
    );

  if (processHistoryList.length > 0)
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

  return <ProcessesBarEmptyState />;
}
