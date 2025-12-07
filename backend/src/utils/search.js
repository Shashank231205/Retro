/**
 * Full-text search on customerName + phoneNumber.
 * Case-insensitive, supports partial matches.
 */
export const applySearch = (data, searchText = "") => {
  if (!searchText || !searchText.trim()) return data;

  const query = searchText.trim().toLowerCase();

  return data.filter((item) => {
    const name = (item.customerName || "").toLowerCase();
    const phone = (item.phoneNumber || "").toLowerCase();
    return name.includes(query) || phone.includes(query);
  });
};
