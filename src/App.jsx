import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Dokter from './pages/Dokter'
import Pendaftaran from './pages/Pendaftaran'
import Blog from './pages/Blog'
import BlogDetail from './pages/BlogDetail'
import Pengumuman from './pages/Pengumuman'
import PengumumanDetail from './pages/PengumumanDetail'
import FAQ from './pages/FAQ'
import Login from './pages/Login'
import Register from './pages/Register'
import NotFound from './pages/NotFound'
import DokterDetail from './pages/DokterDetail'


function App() {
  return (
    <Routes>
      {/* Halaman dengan Navbar & Footer */}
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/dokter" element={<Dokter />} />
        <Route path="/pendaftaran" element={<Pendaftaran />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogDetail />} />
        <Route path="/pengumuman" element={<Pengumuman />} />
        <Route path="/pengumuman/:id" element={<PengumumanDetail />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/dokter/:id" element={<DokterDetail />} />
      </Route>

      {/* Halaman tanpa Navbar & Footer */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default App
