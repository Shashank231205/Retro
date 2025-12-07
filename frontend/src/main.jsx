import React from "react";
import ReactDOM from "react-dom/client";
import SalesDashboardRoute from "./routes/SalesDashboardRoute.jsx";

import "./styles/global.css";
import "./styles/table.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <SalesDashboardRoute />
  </React.StrictMode>
);
