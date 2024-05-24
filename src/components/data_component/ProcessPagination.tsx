import { useState, useEffect, useContext } from "react";
import SmallButton from "../SmallButton";
import PaginationIconLeft from "../icons/PaginationIconLeft";
import PaginationIconRight from "../icons/PaginationIconRight";
import { ConnectedProcessContext } from "../../context/ConnectedProcess";

interface ProcessPaginationProps {
  handleNextPage: () => void;
  handlePreviousPage: () => void;
  currentPage: number;
  setCurrentPage: (page: number) => void;
}

export default function ProcessPagination({ handleNextPage, handlePreviousPage, currentPage }: ProcessPaginationProps) {
  const [pages, setPages] = useState<number>(1);
  const { processHistoryList } = useContext(ConnectedProcessContext);

  useEffect(() => {
    if (processHistoryList.length > 0) {
      setPages(Math.ceil(processHistoryList.length / 10));
    }
  }, [processHistoryList]);

  return (
    <div className="flex gap-2 justify-between min-w-0">
      <div
        className={`${currentPage > 1 ? "" : "pointer-events-none select-none opacity-25"
          }`}
      >
        <SmallButton
          text=""
          state="white"
          handleClick={handlePreviousPage}
          IconComponent={PaginationIconLeft}
        />
      </div>

      <div
        className={`${currentPage < pages ? "" : "pointer-events-none select-none opacity-25"}`}
      >
        <SmallButton
          text=""
          state="white"
          handleClick={handleNextPage}
          IconComponent={PaginationIconRight}
        />
      </div>
    </div>
  );
}
