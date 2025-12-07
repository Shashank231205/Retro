import { useState } from "react";
import {
  REGIONS,
  GENDERS,
  CATEGORIES,
  PAYMENT_METHODS,
  TAGS,
} from "../utils/constants.js";

export default function FiltersPanel({ filters, onChange }) {
  const [openMenu, setOpenMenu] = useState(null);

  const toggleMenu = (name) => {
    setOpenMenu((prev) => (prev === name ? null : name));
  };

  const isOpen = (name) => openMenu === name;

  const toggleMulti = (field, value) => {
    const current = filters[field] || [];
    const exists = current.includes(value);
    const next = exists
      ? current.filter((v) => v !== value)
      : [...current, value];
    onChange({ ...filters, [field]: next });
  };

  const handleField = (field, value) => {
    onChange({ ...filters, [field]: value });
  };

  return (
    <div className="filters-panel">
      {/* Customer Region */}
      <FilterDropdown
        label="Customer Region"
        isOpen={isOpen("region")}
        onToggle={() => toggleMenu("region")}
      >
        <div className="chips">
          {REGIONS.map((region) => (
            <button
              key={region}
              type="button"
              className={
                filters.regions.includes(region) ? "chip chip-active" : "chip"
              }
              onClick={() => toggleMulti("regions", region)}
            >
              {region}
            </button>
          ))}
        </div>
      </FilterDropdown>

      {/* Gender */}
      <FilterDropdown
        label="Gender"
        isOpen={isOpen("gender")}
        onToggle={() => toggleMenu("gender")}
      >
        <div className="chips">
          {GENDERS.map((gender) => (
            <button
              key={gender}
              type="button"
              className={
                filters.genders.includes(gender) ? "chip chip-active" : "chip"
              }
              onClick={() => toggleMulti("genders", gender)}
            >
              {gender}
            </button>
          ))}
        </div>
      </FilterDropdown>

      {/* Age Range */}
      <FilterDropdown
        label="Age Range"
        isOpen={isOpen("age")}
        onToggle={() => toggleMenu("age")}
      >
        <div className="dropdown-row">
          <div className="dropdown-field">
            <span>Min</span>
            <input
              type="number"
              value={filters.ageMin}
              onChange={(e) => handleField("ageMin", e.target.value)}
              placeholder="18"
            />
          </div>
          <div className="dropdown-field">
            <span>Max</span>
            <input
              type="number"
              value={filters.ageMax}
              onChange={(e) => handleField("ageMax", e.target.value)}
              placeholder="60"
            />
          </div>
        </div>
      </FilterDropdown>

      {/* Product Category */}
      <FilterDropdown
        label="Product Category"
        isOpen={isOpen("category")}
        onToggle={() => toggleMenu("category")}
      >
        <div className="chips">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              className={
                filters.categories.includes(cat) ? "chip chip-active" : "chip"
              }
              onClick={() => toggleMulti("categories", cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </FilterDropdown>

      {/* Tags */}
      <FilterDropdown
        label="Tags"
        isOpen={isOpen("tags")}
        onToggle={() => toggleMenu("tags")}
      >
        <div className="chips">
          {TAGS.map((tag) => (
            <button
              key={tag}
              type="button"
              className={
                filters.tags.includes(tag) ? "chip chip-active" : "chip"
              }
              onClick={() => toggleMulti("tags", tag)}
            >
              {tag}
            </button>
          ))}
        </div>
      </FilterDropdown>

      {/* Payment Method */}
      <FilterDropdown
        label="Payment Method"
        isOpen={isOpen("payment")}
        onToggle={() => toggleMenu("payment")}
      >
        <div className="chips">
          {PAYMENT_METHODS.map((pm) => (
            <button
              key={pm}
              type="button"
              className={
                filters.paymentMethods.includes(pm)
                  ? "chip chip-active"
                  : "chip"
              }
              onClick={() => toggleMulti("paymentMethods", pm)}
            >
              {pm}
            </button>
          ))}
        </div>
      </FilterDropdown>

      {/* Date Range */}
      <FilterDropdown
        label="Date"
        isOpen={isOpen("date")}
        onToggle={() => toggleMenu("date")}
      >
        <div className="dropdown-row">
          <div className="dropdown-field">
            <span>From</span>
            <input
              type="date"
              value={filters.dateFrom}
              onChange={(e) => handleField("dateFrom", e.target.value)}
            />
          </div>
          <div className="dropdown-field">
            <span>To</span>
            <input
              type="date"
              value={filters.dateTo}
              onChange={(e) => handleField("dateTo", e.target.value)}
            />
          </div>
        </div>
      </FilterDropdown>
    </div>
  );
}

function FilterDropdown({ label, isOpen, onToggle, children }) {
  return (
    <div className="filter-dropdown">
      <button
        type="button"
        className={`filter-trigger ${isOpen ? "filter-trigger-active" : ""}`}
        onClick={onToggle}
      >
        {label}
        <span className="filter-trigger-caret">▾</span>
      </button>

      {isOpen && <div className="filter-menu">{children}</div>}
    </div>
  );
}
