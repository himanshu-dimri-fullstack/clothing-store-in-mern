import { Route, Routes } from 'react-router-dom'
import './App.css'
import Navbar from './components/navbar/Navbar'
import Homepage from './pages/Homepage'
import Footer from './components/footer/Footer'
import ProductsPage from './pages/ProductsPage'
import ScrollToTop from './components/ScrollToTop'

function App() {

  return (
    <>
      <Navbar />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/products/:slug" element={<ProductsPage />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
