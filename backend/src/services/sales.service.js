import fs from "fs";
import path from "path";
import csv from "csv-parser";
import { fileURLToPath } from "url";

import { normalizeSaleRow } from "../models/sales.model.js";
import { applySearch } from "../utils/search.js";
import { applyFilters } from "../utils/filters.js";
import { applySort } from "../utils/sort.js";
import { paginate } from "../utils/pagination.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let salesData = [];

/**
 * Load CSV into memory
 */
const loadSalesDataFromCsv = () => {
  return new Promise((resolve, reject) => {
    const results = [];
    const csvPath = path.resolve(__dirname, "../data/sales_dataset.csv");

    fs.createReadStream(csvPath)
      .pipe(csv())
      .on("data", (row) => results.push(normalizeSaleRow(row)))
      .on("end", () => resolve(results))
      .on("error", (err) => reject(err));
  });
};

export const initializeData = async () => {
  salesData = await loadSalesDataFromCsv();
};

/**
 * Convert query params into structured options
 */
const buildOptionsFromQuery = (query) => {
  const toArray = (val) => {
    if (!val) return [];
    if (Array.isArray(val)) return val;
    return [val];
  };

  return {
    searchText: query.search || "",
    filters: {
      regions: toArray(query.regions),
      genders: toArray(query.genders),
      categories: toArray(query.categories),
      tags: toArray(query.tags),
      paymentMethods: toArray(query.paymentMethods),
      ageMin: query.ageMin ? Number(query.ageMin) : null,
      ageMax: query.ageMax ? Number(query.ageMax) : null,
      dateFrom: query.dateFrom || null,
      dateTo: query.dateTo || null
    },
    sort: {
      by: query.sortBy || "date",
      order: query.sortOrder === "asc" ? "asc" : "desc"
    },
    pagination: {
      page: query.page ? Number(query.page) : 1,
      limit: query.limit ? Number(query.limit) : 10
    }
  };
};

/**
 * Apply search, filters, sort, pagination pipeline
 */
export const fetchSales = (query) => {
  const { searchText, filters, sort, pagination } = buildOptionsFromQuery(query);

  let result = [...salesData];

  // Pipeline
  result = applySearch(result, searchText);
  result = applyFilters(result, filters);
  result = applySort(result, sort.by, sort.order);

  return paginate(result, pagination.page, pagination.limit, {
    search: searchText,
    filters,
    sort
  });
};
