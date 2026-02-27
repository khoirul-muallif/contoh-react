import { useState } from 'react'
import { Link } from 'react-router-dom'
import InputField from '../components/InputField'
import Button from '../components/Button'

const Register = () => {
  const [nama, setNama] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [konfirmasi, setKonfirmasi] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (password !== konfirmasi) {
      alert('Password tidak cocok!')
      return
    }
    console.log('Register:', { nama, email, password })
    alert(`Akun ${nama} berhasil dibuat!`)
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8">
        <div className="flex flex-col gap-5">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800">Buat Akun Baru ✨</h2>
            <p className="text-gray-500 text-sm mt-1">Daftar dan mulai sekarang</p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <InputField
              label="Nama Lengkap"
              value={nama}
              onChange={(e) => setNama(e.target.value)}
              placeholder="John Doe"
            />
            <InputField
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="contoh@email.com"
            />
            <InputField
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Minimal 8 karakter"
            />
            <InputField
              label="Konfirmasi Password"
              type="password"
              value={konfirmasi}
              onChange={(e) => setKonfirmasi(e.target.value)}
              placeholder="Ulangi password"
            />
            <Button type="submit">Daftar</Button>
          </form>

          <p className="text-center text-sm text-gray-500">
            Sudah punya akun?{' '}
            <Link  
              to="/login"
              className="text-blue-600 font-semibold hover:underline"
            >
              Masuk di sini
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Register
