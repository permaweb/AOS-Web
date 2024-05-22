import { useState, useEffect, useRef } from "react";
import SmallButton from "../SmallButton";
import PaginationIconLeft from "../icons/PaginationIconLeft";
import PaginationIconRight from "../icons/PaginationIconRight";

export default function ProcessPagination() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pages] = useState<number[]>(
    Array.from({ length: 20 }, (_, i) => i + 1)
  );
  const containerRef = useRef<HTMLDivElement>(null);
  const [visiblePages, setVisiblePages] = useState<number[]>([]);

  useEffect(() => {
    const updateVisiblePages = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const buttonWidth = 40; // Set a minimum width for the page buttons
        const maxPages = Math.floor(containerWidth / buttonWidth);

        const half = Math.floor(maxPages / 2);
        let start = Math.max(currentPage - half, 1);
        let end = Math.min(start + maxPages - 1, pages.length);

        if (end - start + 1 < maxPages) {
          start = Math.max(end - maxPages + 1, 1);
        }

        setVisiblePages(pages.slice(start - 1, end));
      }
    };

    updateVisiblePages(); // Update visible pages initially

    const resizeObserver = new ResizeObserver(updateVisiblePages);

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        resizeObserver.unobserve(containerRef.current);
      }
    };
  }, [currentPage, pages]);

  const handleNextPage = () => {
    setCurrentPage((prevPage) =>
      prevPage < pages.length ? prevPage + 1 : prevPage
    );
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => (prevPage > 1 ? prevPage - 1 : prevPage));
  };

  const handleChoosePage = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="flex gap-2 justify-between min-w-0">
      <div
        className={`${
          currentPage > 1 ? "" : "pointer-events-none select-none opacity-25"
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
        className="grid flex-grow min-w-0 overflow-hidden"
        style={{
          gridTemplateColumns: `repeat(${visiblePages.length}, minmax(40px, 1fr))`,
        }}
        ref={containerRef}
      >
        {visiblePages.map((page) => (
          <button
            key={page}
            onClick={() => handleChoosePage(page)}
            className={`px-3 rounded-smd font-roboto-mono tabular-nums justify-center items-center min-w-0 ${
              currentPage === page ? "text-bg-color bg-primary-dark-color" : ""
            }`}
            style={{
              fontWeight: currentPage === page ? "bold" : "normal",
            }}
          >
            {page}
          </button>
        ))}
      </div>

      <div
        className={`${
          currentPage < pages.length
            ? ""
            : "pointer-events-none select-none opacity-25"
        }`}
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
