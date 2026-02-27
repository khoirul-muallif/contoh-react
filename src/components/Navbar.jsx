import { NavLink } from 'react-router-dom'

const Navbar = () => {
  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'About', path: '/about' },
    { label: 'Services', path: '/services' },
    { label: 'Contact', path: '/contact' },
  ]

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <NavLink to="/" className="text-2xl font-bold text-blue-600">
          MyCompany
        </NavLink>

        {/* Menu */}
        <ul className="flex gap-8">
          {navItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                end
                className={({ isActive }) =>
                  `font-medium transition hover:text-blue-600 ${
                    isActive ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'
                  }`
                }
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}

export default Navbar