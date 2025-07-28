# Order Management System (OMS)

A full-stack Order Management System (OMS) built using the MERN stack: **MongoDB, Express, React, Node.js**, and deployed publicly with CI/CD pipelines. This system supports internal order creation, inventory locking, payment flagging, status tracking, and customer self-service.

---

## 🚀 Tech Stack

| Layer      | Technology              |
|-----------:|--------------------------|
| Frontend   | React (Vite) + Shadcn UI |
| Backend    | Express.js (Node.js)     |
| Database   | MongoDB (Mongoose)       |
| Auth       | JWT-based Auth           |
| State Mgmt | Context API              |
| Realtime   | Socket.IO                |
| Versioning | GitHub                   |
| Deployment | Natlify (Frontend), Render (Backend) |
| CI/CD      | GitHub Actions           |

---

## 📁 Project Structure
### Backend (`/Frontend/my-react-app`):
```
Backend/
├── node_modules/
├── src/
│   ├── configs/
│   │   ├── cloudinary.js
│   │   └── db.js
│   ├── controllers/
│   │   ├── auth.controller.js
│   │   ├── order.controller.js
│   │   └── product.controller.js
│   ├── middlewares/
│   │   ├── auth.middlewares.js
│   │   └── multer.js
│   ├── models/
│   │   ├── order.model.js
│   │   ├── product.model.js
│   │   └── user.model.js
│   ├── routes/
│   │   ├── order.router.js
│   │   ├── product.router.js
│   │   └── user.route.js
│   └── uploads/
├── .env
├── app.js
├── package.json
└── package-lock.json

```

### Frontend (`/Frontend/my-react-app`)
```
my-react-app/
├── public/
│   └── favicon.svg (or other static assets)
├── src/
│   ├── assets/
│   │   └── react.svg
│   │
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── ProductCard.jsx
│   │   ├── ProductsSection.jsx
│   │   └── ProtectedRoute.jsx
│   │
│   ├── contexts/
│   │   ├── AuthContext.jsx
│   │   ├── AuthProvider.jsx
│   │   └── ContextExport.js
│   │
│   ├── pages/
│   │   ├── admin/
│   │   │   ├── AddProduct.jsx
│   │   │   └── dashboard.jsx
│   │   ├── cart.jsx
│   │   ├── LandingPage.jsx
│   │   └── signuplogin.jsx
│   │
│   ├── utils/
│   │   └── baseApi.js
│   │
│   ├── App.css
│   ├── App.jsx
│   ├── main.jsx           <-- Entry point (default from Vite)
│   └── index.css          <-- Global CSS
│
├── .gitignore
├── index.html             <-- Vite entry HTML
├── package.json
├── vite.config.js         <-- Vite config
└── README.md

```

## 🗂️ Route Summary

### 👤 Auth Routes (`/users`)

| Method | Endpoint     | Access | Description                    |
|--------|--------------|--------|--------------------------------|
| POST   | `/register`  | Public | Register a new user (customer or admin) |
| POST   | `/login`     | Public | Login and get JWT tokens       |

---

### 🛒 Product Routes (`/products`)

| Method | Endpoint         | Access | Description                               |
|--------|------------------|--------|-------------------------------------------|
| POST   | `/create`        | Admin  | Create a new product with up to 5 images  |
| GET    | `/`              | Public | Get list of all products (supports filter, sort, pagination) |
| GET    | `/:id`           | Public | Get a product by its ID                   |
| PATCH  | `/update/:id`    | Admin  | Update an existing product                |
| DELETE | `/delete/:id`    | Admin  | Delete a product                          |

---

### 📦 Order Routes (`/orders`)

| Method | Endpoint           | Access | Description                               |
|--------|--------------------|--------|-------------------------------------------|
| POST   | `/create`          | User   | Create a new order (requires payment info)|
| GET    | `/`                | Admin  | Get all orders                            |
| GET    | `/my-orders`       | User   | Get orders placed by the logged-in user   |
| PATCH  | `/update-status/:id` | Admin | Update order status                       |
| DELETE | `/delete/:id`      | Admin  | Delete an order                           |
