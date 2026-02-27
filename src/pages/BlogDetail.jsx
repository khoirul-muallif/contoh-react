import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import dataBlog from '../data/blog.json'

const formatTanggal = (tanggal) => {
  return new Date(tanggal).toLocaleDateString('id-ID', {
    day: 'numeric', month: 'long', year: 'numeric',
  })
}

const BlogDetail = () => {
  const { slug } = useParams()
  const [artikel, setArtikel] = useState(null)
  const [related, setRelated] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Nanti diganti: axios.get(`/api/blog/${slug}`)
    setTimeout(() => {
      const found = dataBlog.find((b) => b.slug === slug)
      setArtikel(found || null)

      // Artikel terkait — kategori sama, bukan artikel ini
      if (found) {
        const artikelTerkait = dataBlog
          .filter((b) => b.category === found.category && b.slug !== slug)
          .slice(0, 3)
        setRelated(artikelTerkait)
      }

      setLoading(false)
    }, 500)
  }, [slug])

  if (loading) return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="animate-spin rounded-full h-10 w-10 border-4 border-blue-600 border-t-transparent"></div>
    </div>
  )

  if (!artikel) return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      <p className="text-5xl">😕</p>
      <p className="text-gray-400 text-xl">Artikel tidak ditemukan</p>
      <Link to="/blog" className="text-blue-600 hover:underline">
        ← Kembali ke Blog
      </Link>
    </div>
  )

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">

      {/* Breadcrumb */}
      <div className="text-sm text-gray-400 mb-6 flex items-center gap-1">
        <Link to="/" className="hover:text-blue-600">Beranda</Link>
        <span>›</span>
        <Link to="/blog" className="hover:text-blue-600">Blog</Link>
        <span>›</span>
        <span className="text-gray-600 line-clamp-1">{artikel.title}</span>
      </div>

      {/* Kategori */}
      <span className="bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full">
        {artikel.category}
      </span>

      {/* Judul */}
      <h1 className="text-3xl font-bold text-gray-800 mt-4 mb-3 leading-snug">
        {artikel.title}
      </h1>

      {/* Meta */}
      <div className="flex items-center gap-4 text-sm text-gray-400 mb-6">
        <span>✍️ {artikel.author}</span>
        <span>📅 {formatTanggal(artikel.published_at)}</span>
      </div>

      {/* Gambar */}
      <img
        src={artikel.image}
        alt={artikel.title}
        className="w-full h-72 object-cover rounded-2xl mb-8"
      />

      {/* Isi Artikel */}
      <div
        className="prose prose-blue max-w-none"
        dangerouslySetInnerHTML={{ __html: artikel.body }}
      />

      {/* Tombol Kembali */}
      <div className="mt-12 pt-6 border-t border-gray-200">
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition"
        >
          ← Kembali ke Blog
        </Link>
      </div>

      {/* Artikel Terkait */}
      {related.length > 0 && (
        <div className="mt-12">
          <h2 className="text-xl font-bold text-gray-800 mb-6">
            📌 Artikel Terkait
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {related.map((item) => (
              <Link
                key={item.id}
                to={`/blog/${item.slug}`}
                className="block bg-white border border-gray-100 hover:border-blue-200 rounded-xl overflow-hidden hover:shadow-md transition group"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-32 object-cover"
                />
                <div className="p-4">
                  <p className="text-sm font-semibold text-gray-700 group-hover:text-blue-600 transition line-clamp-2">
                    {item.title}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    {formatTanggal(item.published_at)}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

    </div>
  )
}

export default BlogDetail
