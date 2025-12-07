import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "../App.jsx";

export default function SalesDashboardRoute() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
      </Routes>
    </BrowserRouter>
  );
}
