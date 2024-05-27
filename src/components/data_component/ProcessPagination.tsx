import { useState, useEffect, useContext, useRef } from "react";
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

export default function ProcessPagination({
  handleNextPage,
  handlePreviousPage,
  currentPage,
}: ProcessPaginationProps) {
  const [pages, setPages] = useState<number>(1);
  const { processHistoryList } = useContext(ConnectedProcessContext);

  const [isBelowWidth, setIsBelowWidth] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        if (entry.contentRect.width < 250) {
          setIsBelowWidth(true);
        } else {
          setIsBelowWidth(false);
        }
      }
    });

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (processHistoryList.length > 0) {
      setPages(Math.ceil(processHistoryList.length / 10));
    }
  }, [processHistoryList]);

  return (
    <div ref={containerRef} className="flex gap-2 justify-between min-w-0">
      <div
        className={`${
          currentPage > 1 ? "" : "pointer-events-none select-none opacity-25"
        }`}
      >
        <SmallButton
          text={isBelowWidth ? "Prev" : "Prev Page"}
          state="white"
          handleClick={handlePreviousPage}
          IconComponent={PaginationIconLeft}
        />
      </div>

      <div
        className={`${
          currentPage < pages
            ? ""
            : "pointer-events-none select-none opacity-25"
        }`}
      >
        <SmallButton
          text={isBelowWidth ? "Next" : "Next Page"}
          state="white"
          iconPosition="right"
          handleClick={handleNextPage}
          IconComponent={PaginationIconRight}
        />
      </div>
    </div>
  );
}
