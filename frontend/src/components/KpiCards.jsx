// frontend/src/components/KpiCards.jsx
import { formatCurrency } from "../utils/formatters.js";

export default function KpiCards({ unitsSold, totalAmount, totalDiscount }) {
  return (
    <div className="kpi-row">
      <div className="kpi-card">
        <p className="kpi-label">Total Units (this page)</p>
        <p className="kpi-value">{unitsSold}</p>
      </div>

      <div className="kpi-card">
        <p className="kpi-label">Total Amount (this page)</p>
        <p className="kpi-value">{formatCurrency(totalAmount)}</p>
      </div>

      <div className="kpi-card">
        <p className="kpi-label">Total Discount (this page)</p>
        <p className="kpi-value">{formatCurrency(totalDiscount)}</p>
      </div>
    </div>
  );
}
