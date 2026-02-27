import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import usePendaftaran from '../../context/usePendaftaran'
import InputField from '../../components/InputField'
import Button from '../../components/Button'
import dataPasienTerdaftar from '../../data/pasien.json'

    

const PilihPasien = () => {
  const navigate = useNavigate()
  const { setDataPasien } = usePendaftaran()
  const [tab, setTab] = useState('baru') // 'baru' | 'lama'

  // State pasien baru
  const [formBaru, setFormBaru] = useState({
    nik: '', nama: '', alamat: '', jenis_kelamin: '',
    no_telepon: '', tanggal_lahir: '', tipe_pasien: '', no_bpjs: '',
    no_rekam_medik: '',
  })

  // State pasien lama
  const [nikCari, setNikCari] = useState('')
  const [errorCari, setErrorCari] = useState('')

  const handleChangeBaru = (e) => {
    const { name, value } = e.target
    setFormBaru(prev => ({ ...prev, [name]: value }))
  }

  // Submit pasien baru
  const handleSubmitBaru = (e) => {
    e.preventDefault()

    // Validasi NIK
    if (formBaru.nik.length !== 16 || !/^[0-9]+$/.test(formBaru.nik)) {
      alert('NIK harus 16 digit angka!')
      return
    }

    // Validasi no_bpjs kalau tipe bpjs
    if (formBaru.tipe_pasien === 'bpjs' && !formBaru.no_bpjs) {
      alert('No BPJS wajib diisi untuk pasien BPJS!')
      return
    }

    // Simulasi simpan — nanti ganti axios.post('/api/pasien', formBaru)
    const pasienBaru = { ...formBaru, id: Date.now() }
    setDataPasien(pasienBaru)
    navigate('/pendaftaran/form')
  }

  // Submit cari pasien lama
  const handleCariLama = (e) => {
    e.preventDefault()
    setErrorCari('')

    if (nikCari.length !== 16) {
      setErrorCari('NIK harus 16 digit!')
      return
    }

    // Simulasi cari — nanti ganti axios.post('/api/pasien/cari', { nik })
    const found = dataPasienTerdaftar.find(p => p.nik === nikCari)
    if (!found) {
      setErrorCari('Pasien dengan NIK tersebut tidak ditemukan. Silakan daftar sebagai pasien baru.')
      return
    }

    setDataPasien(found)
    navigate('/pendaftaran/form')
  }

  return (
    <div className="max-w-2xl mx-auto px-6 py-12">

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">📋 Pendaftaran Online</h1>
        <p className="text-gray-500">Daftarkan diri Anda untuk berobat di RS Sehat Sejahtera</p>
        <div className="w-16 h-1 bg-blue-600 mt-3 rounded"></div>
      </div>

      {/* Info */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-6 text-sm text-yellow-800">
        ⚠️ Jika belum tahu klinik atau dokter yang sesuai, pilih dokter dulu di halaman{' '}
        <a href="/dokter" className="font-semibold underline">Dokter & Jadwal</a> lalu kembali ke sini.
      </div>

      {/* Tab */}
      <div className="flex border-b border-gray-200 mb-6">
        <button
          onClick={() => setTab('baru')}
          className={`px-6 py-3 font-semibold text-sm transition border-b-2 ${
            tab === 'baru'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-gray-500 hover:text-blue-600'
          }`}
        >
          👤 Pasien Baru
        </button>
        <button
          onClick={() => setTab('lama')}
          className={`px-6 py-3 font-semibold text-sm transition border-b-2 ${
            tab === 'lama'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-gray-500 hover:text-blue-600'
          }`}
        >
          🔍 Pasien Lama
        </button>
      </div>

      {/* Form Pasien Baru */}
      {tab === 'baru' && (
        <form onSubmit={handleSubmitBaru} className="flex flex-col gap-4">

          <InputField
            label="No Rekam Medis (jika sudah punya)"
            name="no_rekam_medik"
            value={formBaru.no_rekam_medik}
            onChange={handleChangeBaru}
            placeholder="Contoh: RM0012"
          />

          <InputField
            label="NIK *"
            name="nik"
            value={formBaru.nik}
            onChange={handleChangeBaru}
            placeholder="16 digit angka sesuai KTP"
          />

          <InputField
            label="Nama Lengkap *"
            name="nama"
            value={formBaru.nama}
            onChange={handleChangeBaru}
            placeholder="Sesuai KTP"
          />

          {/* Alamat */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Alamat Lengkap *</label>
            <textarea
              name="alamat"
              value={formBaru.alamat}
              onChange={handleChangeBaru}
              rows={3}
              placeholder="Jalan, RT/RW, Kelurahan, Kecamatan"
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition resize-none"
              required
            />
          </div>

          {/* Jenis Kelamin */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Jenis Kelamin *</label>
            <select
              name="jenis_kelamin"
              value={formBaru.jenis_kelamin}
              onChange={handleChangeBaru}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              required
            >
              <option value="">-- Pilih Jenis Kelamin --</option>
              <option value="L">Laki-laki</option>
              <option value="P">Perempuan</option>
            </select>
          </div>

          <InputField
            label="No Telepon *"
            name="no_telepon"
            type="tel"
            value={formBaru.no_telepon}
            onChange={handleChangeBaru}
            placeholder="Contoh: 081234567890"
          />

          <InputField
            label="Tanggal Lahir *"
            name="tanggal_lahir"
            type="date"
            value={formBaru.tanggal_lahir}
            onChange={handleChangeBaru}
            placeholder=""
          />

          {/* Tipe Pasien */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Tipe Pasien *</label>
            <select
              name="tipe_pasien"
              value={formBaru.tipe_pasien}
              onChange={handleChangeBaru}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              required
            >
              <option value="">-- Pilih Tipe Pasien --</option>
              <option value="umum">Umum</option>
              <option value="bpjs">BPJS</option>
              <option value="lainnya">Lainnya</option>
            </select>
          </div>

          {/* No BPJS — muncul kalau tipe = bpjs */}
          {formBaru.tipe_pasien === 'bpjs' && (
            <InputField
              label="No BPJS *"
              name="no_bpjs"
              value={formBaru.no_bpjs}
              onChange={handleChangeBaru}
              placeholder="Masukkan nomor BPJS"
            />
          )}

          <Button type="submit">
            Lanjut ke Pendaftaran →
          </Button>
        </form>
      )}

      {/* Form Pasien Lama */}
      {tab === 'lama' && (
        <form onSubmit={handleCariLama} className="flex flex-col gap-4">
          <InputField
            label="NIK *"
            value={nikCari}
            onChange={(e) => setNikCari(e.target.value)}
            placeholder="16 digit angka sesuai KTP"
          />

          {/* Error message */}
          {errorCari && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-lg">
              ❌ {errorCari}
            </div>
          )}

          {/* Info coba NIK */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm text-blue-700">
            💡 <strong>Coba NIK:</strong> 3374010101900001 (Budi Santoso)
          </div>

          <Button type="submit">
            🔍 Cari Data Pasien
          </Button>
        </form>
      )}

    </div>
  )
}

export default PilihPasien