// frontend/src/App.jsx
import { useState } from "react";
import SearchBar from "./components/SearchBar.jsx";
import FiltersPanel from "./components/FiltersPanel.jsx";
import SortDropdown from "./components/SortDropdown.jsx";
import TransactionsTable from "./components/TransactionsTable.jsx";
import PaginationControls from "./components/PaginationControls.jsx";
import EmptyState from "./components/EmptyState.jsx";
import Sidebar from "./components/Sidebar.jsx";
import KpiCards from "./components/KpiCards.jsx";

import { useSalesData } from "./hooks/useSalesData.js";
import { useDebounce } from "./hooks/useDebounce.js";

const DEFAULT_SORT = { by: "date", order: "desc" };

const DEFAULT_FILTERS = {
  regions: [],
  genders: [],
  categories: [],
  tags: [],
  paymentMethods: [],
  ageMin: "",
  ageMax: "",
  dateFrom: "",
  dateTo: ""
};

export default function App() {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 400);

  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [sort, setSort] = useState(DEFAULT_SORT);
  const [page, setPage] = useState(1);

  const { data, pagination, loading, error } = useSalesData({
    search: debouncedSearch,
    ...filters,
    sortBy: sort.by,
    sortOrder: sort.order,
    page,
    limit: 10
  });

  // simple stats from current page
  const rows = data || [];
  const unitsSold = rows.reduce((sum, r) => sum + (r.quantity || 0), 0);
  const totalAmount = rows.reduce((sum, r) => sum + (r.totalAmount || 0), 0);
  const totalDiscount = rows.reduce(
    (sum, r) =>
      sum + ((r.totalAmount || 0) - (r.finalAmount || 0)),
    0
  );

  const handleSearchChange = (value) => {
    setSearch(value);
    setPage(1);
  };

  const handleFilterChange = (updatedFilters) => {
    setFilters(updatedFilters);
    setPage(1);
  };

  const handleSortChange = (newSort) => {
    setSort(newSort);
    setPage(1);
  };

  const handlePageChange = (nextPage) => {
    setPage(nextPage);
  };

  return (
    <div className="app-shell">
      <Sidebar />

      <div className="app-main">
        <header className="top-header">
          <div>
            <h1 className="top-title">Sales Management System</h1>
            <p className="top-subtitle">
              Explore sales transactions with search, filters, and sorting.
            </p>
          </div>

          <div className="top-search-wrapper">
            <SearchBar value={search} onChange={handleSearchChange} />
          </div>
        </header>

        <KpiCards
          unitsSold={unitsSold}
          totalAmount={totalAmount}
          totalDiscount={totalDiscount}
        />

        <div className="filters-sort-row">
          <div className="filters-bar">
            <FiltersPanel filters={filters} onChange={handleFilterChange} />
          </div>
          <div className="sort-bar">
            <SortDropdown sort={sort} onChange={handleSortChange} />
          </div>
        </div>

        <section className="table-section">
          {loading && (
            <div className="status-message">Loading transactions...</div>
          )}
          {error && (
            <div className="status-message error">
              Something went wrong. Please try again.
            </div>
          )}

          {!loading && !error && rows.length === 0 && <EmptyState />}

          {!loading && !error && rows.length > 0 && (
            <>
              <TransactionsTable rows={rows} />
              <PaginationControls
                page={pagination?.page ?? 1}
                hasNext={pagination?.hasNext ?? false}
                hasPrev={pagination?.hasPrev ?? false}
                onPageChange={handlePageChange}
              />
            </>
          )}
        </section>
      </div>
    </div>
  );
}
