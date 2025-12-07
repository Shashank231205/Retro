export default function PaginationControls({
  page,
  hasPrev,
  hasNext,
  onPageChange
}) {
  return (
    <div className="pagination-controls">
      <button
        disabled={!hasPrev}
        onClick={() => onPageChange(page - 1)}
        className="btn"
      >
        Previous
      </button>

      <span className="page-indicator">Page {page}</span>

      <button
        disabled={!hasNext}
        onClick={() => onPageChange(page + 1)}
        className="btn"
      >
        Next
      </button>
    </div>
  );
}
