function ErrorAlert({ message }) {
  if (!message) return null
  return (
    <div className="alert alert-danger d-flex align-items-center gap-2" role="alert">
      <strong>Ошибка.</strong>
      <span>{message}</span>
    </div>
  )
}

export default ErrorAlert
