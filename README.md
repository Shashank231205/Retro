
# 🛒 Retail Sales Dashboard – 

This project is a complete full‑stack Retail Sales Dashboard built using a **Node.js + Express backend** and a **React + Vite frontend**.  
It allows users to explore large-scale retail transaction data through **search**, **filters**, **sorting**, and **pagination**.  
The system loads a CSV dataset at startup and provides a clean, responsive dashboard UI.

---

#  1. Overview 

The Retail Sales Dashboard enables efficient exploration of retail transactions through
search, filtering, sorting, and paginated results.  
The backend loads and processes a large CSV dataset, while the frontend provides a clean
and interactive interface for end users.  
The system is optimized for fast lookup operations and modular code organization.

---

#  2. Tech Stack

### **Backend**
- Node.js  
- Express.js  
- csv-parser  
- Nodemon  

### **Frontend**
- React  
- Vite  
- Axios  
- CSS (custom global + table)  

### **General**
- REST API architecture  
- JSON-based API responses  

---

#  3. Search Implementation Summary

Search allows users to find transactions by:
- **Customer name**
- **Phone number**
- **Product name**
- **Brand**

### How it works:
1. Frontend sends a query param `search=...`  
2. Service layer performs **case-insensitive partial match** across selected fields  
3. Results are filtered before sorting and pagination  

Search is executed using a simple string matching utility for high performance.

---

#  4. Filter Implementation Summary

The system supports multi-select and range-based filters:

### **Supported Filters**
- Customer Region  
- Gender  
- Product Category  
- Payment Method  
- Tags  
- Age Range (min/max)  
- Date Range (from/to)

### How it works:
1. Frontend sends filters as query parameters  
2. Backend `filters.js` applies each filter condition sequentially  
3. Only rows that satisfy **all active filters** are returned  

This modular filter architecture allows for easy extension.

---

#  5. Sorting Implementation Summary

Sorting supports the following fields:

| Field | Order |
|-------|--------|
| **date** | descending (default) |
| **quantity** | ascending |
| **customerName** | A → Z |

### How it works:
1. Frontend sends:  
   - `sortBy=date`  
   - `sortOrder=desc`  
2. Backend sorts results using a dedicated utility (`sort.js`)  
3. Sort is applied **after filters** but **before pagination**

---

#  6. Pagination Implementation Summary

Pagination ensures lightweight responses even with very large datasets.

### Query Parameters:
- `page` (default: 1)  
- `limit` (default: 10)

### How it works:
1. Backend computes:
   - `totalItems`
   - `totalPages`
   - `hasNext`
   - `hasPrev`
2. Results are sliced using:
   ```
   start = (page - 1) * limit
   end = start + limit
   ```
3. Response includes pagination metadata for UI rendering.

This ensures scalability even with millions of rows.

---

#  7. Setup Instructions

## **1️⃣ Clone Repository**
```
git clone <repo-url>
cd truestate-assignment
```

---

# **2️⃣ Install Backend Dependencies**
```
cd backend
npm install
```

---

# **3️⃣ Install Frontend Dependencies**
```
cd ../frontend
npm install
```

---

# **4️⃣ Run Backend + Frontend Together**
(Using root monorepo script)
```
cd ..
npm run dev
```

This will start:

- **Backend:** http://localhost:5000  
- **Frontend:** http://localhost:5173  

---

# 📡 8. API Endpoint Overview

### **GET /api/sales**

#### Query Parameters
```
search=
regions=
genders=
categories=
paymentMethods=
tags=
ageMin=
ageMax=
dateFrom=
dateTo=
sortBy=
sortOrder=
page=
limit=
```

Returns:
- `data` (paginated rows)
- `pagination` metadata
- `meta` (search, filters, sort info)

---

#  9. Conclusion

This project meets the full requirements of the assignment with a clean,
modular, scalable, and fully functional full-stack implementation.  
The architecture supports extendability and can handle large datasets
efficiently through optimized search, filtering, and pagination mechanisms.

