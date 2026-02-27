import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import dataPengumuman from '../data/pengumuman.json'

const PengumumanDetail = () => {
  const { id } = useParams() // ambil slug dari URL
  const [item, setItem] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Nanti diganti: axios.get(`/api/pengumuman/${id}`)
    setTimeout(() => {
      const found = dataPengumuman.find((p) => p.slug === id)
      setItem(found)
      setLoading(false)
    }, 500)
  }, [id]) // ← [id] artinya useEffect jalan ulang kalau id berubah

  const formatTanggal = (tanggal) => {
    return new Date(tanggal).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })
  }

  if (loading) return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="animate-spin rounded-full h-10 w-10 border-4 border-blue-600 border-t-transparent"></div>
    </div>
  )

  if (!item) return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      <p className="text-gray-400 text-xl">Pengumuman tidak ditemukan</p>
      <Link to="/pengumuman" className="text-blue-600 hover:underline">
        ← Kembali ke Pengumuman
      </Link>
    </div>
  )

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">

      {/* Breadcrumb */}
      <div className="text-sm text-gray-400 mb-6">
        <Link to="/" className="hover:text-blue-600">Beranda</Link>
        <span className="mx-2">›</span>
        <Link to="/pengumuman" className="hover:text-blue-600">Pengumuman</Link>
        <span className="mx-2">›</span>
        <span className="text-gray-600">{item.judul}</span>
      </div>

      {/* Badge + Penting */}
      <div className="flex items-center gap-3 mb-4">
        <span className="bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full">
          {item.kategori}
        </span>
        {item.penting && (
          <span className="bg-red-100 text-red-600 text-xs font-semibold px-3 py-1 rounded-full">
            🔴 Penting
          </span>
        )}
      </div>

      {/* Judul */}
      <h1 className="text-3xl font-bold text-gray-800 mb-3">{item.judul}</h1>

      {/* Tanggal */}
      <p className="text-sm text-gray-400 mb-8">
        📅 {formatTanggal(item.tanggal)}
      </p>

      {/* Divider */}
      <div className="w-full h-px bg-gray-200 mb-8"></div>

      {/* Isi */}
      <div className="text-gray-700 leading-relaxed text-base">
        {item.isi}
      </div>

      {/* Tombol Kembali */}
      <div className="mt-12">
        <Link
          to="/pengumuman"
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition"
        >
          ← Kembali ke Pengumuman
        </Link>
      </div>

    </div>
  )
}

export default PengumumanDetail
