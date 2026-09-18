import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

export function Pagination({ currentPage, totalPages }: PaginationProps) {
  const pages = buildPageList(currentPage, totalPages);

  return (
    <nav
      aria-label="Pagination"
      className="flex items-center gap-2 font-sans text-sm"
    >
      <button
        disabled={currentPage <= 1}
        aria-label="Previous page"
        className="flex h-9 w-9 items-center justify-center rounded-sm border border-neutral-200 text-neutral-500 hover:bg-neutral-50 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <ChevronLeft size={16} />
      </button>
      {pages.map((page, index) =>
        page === "ellipsis" ? (
          <span
            key={`ellipsis-${index}`}
            className="flex h-9 w-9 items-center justify-center text-neutral-300"
          >
            &hellip;
          </span>
        ) : (
          <button
            key={page}
            aria-current={page === currentPage ? "page" : undefined}
            className={`flex h-9 w-9 items-center justify-center rounded-sm border ${
              page === currentPage
                ? "border-primary-500 bg-primary-500 text-white"
                : "border-neutral-200 text-neutral-700 hover:bg-neutral-50"
            }`}
          >
            {page}
          </button>
        ),
      )}
      <button
        disabled={currentPage >= totalPages}
        aria-label="Next page"
        className="flex h-9 w-9 items-center justify-center rounded-sm border border-neutral-200 text-neutral-500 hover:bg-neutral-50 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <ChevronRight size={16} />
      </button>
    </nav>
  );
}

function buildPageList(
  currentPage: number,
  totalPages: number,
): (number | "ellipsis")[] {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const pages = new Set<number>([
    1,
    2,
    totalPages,
    currentPage - 1,
    currentPage,
    currentPage + 1,
  ]);
  const sorted = [...pages]
    .filter((page) => page >= 1 && page <= totalPages)
    .sort((a, b) => a - b);

  const result: (number | "ellipsis")[] = [];
  sorted.forEach((page, index) => {
    if (index > 0 && page - sorted[index - 1] > 1) {
      result.push("ellipsis");
    }
    result.push(page);
  });

  return result;
}
