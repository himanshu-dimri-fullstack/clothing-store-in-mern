import "./App.css"
import { Routes, Route } from "react-router-dom";
import UserLayout from "./UserLayout";
import Homepage from "./pages/Homepage";
import ProductsPage from "./pages/ProductsPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import Cart from "./pages/Cart";
import AdminLayout from "./admin/AdminLayout";
import Home from "./admin/pages/Home";
import Category from "./admin/pages/Category";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import Subcategory from "./admin/pages/Subcategory";
import Product from "./admin/pages/Product";

function App() {
  return (
    <Routes>

      {/* USER ROUTES */}
      <Route element={<UserLayout />}>
        <Route path="/" element={<Homepage />} />
        <Route path="/products/:catSlug" element={<ProductsPage />} />
        <Route path="/products/:catSlug/:slug" element={<ProductDetailPage />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Route>

      {/* ADMIN ROUTES */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Home />} />
        <Route path="category" element={<Category />} />
        <Route path="subcategory" element={<Subcategory />} />
        <Route path="product" element={<Product />} />
      </Route>

    </Routes>
  );
}

export default App;