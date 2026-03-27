import { Route, Routes } from 'react-router-dom'
import './App.css'
import Navbar from './components/navbar/Navbar'
import Homepage from './pages/Homepage'
import Footer from './components/footer/Footer'
import ProductsPage from './pages/ProductsPage'
import ScrollToTop from './components/ScrollToTop'
import ProductDetailPage from './pages/ProductDetailPage'
import Cart from './pages/Cart'

function App() {

  return (
    <>
      <Navbar />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/products/:catSlug" element={<ProductsPage />} />
        <Route path="/products/:catSlug/:slug" element={<ProductDetailPage />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
