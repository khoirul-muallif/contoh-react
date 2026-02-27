import { useState, useEffect } from 'react'
import Card from '../components/Card'
import dataBlog from '../data/blog.json'

const formatTanggal = (tanggal) => {
  return new Date(tanggal).toLocaleDateString('id-ID', {
    day: 'numeric', month: 'long', year: 'numeric',
  })
}

const Blog = () => {
  const [blog, setBlog] = useState([])
  const [loading, setLoading] = useState(true)
  const [kategoriAktif, setKategoriAktif] = useState('Semua')

  useEffect(() => {
    // Nanti diganti: axios.get('/api/blog')
    setTimeout(() => {
      setBlog(dataBlog)
      setLoading(false)
    }, 500)
  }, [])

  const kategoriList = ['Semua', ...new Set(blog.map((item) => item.category))]

  const blogFiltered = kategoriAktif === 'Semua'
    ? blog
    : blog.filter((item) => item.category === kategoriAktif)

  const badgeColorMap = {
    'Kesehatan': 'blue',
    'Tips Sehat': 'green',
    'Informasi': 'purple',
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">

      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">📰 Blog Kesehatan</h1>
        <p className="text-gray-500">Artikel dan informasi kesehatan terkini</p>
        <div className="w-16 h-1 bg-blue-600 mt-3 rounded"></div>
      </div>

      {/* Loading */}
      {loading && (
        <div className="flex justify-center py-20">
          <div className="animate-spin rounded-full h-10 w-10 border-4 border-blue-600 border-t-transparent"></div>
        </div>
      )}

      {!loading && (
        <>
          {/* Filter Kategori */}
          <div className="flex flex-wrap gap-2 mb-8">
            {kategoriList.map((kat) => (
              <button
                key={kat}
                onClick={() => setKategoriAktif(kat)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition ${
                  kategoriAktif === kat
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-blue-50 hover:text-blue-600'
                }`}
              >
                {kat}
              </button>
            ))}
          </div>

          {/* Grid Blog */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogFiltered.map((item) => (
              <div key={item.id} className="flex flex-col">
                {/* Gambar */}
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-48 object-cover rounded-t-xl"
                />
                <Card
                  to={`/blog/${item.slug}`}
                  badge={item.category}
                  badgeColor={badgeColorMap[item.category] || 'blue'}
                  title={item.title}
                  date={formatTanggal(item.published_at)}
                  description={item.excerpt}
                />
              </div>
            ))}
          </div>

          {/* Empty State */}
          {blogFiltered.length === 0 && (
            <div className="text-center py-16 text-gray-400">
              <p className="text-4xl mb-3">📭</p>
              <p>Tidak ada artikel untuk kategori ini</p>
            </div>
          )}
        </>
      )}

    </div>
  )
}

export default Blog