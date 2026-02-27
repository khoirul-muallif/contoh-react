import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import usePendaftaran from '../../context/usePendaftaran'
import dataDokter from '../../data/dokter.json'
import Button from '../../components/Button'

const hariMap = {
  Monday: 'Senin', Tuesday: 'Selasa', Wednesday: 'Rabu',
  Thursday: 'Kamis', Friday: 'Jumat', Saturday: 'Sabtu', Sunday: 'Minggu',
}

const FormPendaftaran = () => {
  const navigate = useNavigate()
  const { dataPasien, setDataPendaftaran } = usePendaftaran()

  const [poliklinikId, setPoliklinikId] = useState('')
  const [dokterId, setDokterId] = useState('')
  const [tanggalPeriksa, setTanggalPeriksa] = useState('')
  const [keluhan, setKeluhan] = useState('')

  // Ambil list poli unik dari data dokter
  const poliList = [...new Map(
    dataDokter.map(d => [d.poliklinik.id, d.poliklinik])
  ).values()]

  // Filter dokter berdasarkan poli yang dipilih
  const dokterByPoli = dataDokter.filter(
    d => d.poliklinik.id === parseInt(poliklinikId)
  )

  // Dokter yang dipilih
  const dokterDipilih = dataDokter.find(d => d.id === parseInt(dokterId))

  // Tanggal yang tersedia berdasarkan jadwal dokter
  const tanggalTersedia = () => {
    if (!dokterDipilih) return []

    const hariJadwal = dokterDipilih.jadwal.map(j => j.hari)
    const hasil = []
    const today = new Date()

    // Generate 30 hari ke depan yang cocok dengan hari jadwal
    for (let i = 0; i <= 30; i++) {
      const tgl = new Date(today)
      tgl.setDate(today.getDate() + i)
      const namaHari = hariMap[tgl.toLocaleDateString('en-US', { weekday: 'long' })]

      if (hariJadwal.includes(namaHari)) {
        hasil.push(tgl.toISOString().split('T')[0]) // format YYYY-MM-DD
      }
    }
    return hasil
  }

  // Reset dokter & tanggal saat poli berubah
  const handlePoliChange = (e) => {
    setPoliklinikId(e.target.value)
    setDokterId('')         // reset dokter saat poli berubah
    setTanggalPeriksa('')   // reset tanggal saat poli berubah
    }

    const handleDokterChange = (e) => {
    setDokterId(e.target.value)
    setTanggalPeriksa('')   // reset tanggal saat dokter berubah
    }

  // Guard — kalau belum ada data pasien, redirect balik
  useEffect(() => {
    if (!dataPasien) navigate('/pendaftaran')
    }, [dataPasien, navigate])

  const handleSubmit = (e) => {
    e.preventDefault()

    const poli = poliList.find(p => p.id === parseInt(poliklinikId))

    setDataPendaftaran({
      poliklinik: poli,
      dokter: dokterDipilih || null,
      tanggal_periksa: tanggalPeriksa,
      keluhan,
    })

    navigate('/pendaftaran/konfirmasi')
  }

  if (!dataPasien) return null

  return (
    <div className="max-w-2xl mx-auto px-6 py-12">

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">🏥 Form Pendaftaran</h1>
        <p className="text-gray-500">Pilih poliklinik, dokter, dan jadwal periksa</p>
        <div className="w-16 h-1 bg-blue-600 mt-3 rounded"></div>
      </div>

      {/* Info Pasien */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
        <p className="text-sm text-blue-700 font-semibold mb-1">👤 Data Pasien</p>
        <p className="text-gray-800 font-bold">{dataPasien.nama}</p>
        <p className="text-gray-500 text-sm">NIK: {dataPasien.nik}</p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">

        {/* Pilih Poliklinik */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">Poliklinik *</label>
          <select
            value={poliklinikId}
            onChange={handlePoliChange}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            required
          >
            <option value="">-- Pilih Poliklinik --</option>
            {poliList.map(poli => (
              <option key={poli.id} value={poli.id}>{poli.nm_poli}</option>
            ))}
          </select>
        </div>

        {/* Pilih Dokter */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">Dokter (Opsional)</label>
          <select
            value={dokterId}
            onChange={handleDokterChange}
            disabled={!poliklinikId}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition disabled:bg-gray-100 disabled:cursor-not-allowed"
          >
            <option value="">-- Pilih Dokter --</option>
            {dokterByPoli.map(d => (
              <option key={d.id} value={d.id}>
                {d.nm_dokter} — {d.spesialis.nm_sps}
              </option>
            ))}
          </select>
          {!poliklinikId && (
            <p className="text-xs text-gray-400">Pilih poliklinik terlebih dahulu</p>
          )}
        </div>

        {/* Jadwal dokter yang dipilih */}
        {dokterDipilih && (
          <div className="bg-green-50 border border-green-200 rounded-xl p-4">
            <p className="text-sm font-semibold text-green-700 mb-2">
              📅 Jadwal {dokterDipilih.nm_dokter}:
            </p>
            <div className="flex flex-wrap gap-2">
              {dokterDipilih.jadwal.map(j => (
                <span key={j.id} className="text-xs bg-white border border-green-300 text-green-700 px-3 py-1 rounded-full">
                  {j.hari} ({j.jam_mulai} - {j.jam_selesai})
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Pilih Tanggal */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">Tanggal Periksa *</label>
          {dokterDipilih ? (
            // Kalau ada dokter → tampilkan hanya tanggal yang ada jadwalnya
            <select
              value={tanggalPeriksa}
              onChange={(e) => setTanggalPeriksa(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              required
            >
              <option value="">-- Pilih Tanggal --</option>
              {tanggalTersedia().map(tgl => {
                const d = new Date(tgl)
                const namaHari = hariMap[d.toLocaleDateString('en-US', { weekday: 'long' })]
                return (
                  <option key={tgl} value={tgl}>
                    {namaHari}, {d.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </option>
                )
              })}
            </select>
          ) : (
            // Kalau tidak ada dokter → input tanggal bebas
            <input
              type="date"
              value={tanggalPeriksa}
              min={new Date().toISOString().split('T')[0]}
              onChange={(e) => setTanggalPeriksa(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              required
            />
          )}
        </div>

        {/* Keluhan */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">Keluhan (Opsional)</label>
          <textarea
            value={keluhan}
            onChange={(e) => setKeluhan(e.target.value)}
            rows={3}
            placeholder="Ceritakan keluhan Anda..."
            maxLength={500}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition resize-none"
          />
          <p className="text-xs text-gray-400 text-right">{keluhan.length}/500</p>
        </div>

        <Button type="submit">
          Lanjut ke Konfirmasi →
        </Button>

      </form>
    </div>
  )
}

export default FormPendaftaran