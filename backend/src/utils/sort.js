/**
 * Sorting on:
 * - date (default: newest first)
 * - quantity
 * - customerName
 */
export const applySort = (data, sortBy = "date", order = "desc") => {
  const sorted = [...data];
  const dir = order === "asc" ? 1 : -1;

  sorted.sort((a, b) => {
    let valA;
    let valB;

    switch (sortBy) {
      case "customerName":
        valA = (a.customerName || "").toLowerCase();
        valB = (b.customerName || "").toLowerCase();
        if (valA < valB) return -1 * dir;
        if (valA > valB) return 1 * dir;
        return 0;

      case "quantity":
        valA = a.quantity ?? 0;
        valB = b.quantity ?? 0;
        return (valA - valB) * dir;

      case "date":
      default:
        valA = a.date ? a.date.getTime() : 0;
        valB = b.date ? b.date.getTime() : 0;
        return (valA - valB) * dir;
    }
  });

  return sorted;
};
