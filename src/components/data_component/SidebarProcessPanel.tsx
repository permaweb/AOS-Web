import { useContext, useEffect, useRef, useState } from "react";
import AddProcessButton from "../AddProcessButton";
import SearchIcon from "../icons/SearchIcon";
import ProcessList from "./ProcessList";
import ProcessPagination from "./ProcessPagination";
import { ConnectedProcessContext } from "../../context/ConnectedProcess";
import { useActiveAddress } from "arweave-wallet-kit";

type SidebarProcessPanelProps = {
  processId: string | undefined;
  showConnectModal: (val: boolean) => void;
  showCreateModal: (val: boolean) => void;
};

export default function SidebarProcessPanel({
  processId,
  showCreateModal,
  showConnectModal,
}: SidebarProcessPanelProps) {
  const { processHistoryList, findProcessHistory } = useContext(ConnectedProcessContext);
  const publicKey = useActiveAddress();
  const [currentPage, setCurrentPage] = useState<number>(1);

  const [searchParam, setSearchParam] = useState<string | null>(null);
  const inputElement = useRef<HTMLInputElement>(null);
  const handleInputChange = () =>
    setSearchParam(
      inputElement.current
        ? inputElement.current.value.length >= 1
          ? inputElement.current.value
          : null
        : null
    );

  const handleNextPage = async () => {
    const lastProcess = processHistoryList[processHistoryList.length - 1];
    console.log("lastProcess", lastProcess);

    findProcessHistory(publicKey!, 11, lastProcess?.cursor);

    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => (prevPage > 1 ? prevPage - 1 : prevPage));
  };

  useEffect(() => {
    if (searchParam) {
      const timeout = setTimeout(() => {
        findProcessHistory(publicKey!, 10, undefined, searchParam);
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [searchParam]);



  return (
    <div className="  flex flex-col gap-2.5 justify-between">
      <div className="flex flex-col gap-2.5 px-5 pt-4">
        <span className="uppercase">MY PROCESSES</span>
        <div className="flex flex-col gap-1.5">
          <label className="relative" htmlFor="searchProcesses">
            <input
              type="text"
              name="searchProcesses"
              placeholder="Search"
              className="w-full pr-3 pl-8 py-2  outline outline-light-gray-color bg-bg-color outline-1 rounded-smd leading-none font-dm-sans 
            placeholder:text-gray-text-color focus:outline-primary-dark-color peer transition-colors"
              spellCheck="false"
              ref={inputElement}
              onChange={handleInputChange}
            ></input>
            <SearchIcon className="absolute left-2.5 top-0 bottom-0 m-auto transition-colors text-gray-text-color peer-focus:text-primary-dark-color" />
          </label>
          <AddProcessButton
            showConnectModal={showConnectModal}
            showCreateModal={showCreateModal}
          />
        </div>
      </div>
      <ProcessList currentId={processId || ""} currentPage={currentPage} />
      <div className="px-5">
        <ProcessPagination
          handleNextPage={handleNextPage}
          handlePreviousPage={handlePreviousPage}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  );
}
