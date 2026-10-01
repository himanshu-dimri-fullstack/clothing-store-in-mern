import "./App.css"
import { Routes, Route } from "react-router-dom";
import UserLayout from "./UserLayout";
import Homepage from "./pages/Homepage";
import ProductsPage from "./pages/ProductsPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import Cart from "./pages/Cart";
import AdminLayout from "./admin/AdminLayout";
import Home from "./admin/pages/Home";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import Subcategory from "./admin/pages/Subcategory";
import Product from "./admin/pages/Product";
import CheckoutPage from "./pages/CheckoutPage";
import SuccessPage from "./pages/SuccessPage";
import Orders from "./admin/pages/Orders";
import OrderDetailPage from "./admin/pages/OrderDetailPage";
import { ToastContainer } from "react-toastify"
import CategoryShow from "./admin/pages/category/Show"
import CategoryAdd from "./admin/pages/category/Add"
import CategoryEdit from "./admin/pages/category/Edit"


function App() {
  return (
    <>
      <Routes>

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* USER ROUTES */}
        <Route element={<UserLayout />}>
          <Route path="/" element={<Homepage />} />
          <Route path="/products/:catSlug" element={<ProductsPage />} />
          <Route path="/products/:catSlug/:slug" element={<ProductDetailPage />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/success" element={<SuccessPage />} />
        </Route>

        {/* ADMIN ROUTES */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Home />} />
          <Route path="category" element={<CategoryShow />} />
          <Route path="category/add" element={<CategoryAdd />} />
          <Route path="category/edit/:slug" element={<CategoryEdit />} />
          <Route path="subcategory" element={<Subcategory />} />
          <Route path="product" element={<Product />} />
          <Route path="orders" element={<Orders />} />
          <Route path="orders/:id" element={<OrderDetailPage />} />
        </Route>

      </Routes>
      <ToastContainer />
    </>

  );
}

export default App;