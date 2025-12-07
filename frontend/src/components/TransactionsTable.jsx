import { formatCurrency, formatDate } from "../utils/formatters.js";

export default function TransactionsTable({ rows }) {
  return (
    <div className="table-wrapper">
      <table className="transactions-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Customer</th>
            <th>Region</th>
            <th>Product</th>
            <th>Category</th>
            <th>Qty</th>
            <th>Final Amount</th>
            <th>Payment</th>
            <th>Status</th>
            <th>Store</th>
          </tr>
        </thead>

        <tbody>
          {rows.map((row) => (
            <tr key={row.transactionId}>
              <td>{formatDate(row.date)}</td>

              <td>
                <div className="cell-main">{row.customerName}</div>
                <div className="cell-sub">{row.phoneNumber}</div>
              </td>

              <td>{row.customerRegion}</td>

              <td>
                <div className="cell-main">{row.productName}</div>
                <div className="cell-sub">{row.brand}</div>
              </td>

              <td>{row.productCategory}</td>

              <td>{row.quantity}</td>

              <td>{formatCurrency(row.finalAmount)}</td>

              <td>{row.paymentMethod}</td>

              <td>{row.orderStatus}</td>

              <td>
                <div className="cell-main">{row.storeLocation}</div>
                <div className="cell-sub">{row.storeId}</div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
