const Button = ({ children, type = 'button', onClick, variant = 'primary' }) => {
  const styles = {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white',
    outline: 'border border-blue-600 text-blue-600 hover:bg-blue-50',
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={`w-full py-2 px-4 rounded-lg font-semibold transition ${styles[variant]}`}
    >
      {children}
    </button>
  )
}

export default Button