import { useState } from 'react'

function SearchForm({ onSubmit, isLoading, onReset, showReset }) {
  const [number, setNumber] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    const trimmed = number.trim()
    if (!trimmed) return
    onSubmit(trimmed)
  }

  return (
    <form onSubmit={handleSubmit} className="row g-2 align-items-end">
      <div className="col-12 col-sm">
        <label htmlFor="part-number" className="form-label fw-medium small">
          Артикул детали
        </label>
        <div className="input-group input-group-lg">
          <span className="input-group-text bg-transparent search-input-icon border-end-0">
            <i className="bi bi-upc-scan" aria-hidden="true" />
          </span>
          <input
            id="part-number"
            type="text"
            className="form-control border-start-0 ps-0"
            style={{ textTransform: 'uppercase' }}
            placeholder="Например, 01089"
            autoComplete="off"
            enterKeyHint="search"
            value={number}
            onChange={(event) => setNumber(event.target.value)}
            disabled={isLoading}
          />
        </div>
      </div>
      <div className="col-12 col-sm-auto d-flex gap-2">
        <button type="submit" className="btn btn-primary search-btn" disabled={isLoading || !number.trim()}>
          {isLoading ? (
            <>
              <span className="spinner-border spinner-border-sm me-2" aria-hidden="true" />
              Ищем...
            </>
          ) : (
            <>
              <i className="bi bi-search me-2" aria-hidden="true" />
              Найти
            </>
          )}
        </button>
        {showReset && (
          <button
            type="button"
            className="btn btn-outline-secondary search-btn flex-grow-0 px-3"
            onClick={onReset}
            aria-label="Сбросить поиск"
            title="Сбросить поиск"
          >
            <i className="bi bi-x-lg" aria-hidden="true" />
            <span className="d-none d-sm-inline ms-2">Сброс</span>
          </button>
        )}
      </div>
    </form>
  )
}

export default SearchForm
