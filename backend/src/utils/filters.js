/**
 * Apply multi-select + range filters.
 */
export const applyFilters = (data, filters) => {
  if (!filters) return data;

  const {
    regions = [],
    genders = [],
    categories = [],
    tags = [],
    paymentMethods = [],
    ageMin,
    ageMax,
    dateFrom,
    dateTo
  } = filters;

  let result = data;

  // Multi-select helper
  const inList = (list, value) =>
    !list || list.length === 0 || list.includes(String(value));

  // Region filter
  if (regions.length > 0) {
    result = result.filter((item) => inList(regions, item.customerRegion));
  }

  // Gender filter
  if (genders.length > 0) {
    result = result.filter((item) => inList(genders, item.gender));
  }

  // Categories filter
  if (categories.length > 0) {
    result = result.filter((item) => inList(categories, item.productCategory));
  }

  // Payment Method filter
  if (paymentMethods.length > 0) {
    result = result.filter((item) => inList(paymentMethods, item.paymentMethod));
  }

  // Tags filter (at least one tag must match)
  if (tags.length > 0) {
    result = result.filter((item) => {
      if (!Array.isArray(item.tags)) return false;
      return item.tags.some((tag) => tags.includes(tag));
    });
  }

  // Age range fix (swap invalid ranges)
  let min = ageMin;
  let max = ageMax;
  if (min !== null && max !== null && min > max) [min, max] = [max, min];

  if (min !== null) {
    result = result.filter((item) => item.age === null || item.age >= min);
  }
  if (max !== null) {
    result = result.filter((item) => item.age === null || item.age <= max);
  }

  // Date range
  let from = dateFrom ? new Date(dateFrom) : null;
  let to = dateTo ? new Date(dateTo) : null;

  if (from && to && from > to) [from, to] = [to, from];

  if (from) {
    result = result.filter((item) => {
      if (!item.date) return true;
      return item.date >= from;
    });
  }

  if (to) {
    result = result.filter((item) => {
      if (!item.date) return true;
      return item.date <= to;
    });
  }

  return result;
};
