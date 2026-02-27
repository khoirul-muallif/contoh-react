import { useState } from 'react'
import { FaChevronDown } from 'react-icons/fa'

const Accordion = ({ pertanyaan, jawaban }) => {
  const [open, setOpen] = useState(false)

  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden">

      {/* Header — klik untuk buka/tutup */}
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-4 bg-white hover:bg-blue-50 transition text-left"
      >
        <span className="font-semibold text-gray-800 pr-4">{pertanyaan}</span>
        <FaChevronDown
          className={`text-blue-600 shrink-0 transition-transform duration-300 ${
            open ? 'rotate-180' : ''
          }`}
        />
      </button>

      {/* Konten — muncul kalau open = true */}
      {open && (
        <div className="px-6 py-4 bg-blue-50 border-t border-gray-200">
          <p className="text-gray-600 leading-relaxed">{jawaban}</p>
        </div>
      )}

    </div>
  )
}

export default Accordion