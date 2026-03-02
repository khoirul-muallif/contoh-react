import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { FaUserMd, FaHospital, FaClock, FaCalendarAlt } from 'react-icons/fa'
import { getDokterById } from '../services/api'

const hariUrutan = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu']

const DokterDetail = () => {
  const { id } = useParams()
  const [dokter, setDokter] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getDokterById(id)
      .then(res => {
        setDokter(res.data)
        setLoading(false)
      })
      .catch(() => {
        setDokter(null)
        setLoading(false)
      })
  }, [id])


  if (loading) return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="animate-spin rounded-full h-10 w-10 border-4 border-blue-600 border-t-transparent"></div>
    </div>
  )

  if (!dokter) return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      <p className="text-5xl">😕</p>
      <p className="text-gray-400 text-xl">Dokter tidak ditemukan</p>
      <Link to="/dokter" className="text-blue-600 hover:underline">
        ← Kembali ke Daftar Dokter
      </Link>
    </div>
  )

  // Urutkan jadwal berdasarkan urutan hari
  const jadwalUrut = [...dokter.jadwal].sort(
    (a, b) => hariUrutan.indexOf(a.hari) - hariUrutan.indexOf(b.hari)
  )

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">

      {/* Breadcrumb */}
      <div className="text-sm text-gray-400 mb-6 flex items-center gap-1">
        <Link to="/" className="hover:text-blue-600">Beranda</Link>
        <span>›</span>
        <Link to="/dokter" className="hover:text-blue-600">Dokter & Jadwal</Link>
        <span>›</span>
        <span className="text-gray-600">{dokter.nm_dokter}</span>
      </div>

      {/* Card Profil Dokter */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 mb-8">
        <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">

          {/* Foto */}
          <img
            src={dokter.image}
            alt={dokter.nm_dokter}
            className="w-36 h-36 rounded-full object-cover border-4 border-blue-100 shrink-0"
          />

          {/* Info */}
          <div className="flex-1 text-center md:text-left">
            <span className="text-xs text-blue-600 font-semibold bg-blue-50 px-3 py-1 rounded-full">
              {dokter.spesialis.nm_sps}
            </span>

            <h1 className="text-2xl font-bold text-gray-800 mt-3 mb-2">
              {dokter.nm_dokter}
            </h1>

            <div className="flex flex-col md:flex-row gap-3 text-sm text-gray-500 mt-3">
              <div className="flex items-center gap-2">
                <FaHospital className="text-blue-400" />
                <span>{dokter.poliklinik.nm_poli}</span>
              </div>
              <div className="flex items-center gap-2">
                <FaUserMd className="text-blue-400" />
                <span>{dokter.jk === 'L' ? 'Dokter Pria' : 'Dokter Wanita'}</span>
              </div>
            </div>

            {/* Tombol Daftar */}
            <Link
              to={`/pendaftaran?dokter=${dokter.id}`}
              className="inline-block mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition"
            >
              📋 Daftar Sekarang
            </Link>
          </div>
        </div>
      </div>

      {/* Jadwal Praktek */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <FaCalendarAlt className="text-blue-600" />
          Jadwal Praktek
        </h2>

        <div className="flex flex-col gap-3">
          {jadwalUrut.map((j) => (
            <div
              key={j.id}
              className="flex items-center justify-between p-4 bg-blue-50 rounded-xl"
            >
              <div className="flex items-center gap-3">
                <span className="w-24 font-semibold text-blue-700">{j.hari}</span>
                <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                  {j.keterangan}
                </span>
              </div>
              <div className="flex items-center gap-2 text-gray-600 text-sm">
                <FaClock className="text-blue-400" />
                <span>{j.jam_mulai} - {j.jam_selesai} WIB</span>
              </div>
            </div>
          ))}
        </div>

        <p className="text-xs text-gray-400 mt-4">
          * Jadwal dapat berubah sewaktu-waktu. Hubungi kami untuk konfirmasi.
        </p>
      </div>

      {/* Kembali */}
      <div className="mt-8">
        <Link
          to="/dokter"
          className="inline-flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold px-6 py-3 rounded-lg transition"
        >
          ← Kembali ke Daftar Dokter
        </Link>
      </div>

    </div>
  )
}

export default DokterDetail