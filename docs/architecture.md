
# 📐 Architecture Document – Retail Sales Dashboard

This document explains the system architecture, backend and frontend design, data flow, and API structure.

---

# 1. System Overview

The project is a full-stack application with:

- **Backend:** Node.js + Express
- **Frontend:** React + Vite
- **Dataset:** CSV loaded into memory
- **Communication:** REST API

---

# 2. High-Level Architecture

```
CSV Dataset
      │
      ▼
Backend (Express)
 ├── controllers
 ├── services
 ├── utils
 ├── routes
      │
      ▼
REST API → /api/sales
      │
      ▼
Frontend (React)
 ├── hooks
 ├── components
 ├── services/api.js
 └── UI Dashboard
```

---

# 3. Backend Architecture

### **3.1 Components**

| Layer | Responsibility |
|-------|----------------|
| Controller | Receives HTTP request → calls service |
| Service | Business logic: search, filtering, sorting, pagination |
| Utils | Helper functions to process dataset |
| Model | (optional) Data structure |
| Routes | API routing |
| Data Loader | Reads CSV and maps fields |

---

# 4. Data Flow – Backend

```
Client Request → Controller → Service → Utils → Filtered Data → Controller → Response JSON
```

---

# 5. API Response Structure

```
{
  data: [...transactions],
  pagination: {
    page,
    limit,
    totalItems,
    totalPages,
    hasNext,
    hasPrev
  },
  meta: {
    search,
    filters,
    sort
  }
}
```

---

# 6. Frontend Architecture

### **6.1 Components**

- SearchBar.jsx
- FiltersPanel.jsx
- SortDropdown.jsx
- TransactionsTable.jsx
- PaginationControls.jsx
- EmptyState.jsx

### **6.2 Hooks**
- useSalesData.js → API loader  
- useDebounce.js → delay search  

### **6.3 Services**
- api.js → axios request handler  

### **6.4 Styles**
- global.css  
- table.css  

---

# 7. Frontend Data Flow

```
UI Input → useState → useDebounce → useSalesData Hook → API Call → UI Update
```

---

# 8. Sequence Diagram

```
User Input
    │
    ▼
React Component
    │ setState
    ▼
useDebounce
    │
    ▼
useSalesData
    │ axios.get()
    ▼
Backend /api/sales
    │
    ▼
Controller → Service → Utils
    │
    ▼
Filtered Results
    │
    ▼
Displayed in Table
```

---

# 9. Deployment Architecture

### Backend → Render  
### Frontend → Vercel  

Environment variable:  
`VITE_API_BASE_URL = <backend-url>`

---

# 10. Conclusion

This project follows scalable architecture with modular separation of logic and clean UI/UX.
