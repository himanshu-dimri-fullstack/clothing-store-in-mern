# 🛍️ Clothing Store – MERN Stack E-Commerce App

A full-stack **Clothing Store Web Application** built using the **MERN Stack (MongoDB, Express, React, Node.js)**. This project focuses on building an e-commerce platform with secure authentication, user-specific cart functionality, and an admin dashboard for managing products, categories and subcategories.

🚧 **Note:** This project is currently under **active development**, especially the **Order Management section**, which is being enhanced with additional features and improvements.

---

## 🚀 Features

### 🔐 Authentication & Authorization

* Implemented a complete **user authentication system**
* Uses **JWT (JSON Web Tokens)** for secure authentication
* Token stored via **HTTP-only cookies** for better security
* Protected routes for authenticated users only

### 🛒 Add to Cart (User-Specific)

* Cart functionality is **accessible only to logged-in users**
* Each user has a **separate cart**
* Secure handling of cart operations with backend validation

### 🛍️ Product & Category Management

* Browse products with **category-based filtering**
* Dynamic product listing from backend APIs

### 🧑‍💼 Admin Panel

* Dedicated **Admin Dashboard**
* Perform full **CRUD operations**:

  * ➕ Add Products, Categories & Subcategories
  * ✏️ Update, Categories & Subcategories
  * ❌ Delete, Categories & Subcategories
* Manage application data efficiently

### 📦 Order Section (Ongoing Development)

* Order management system is currently being developed

---

## 🛠️ Tech Stack

### Frontend:

* React.js
* Tailwind CSS

### Backend:

* Node.js
* Express.js

### Database:

* MongoDB (with Mongoose)

### Authentication:

* JWT (JSON Web Tokens)
* Cookies (HTTP-only)

---

## 🌐 API Features

* RESTful API architecture
* Secure routes using middleware
* Separate routes for:

  * Users
  * Products
  * Categories
  * Subcategories
  * Cart
  * Orders (in progress)

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/himanshu-dimri-fullstack/clothing-store-in-mern
cd clothing-store-in-mern
```

### 2️⃣ Setup Backend

```bash
cd server
npm install
npm run dev
```

### 3️⃣ Setup Frontend

```bash
cd client
npm install
npm run dev
```

---

## 🔐 Environment Variables

Create a `.env` file in the backend folder and add:

```env
PORT=3001
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
```

---

## 📌 Future Improvements

* Complete Order Management System
* Payment Gateway Integration (Stripe/Razorpay)
* User Profile Section
* Wishlist Feature
* Performance Optimization & Caching

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

---

## 📄 License

This project is open-source and available under the **MIT License**.

---

## 💡 Summary

This project demonstrates a **real-world e-commerce workflow** with secure authentication. With ongoing improvements, it aims to become a complete production-ready platform.

---

🔥 *Built with focus on clean architecture, security, and scalability.*
