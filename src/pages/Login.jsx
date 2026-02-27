import { useState } from 'react'
import InputField from '../components/InputField'
import Button from '../components/Button'

const Login = ({ onSwitch }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Login:', { email, password })
    alert(`Login sebagai ${email}`)
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800">Selamat Datang 👋</h2>
        <p className="text-gray-500 text-sm mt-1">Masuk ke akun kamu</p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
          placeholder="Masukkan password"
        />

        <div className="text-right">
          <span className="text-sm text-blue-600 hover:underline cursor-pointer">
            Lupa password?
          </span>
        </div>

        <Button type="submit">Masuk</Button>
      </form>

      <p className="text-center text-sm text-gray-500">
        Belum punya akun?{' '}
        <span
          onClick={onSwitch}
          className="text-blue-600 font-semibold hover:underline cursor-pointer"
        >
          Daftar sekarang
        </span>
      </p>
    </div>
  )
}

export default Login