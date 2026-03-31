import "./App.css"
import { Routes, Route } from "react-router-dom";

// user
import UserLayout from "./UserLayout";
import Homepage from "./pages/Homepage";
import ProductsPage from "./pages/ProductsPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import Cart from "./pages/Cart";

// admin
import AdminLayout from "./admin/AdminLayout";
import Home from "./admin/pages/Home";
import Category from "./admin/pages/Category";

function App() {
  return (
    <Routes>

      {/* USER ROUTES */}
      <Route element={<UserLayout />}>
        <Route path="/" element={<Homepage />} />
        <Route path="/products/:catSlug" element={<ProductsPage />} />
        <Route path="/products/:catSlug/:slug" element={<ProductDetailPage />} />
        <Route path="/cart" element={<Cart />} />
      </Route>

      {/* ADMIN ROUTES */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Home />} />
        <Route path="category" element={<Category />} />
      </Route>

    </Routes>
  );
}

export default App;