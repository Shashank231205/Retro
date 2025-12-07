/**
 * Normalizes each CSV row into a clean, typed JS object.
 * Matches EXACTLY the column names provided by the dataset.
 */
export const normalizeSaleRow = (row) => {
  const toNumber = (value) =>
    value === "" || value === undefined || value === null ? null : Number(value);

  const toDate = (value) => (value ? new Date(value) : null);

  const normalizeTags = (value) =>
    value
      ? String(value)
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean)
      : [];

  return {
    // Identifiers
    transactionId: row["Transaction ID"] || null,

    // Customer
    date: toDate(row["Date"]),
    customerId: row["Customer ID"] || null,
    customerName: row["Customer Name"] || "",
    phoneNumber: row["Phone Number"] || "",
    gender: row["Gender"] || "",
    age: toNumber(row["Age"]),
    customerRegion: row["Customer Region"] || "",
    customerType: row["Customer Type"] || "",

    // Product
    productId: row["Product ID"] || null,
    productName: row["Product Name"] || "",
    brand: row["Brand"] || "",
    productCategory: row["Product Category"] || "",
    tags: normalizeTags(row["Tags"]),

    // Sales Info
    quantity: toNumber(row["Quantity"]),
    pricePerUnit: toNumber(row["Price per Unit"]),
    discountPercentage: toNumber(row["Discount Percentage"]),
    totalAmount: toNumber(row["Total Amount"]),
    finalAmount: toNumber(row["Final Amount"]),

    // Payment / Order
    paymentMethod: row["Payment Method"] || "",
    orderStatus: row["Order Status"] || "",
    deliveryType: row["Delivery Type"] || "",

    // Store info
    storeId: row["Store ID"] || "",
    storeLocation: row["Store Location"] || "",

    // Salesperson
    salespersonId: row["Salesperson ID"] || "",
    employeeName: row["Employee Name"] || ""
  };
};
