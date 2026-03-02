import { useState } from 'react'
import {
  FaPhone, FaEnvelope, FaMapMarkerAlt,
  FaClock, FaWhatsapp, FaFacebook,
  FaInstagram, FaYoutube
} from 'react-icons/fa'

const Contact = () => {
  const [form, setForm] = useState({
    nama: '', email: '', telepon: '', pesan: ''
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // Nanti ganti: axios.post('/api/kontak', form)
    console.log('Form kontak:', form)
    setSubmitted(true)
    setForm({ nama: '', email: '', telepon: '', pesan: '' })
  }

  return (
    <div>

      {/* Header */}
      <div className="bg-blue-700 py-16 text-center text-white">
        <h1 className="text-4xl font-bold mb-2">📬 Hubungi Kami</h1>
        <p className="text-blue-200">Kami siap membantu Anda 24 jam sehari</p>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

          {/* =====================
              KIRI — Info Kontak
          ===================== */}
          <div className="flex flex-col gap-8">

            {/* Info Kontak */}
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Informasi Kontak
              </h2>
              <div className="flex flex-col gap-4">

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center shrink-0">
                    <FaMapMarkerAlt />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">Alamat</p>
                    <p className="text-gray-500 text-sm">
                      Jl. Kesehatan No. 1, Banyumanik,<br />
                      Semarang, Jawa Tengah 50267
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center shrink-0">
                    <FaPhone />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">Telepon</p>
                    <a href="tel:02911234567" className="text-gray-500 text-sm hover:text-blue-600">
                      (024) 123-4567
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-green-100 text-green-600 rounded-xl flex items-center justify-center shrink-0">
                    <FaWhatsapp />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">WhatsApp</p>
                    <a
                      href="https://wa.me/6281234567890"
                      target="_blank"
                      rel="noreferrer"
                      className="text-gray-500 text-sm hover:text-green-600"
                    >
                      +62 812-3456-7890
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center shrink-0">
                    <FaEnvelope />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">Email</p>
                    <a href="mailto:info@rssehat.co.id" className="text-gray-500 text-sm hover:text-blue-600">
                      info@rssehat.co.id
                    </a>
                  </div>
                </div>

              </div>
            </div>

            {/* Jam Operasional */}
            <div className="bg-blue-50 rounded-2xl p-6">
              <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                <FaClock className="text-blue-600" />
                Jam Operasional
              </h3>
              <div className="flex flex-col gap-3 text-sm">
                {[
                  { layanan: 'IGD', jadwal: '24 Jam / 7 Hari', highlight: true },
                  { layanan: 'Poli Umum', jadwal: 'Senin - Sabtu: 07.00 - 21.00' },
                  { layanan: 'Poli Spesialis', jadwal: 'Senin - Jumat: 08.00 - 16.00' },
                  { layanan: 'Laboratorium', jadwal: 'Senin - Sabtu: 07.00 - 20.00' },
                  { layanan: 'Radiologi', jadwal: 'Senin - Sabtu: 08.00 - 17.00' },
                ].map((item) => (
                  <div key={item.layanan} className="flex justify-between items-center">
                    <span className={`font-medium ${item.highlight ? 'text-blue-700' : 'text-gray-700'}`}>
                      {item.layanan}
                    </span>
                    <span className={`text-xs px-3 py-1 rounded-full ${
                      item.highlight
                        ? 'bg-blue-600 text-white'
                        : 'bg-white text-gray-500 border border-gray-200'
                    }`}>
                      {item.jadwal}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Social Media */}
            <div>
              <h3 className="font-bold text-gray-800 mb-4">Ikuti Kami</h3>
              <div className="flex gap-3">
                {[
                  { icon: <FaFacebook />, color: 'bg-blue-600', label: 'Facebook' },
                  { icon: <FaInstagram />, color: 'bg-pink-500', label: 'Instagram' },
                  { icon: <FaYoutube />, color: 'bg-red-600', label: 'YouTube' },
                  { icon: <FaWhatsapp />, color: 'bg-green-500', label: 'WhatsApp' },
                ].map((item) => (
                  <a
                  key={item.label}
                   href="#"
                    className={`w-10 h-10 ${item.color} text-white rounded-xl flex items-center justify-center hover:opacity-80 transition`}
                    title={item.label}
                  >
                    {item.icon}
                  </a>
                ))}
              </div>
            </div>

          </div>

          {/* =====================
              KANAN — Form Kontak
          ===================== */}
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Kirim Pesan
            </h2>

            {/* Success Message */}
            {submitted && (
              <div className="bg-green-50 border border-green-200 text-green-700 rounded-xl p-4 mb-6 flex items-center gap-3">
                <span className="text-2xl">✅</span>
                <div>
                  <p className="font-semibold">Pesan berhasil dikirim!</p>
                  <p className="text-sm">Kami akan menghubungi Anda segera.</p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">

              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700">Nama Lengkap *</label>
                <input
                  type="text"
                  name="nama"
                  value={form.nama}
                  onChange={handleChange}
                  placeholder="Masukkan nama lengkap"
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  required
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700">Email *</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="contoh@email.com"
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  required
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700">No Telepon</label>
                <input
                  type="tel"
                  name="telepon"
                  value={form.telepon}
                  onChange={handleChange}
                  placeholder="Contoh: 081234567890"
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700">Pesan *</label>
                <textarea
                  name="pesan"
                  value={form.pesan}
                  onChange={handleChange}
                  rows={5}
                  placeholder="Tuliskan pesan atau pertanyaan Anda..."
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition resize-none"
                  required
                />
                <p className="text-xs text-gray-400 text-right">{form.pesan.length}/500</p>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition"
              >
                Kirim Pesan 📨
              </button>

            </form>
          </div>

        </div>

        {/* Peta Lokasi */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">📍 Lokasi Kami</h2>
          <div className="rounded-2xl overflow-hidden shadow-md h-80 bg-gray-200">
            <iframe
              title="Lokasi RS Sehat Sejahtera"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.0!2d110.4!3d-7.07!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0!2zN8KwMDQnMTIuMCJTIDExMMKwMjQnMDAuMCJF!5e0!3m2!1sid!2sid!4v1"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>

      </div>
    </div>
  )
}

export default Contact