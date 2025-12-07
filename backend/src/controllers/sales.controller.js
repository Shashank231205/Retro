import { fetchSales } from "../services/sales.service.js";

/**
 * Controller for GET /api/sales
 * Handles incoming query params and returns filtered, sorted, paginated results.
 */
export const getSales = (req, res, next) => {
  try {
    const result = fetchSales(req.query);
    return res.json(result);
  } catch (error) {
    console.error("Error in getSales controller:", error);
    next(error);
  }
};
