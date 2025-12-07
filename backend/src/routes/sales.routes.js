import express from "express";
import { getSales } from "../controllers/sales.controller.js";

const router = express.Router();

// Route: GET /api/sales
router.get("/", getSales);

export default router;
