import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FaSearch } from 'react-icons/fa'
import { getDokter } from '../services/api'

const Dokter = () => {
  const [dokter, setDokter] = useState([])
  const [loading, setLoading] = useState(true)
  const [poliAktif, setPoliAktif] = useState('Semua')
  const [keyword, setKeyword] = useState('')

  useEffect(() => {
    getDokter()
      .then(res => {
        setDokter(res.data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  const poliList = ['Semua', ...new Set(dokter.map(d => d.poliklinik.nm_poli))]
  const dokterFiltered = dokter
    .filter(d => poliAktif === 'Semua' || d.poliklinik.nm_poli === poliAktif)
    .filter(d => d.nm_dokter.toLowerCase().includes(keyword.toLowerCase()))

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">🩺 Dokter & Jadwal</h1>
        <p className="text-gray-500">Temukan dokter dan jadwal prakteknya</p>
        <div className="w-16 h-1 bg-blue-600 mt-3 rounded"></div>
      </div>

      {loading && (
        <div className="flex justify-center py-20">
          <div className="animate-spin rounded-full h-10 w-10 border-4 border-blue-600 border-t-transparent"></div>
        </div>
      )}

      {!loading && (
        <>
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={keyword}
                onChange={e => setKeyword(e.target.value)}
                placeholder="Cari nama dokter..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {poliList.map(poli => (
                <button
                  key={poli}
                  onClick={() => setPoliAktif(poli)}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition ${
                    poliAktif === poli
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-blue-50 hover:text-blue-600'
                  }`}
                >
                  {poli}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {dokterFiltered.map(d => (
              <Link
                key={d.id}
                to={`/dokter/${d.id}`}
                className="bg-white rounded-xl border border-gray-100 hover:border-blue-200 hover:shadow-md transition group p-5 flex flex-col items-center text-center"
              >
                <img src={d.image} alt={d.nm_dokter} className="w-24 h-24 rounded-full object-cover border-4 border-blue-100 mb-4" />
                <h3 className="font-bold text-gray-800 group-hover:text-blue-600 transition mb-1">{d.nm_dokter}</h3>
                <span className="text-xs text-blue-600 font-medium bg-blue-50 px-3 py-1 rounded-full mb-3">{d.spesialis.nm_sps}</span>
                <p className="text-sm text-gray-500 mb-4">🏥 {d.poliklinik.nm_poli}</p>
                <div className="w-full border-t border-gray-100 pt-3">
                  <p className="text-xs text-gray-400 mb-2 font-medium">Jadwal Praktek:</p>
                  <div className="flex flex-wrap gap-1 justify-center">
                    {d.jadwal.map(j => (
                      <span key={j.id} className="text-xs bg-green-50 text-green-700 px-2 py-1 rounded-full">{j.hari}</span>
                    ))}
                  </div>
                </div>
                <p className="text-blue-500 text-sm font-medium mt-4 group-hover:underline">Lihat jadwal lengkap →</p>
              </Link>
            ))}
          </div>

          {dokterFiltered.length === 0 && (
            <div className="text-center py-16 text-gray-400">
              <p className="text-4xl mb-3">🔍</p>
              <p>Dokter tidak ditemukan</p>
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default Dokter