function Loader({ label = 'Загрузка...' }) {
  return (
    <div className="d-flex align-items-center justify-content-center gap-2 my-4">
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">{label}</span>
      </div>
      <span className="text-secondary">{label}</span>
    </div>
  )
}

export default Loader
