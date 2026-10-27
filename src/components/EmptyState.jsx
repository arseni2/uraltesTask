function EmptyState({ icon = 'bi-inbox', title, text, onReset }) {
  return (
    <section className="app-card">
      <div className="empty-state">
        <div className="empty-icon">
          <i className={`bi ${icon}`} aria-hidden="true" />
        </div>
        <h5 className="mb-1">{title}</h5>
        <p className="mb-3">{text}</p>
        {onReset && (
          <button type="button" className="btn btn-outline-primary" onClick={onReset}>
            <i className="bi bi-arrow-counterclockwise me-2" aria-hidden="true" />
            Новый поиск
          </button>
        )}
      </div>
    </section>
  )
}

export default EmptyState
