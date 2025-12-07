export default function SortDropdown({ sort, onChange }) {
  const currentValue =
    sort.by === "date" && sort.order === "desc"
      ? "date_desc"
      : sort.by === "quantity"
      ? "quantity_asc"
      : "customerName_asc";

  const handleChange = (e) => {
    const v = e.target.value;

    if (v === "date_desc") onChange({ by: "date", order: "desc" });
    if (v === "quantity_asc") onChange({ by: "quantity", order: "asc" });
    if (v === "customerName_asc")
      onChange({ by: "customerName", order: "asc" });
  };

  return (
    <div className="sort-dropdown">
      <label>
        Sort by:&nbsp;
        <select value={currentValue} onChange={handleChange}>
          <option value="date_desc">Date (Newest first)</option>
          <option value="quantity_asc">Quantity (Low → High)</option>
          <option value="customerName_asc">Customer Name (A–Z)</option>
        </select>
      </label>
    </div>
  );
}
