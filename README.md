<h1 align="center">Premium MERN E-Commerce Store 🛒</h1>

A modern, highly responsive, and feature-rich full-stack E-Commerce web application built using MongoDB, Express, React (Vite), Node.js (MERN), Tailwind CSS, Framer Motion, and Zustand.

---

## ✨ Features Implemented

### 🎨 Frontend:
1. **User Authentication UI**: Fully responsive Signup & Login forms with robust validation, clean animations, and user roles management.
2. **Product Listing Page**: Clean display of products categorised by type with interactive cards.
3. **Search & Filters**: Modern, real-time search bar in the navbar routing to a dedicated Search Results Page with category sidebar and price range filters.
4. **Product Details Page**: Beautiful glassmorphic page showing product name, description, categories, price, add to cart, and wishlist toggle buttons alongside personalized product recommendations.
5. **Shopping Cart Management**: Add items to cart, adjust quantities dynamically, and view price calculations.
6. **Wishlist Functionality**: A beautiful wishlist page where users can manage their favorite products, with instant add to cart or quick removal.
7. **Responsive & Premium Design**: Mobile-friendly grids, smooth hover effects, loading states, and elegant HSL-tailored dark modes.

### 🛡️ Backend:
1. **User Authentication APIs**: Standard signup, login, logout, and token refresh endpoints.
2. **Product CRUD APIs**: Complete endpoints for listing, creating, toggling featured status, and deleting products.
3. **Cart Management APIs**: Backend sync of the user's shopping cart.
4. **Wishlist Management APIs**: Toggle and fetch favorites securely stored in MongoDB under user schema.
5. **JWT Authentication**: Secure stateless access tokens (15-min expiry) paired with robust refresh tokens (7-day expiry) stored securely in HttpOnly cookies.
6. **Graceful Redis & Cloud Fallbacks**: Implemented transparent in-memory cache fallbacks when Upstash Redis is not configured, ensuring plug-and-play local setup!

---

## 🛠️ Tech Stack
- **Core**: Node.js, Express, MongoDB (Mongoose)
- **UI & Routing**: React, Tailwind CSS, Framer Motion, Lucide Icons, React Router DOM
- **State Management**: Zustand
- **Payment & Caching**: Stripe API, Upstash Redis

---

## 🚀 Setup & Installation Instructions

### 1. Prerequisite
Ensure you have **Node.js** (v18+) and **MongoDB** installed on your system.

### 2. Configure Environment Variables (`.env`)
A `.env` file has been prepared in the root folder with preconfigured defaults for local testing:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/ecommerce
UPSTASH_REDIS_URL=placeholder
ACCESS_TOKEN_SECRET=super_secret_jwt_access_token_key_for_local_dev_12345
REFRESH_TOKEN_SECRET=super_secret_jwt_refresh_token_key_for_local_dev_12345
NODE_ENV=development
```

*(You can customize `MONGO_URI` to point to MongoDB Atlas or local MongoDB)*

### 3. Install Dependencies & Build
Install all root, backend, and frontend packages and compile the production client bundle:

```bash
# Install root/backend packages
npm install

# Install frontend packages
npm install --prefix frontend

# Build frontend production bundle
npm run build --prefix frontend
```

### 4. Seed Data (Optional)
Ensure you have running MongoDB database, then start the server to initiate local testing.

### 5. Start the Application
To run the server in development mode (with Hot Reloading):
```bash
npm run dev
```

The server runs on `http://localhost:5000`. To access the React frontend, navigate to it in your browser!

---

Developed by [Rahul](https://github.com/rahulkannan08).
