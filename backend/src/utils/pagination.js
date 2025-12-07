/**
 * Paginate results into pages of 10 (default).
 */
export const paginate = (data, page = 1, limit = 10, meta = {}) => {
  const safePage = Number(page) > 0 ? Number(page) : 1;
  const safeLimit = Number(limit) > 0 ? Number(limit) : 10;

  const totalItems = data.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / safeLimit));

  const currentPage = Math.min(safePage, totalPages);
  const start = (currentPage - 1) * safeLimit;
  const end = start + safeLimit;

  return {
    data: data.slice(start, end),
    pagination: {
      page: currentPage,
      limit: safeLimit,
      totalItems,
      totalPages,
      hasNext: currentPage < totalPages,
      hasPrev: currentPage > 1
    },
    meta
  };
};
