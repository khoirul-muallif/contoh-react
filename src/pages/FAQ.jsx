import { useState, useEffect } from 'react'
import Accordion from '../components/Accordion'
import dataFaq from '../data/faq.json'

const FAQ = () => {
  const [faq, setFaq] = useState([])
  const [loading, setLoading] = useState(true)
  const [kategoriAktif, setKategoriAktif] = useState('Semua')

  useEffect(() => {
    // Nanti diganti: axios.get('/api/faq')
    setTimeout(() => {
      setFaq(dataFaq)
      setLoading(false)
    }, 500)
  }, [])

  // Ambil semua kategori unik dari data
  const kategoriList = ['Semua', ...new Set(faq.map((item) => item.kategori))]

  // Filter berdasarkan kategori yang dipilih
  const faqFiltered = kategoriAktif === 'Semua'
    ? faq
    : faq.filter((item) => item.kategori === kategoriAktif)

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">

      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">❓ FAQ</h1>
        <p className="text-gray-500">Pertanyaan yang sering ditanyakan</p>
        <div className="w-16 h-1 bg-blue-600 mt-3 rounded mx-auto"></div>
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
          <div className="flex flex-wrap gap-2 mb-8 justify-center">
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

          {/* List Accordion */}
          <div className="flex flex-col gap-3">
            {faqFiltered.map((item) => (
              <Accordion
                key={item.id}
                pertanyaan={item.pertanyaan}
                jawaban={item.jawaban}
              />
            ))}
          </div>

          {/* Empty State */}
          {faqFiltered.length === 0 && (
            <div className="text-center py-16 text-gray-400">
              <p className="text-4xl mb-3">🤔</p>
              <p>Tidak ada FAQ untuk kategori ini</p>
            </div>
          )}
        </>
      )}

    </div>
  )
}

export default FAQ
