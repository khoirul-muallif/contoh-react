import { Link } from 'react-router-dom'

const badgeColors = {
  blue: 'bg-blue-100 text-blue-700',
  green: 'bg-green-100 text-green-700',
  red: 'bg-red-100 text-red-700',
  yellow: 'bg-yellow-100 text-yellow-700',
  purple: 'bg-purple-100 text-purple-700',
}

const Card = ({ to, badge, badgeColor = 'blue', title, date, description, penting }) => {
  return (
    <Link
      to={to}
      className="block bg-white rounded-xl shadow-sm hover:shadow-md border border-gray-100 hover:border-blue-200 transition p-5 group"
    >
      {/* Badge + Penting */}
      <div className="flex items-center justify-between mb-3">
        <span className={`text-xs font-semibold px-3 py-1 rounded-full ${badgeColors[badgeColor]}`}>
          {badge}
        </span>
        {penting && (
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-red-100 text-red-600">
            🔴 Penting
          </span>
        )}
      </div>

      {/* Title */}
      <h3 className="font-bold text-gray-800 text-lg group-hover:text-blue-600 transition leading-snug mb-2">
        {title}
      </h3>

      {/* Date */}
      {date && (
        <p className="text-xs text-gray-400 mb-2">📅 {date}</p>
      )}

      {/* Description */}
      <p className="text-gray-500 text-sm leading-relaxed line-clamp-2">
        {description}
      </p>

      <p className="text-blue-500 text-sm font-medium mt-3 group-hover:underline">
        Baca selengkapnya →
      </p>
    </Link>
  )
}

export default Card