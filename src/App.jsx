import { Route, Routes } from 'react-router-dom'
import './App.css'
import Navbar from './components/navbar/Navbar'
import Homepage from './pages/Homepage'
import Footer from './components/footer/Footer'

function App() {

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
