import express from "express";
import cors from "cors";
import salesRoutes from "./routes/sales.routes.js";
import { initializeData } from "./services/sales.service.js";

const app = express();
const PORT = process.env.PORT || 5000;

// ----------------------------
// Middlewares
// ----------------------------
app.use(cors());
app.use(express.json());

// ----------------------------
// Routes
// ----------------------------
app.use("/api/sales", salesRoutes);

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error("🔥 Unhandled Error:", err);
  res.status(500).json({ error: "Internal server error" });
});

// ----------------------------
// Server Startup + CSV Load
// ----------------------------
(async () => {
  try {
    console.log("🚀 Starting backend...");
    console.log("📁 Initializing CSV loading...");

    await initializeData();   // <--- YOU KEEP THIS (now it downloads from Drive)

    console.log("✅ CSV dataset loaded successfully!");

    app.listen(PORT, () => {
      console.log(`🌐 Server running at http://localhost:${PORT}`);
    });

  } catch (err) {
    console.error("❌ FATAL STARTUP ERROR:");
    console.error(err);
    process.exit(1);   // Prevent undefined state
  }
})();
