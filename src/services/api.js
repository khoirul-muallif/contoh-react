import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  }
})

// Pengumuman
export const getPengumuman = () => api.get('/pengumuman')
export const getPengumumanBySlug = (slug) =>
  api.get(`/pengumuman?slug=${slug}`).then(res => res.data[0])

// FAQ
export const getFaq = () => api.get('/faq')

// Blog
export const getBlog = () => api.get('/blog')
export const getBlogBySlug = (slug) =>
  api.get(`/blog?slug=${slug}`).then(res => res.data[0])

// Dokter
export const getDokter = () => api.get('/dokter')
export const getDokterById = (id) => api.get(`/dokter/${id}`)

// Pasien
// Ganti fungsi cariPasien:
export const cariPasien = (nik) =>
  api.get('/pasien').then(res => {
    const found = res.data.find(p => String(p.nik) === String(nik))
    return found || null
  })
export const simpanPasien = (data) => api.post('/pasien', data)

// Pendaftaran
export const simpanPendaftaran = (data) => api.post('/pendaftaran', data)

export default api