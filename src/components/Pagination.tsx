import React from "react";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void; 
}

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  const getPageNumbers = () => {
    const pages = [];
    const showEllipsisStart = currentPage > 4;
    const showEllipsisEnd = currentPage < totalPages - 3;

    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    pages.push(1);

    if (showEllipsisStart) {
      pages.push("ellipsis");
    }

    for (
      let i = Math.max(2, currentPage - 2);
      i <= Math.min(currentPage + 2, totalPages - 1);
      i++
    ) {
      pages.push(i);
    }

    if (showEllipsisEnd) {
      pages.push("ellipsis");
    }

    if (totalPages > 1) {
      pages.push(totalPages);
    }
    return pages;
  };

  const pageNumbers = getPageNumbers();

  const PageButton = ({
    page,
    isActive = false,
  }: {
    page: number | string;
    isActive?: boolean;
  }) => {
    if (page === "ellipsis") {
      return (
        <span className="px-3 py-2">
          <MoreHorizontal className="w-5 h-5 text-gray-400" />
        </span>
      );
    }

    return (
      <button
        onClick={() => onPageChange(Number(page))}
        className={cn(
          "px-3 py-2 rounded-md text-sm font-medium transition-colors",
          isActive
            ? "bg-green-100 text-black"
            : "text-gray-600 hover:bg-gray-100"
        )}
        aria-current={isActive ? "page" : undefined}
      >
        {page}
      </button>
    );
  };

  return (
    <nav
      className="flex items-center justify-center space-x-2 mt-8"
      role="navigation"
      aria-label="Pagination"
    >
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={cn(
          "flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors",
          currentPage === 1
            ? "pointer-events-none text-gray-300"
            : "text-gray-600 hover:bg-gray-100"
        )}
        aria-disabled={currentPage === 1}
        aria-label="Previous page"
      >
        <ChevronLeft className="w-4 h-4 mr-1" />
        Previous
      </button>

      <div className="flex items-center space-x-1">
        {pageNumbers.map((page, index) => (
          <PageButton
            key={`${page}-${index}`}
            page={page}
            isActive={page === currentPage}
          />
        ))}
      </div>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={cn(
          "flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors",
          currentPage === totalPages
            ? "pointer-events-none text-gray-300"
            : "text-gray-600 hover:bg-gray-100"
        )}
        aria-disabled={currentPage === totalPages}
        aria-label="Next page"
      >
        Next
        <ChevronRight className="w-4 h-4 ml-1" />
      </button>
    </nav>
  );
};

export default Pagination;
