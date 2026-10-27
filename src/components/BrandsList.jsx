const AVATAR_COLORS = ['#0d6efd', '#6610f2', '#d63384', '#fd7e14', '#198754', '#0dcaf0', '#6f42c1']

const colorFor = (brand) => {
  let hash = 0
  for (const ch of brand) hash = (hash * 31 + ch.charCodeAt(0)) >>> 0
  return AVATAR_COLORS[hash % AVATAR_COLORS.length]
}

function BrandsList({ brands, number, selectedBrand, onSelect }) {
  return (
    <section aria-label="Производители">
      <h5 className="mb-3 d-flex align-items-center gap-2">
        Производители
        <span className="badge text-bg-secondary">{brands.length}</span>
      </h5>
      <p className="text-secondary small mb-2">
        Артикул <strong>{number}</strong> · выберите бренд для поиска аналогов
      </p>
      <div className="d-grid gap-2 brand-grid">
        {brands.map((item) => {
          const selected = selectedBrand === item.brand
          return (
            <button
              key={item.brand}
              type="button"
              className={`brand-item ${selected ? 'selected' : ''}`}
              onClick={() => onSelect(item.brand)}
              aria-pressed={selected}
            >
              <span className="brand-avatar" style={{ background: colorFor(item.brand) }} aria-hidden="true">
                {item.brand[0]}
              </span>
              <span className="flex-grow-1">
                <span className="brand-name d-block text-truncate">{item.brand}</span>
                <small className="brand-part d-block text-truncate">{item.name}</small>
              </span>
              <span className={`badge text-bg-${selected ? 'primary' : 'secondary'} flex-shrink-0`}>{item.count} шт.</span>
              <i className={`bi ${selected ? 'bi-check2' : 'bi-chevron-right'} brand-chevron`} aria-hidden="true" />
            </button>
          )
        })}
      </div>
    </section>
  )
}

export default BrandsList
