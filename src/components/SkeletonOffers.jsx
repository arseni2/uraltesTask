/* mirrors real offers: mobile .offer-card, desktop table rows.
   Table rows alternate 1-line (~42px) and 2-line (~66px) heights
   because long names wrap to two lines. Bars match text line boxes
   (24px per 1rem line), badges 24px. */

const NAME_WIDTHS = [72, 55, 64, 48, 66, 58]

function NameBlock({ i }) {
  const wide = NAME_WIDTHS[i % NAME_WIDTHS.length]
  if (i % 3 === 0) {
    return (
      <div className="flex-grow-1">
        <span className={`placeholder col-${wide} rounded d-block`} style={{ height: 24 }} />
        <span className={`placeholder col-${NAME_WIDTHS[(i + 2) % NAME_WIDTHS.length]} rounded d-block`} style={{ height: 24 }} />
      </div>
    )
  }
  return <span className={`placeholder col-${wide} rounded flex-grow-1`} style={{ height: 24 }} />
}

function SkeletonOffers({ rows = 7 }) {
  return (
    <div aria-hidden="true">
      {/* mobile: offer cards */}
      <div className="d-lg-none">
        {Array.from({ length: Math.min(rows, 5) }, (_, i) => (
          <div className="offer-card" key={i} style={{ '--sk-idx': i }}>
            <span
              className={`placeholder col-${NAME_WIDTHS[i % NAME_WIDTHS.length]} rounded d-block`}
              style={{ height: 21 }}
            />
            <span className="placeholder col-3 rounded d-block mt-1" style={{ height: 24, width: 72 }} />
            <div className="d-flex justify-content-between align-items-end mt-2">
              <span className="placeholder rounded" style={{ width: 84, height: 27 }} />
              <span className="placeholder rounded" style={{ width: 56, height: 19 }} />
            </div>
          </div>
        ))}
      </div>

      {/* desktop: table rows */}
      <div className="d-none d-lg-block">
        <div className="skeleton-offer-head">
          {[34, 14, 14, 10, 10, 6].map((w, i) => (
            <span key={i} className="placeholder rounded" style={{ height: 10, width: `${w}%` }} />
          ))}
        </div>
        {Array.from({ length: rows }, (_, i) => (
          <div className="skeleton-offer-row" key={i} style={{ '--sk-idx': i }}>
            <NameBlock i={i} />
            <span className="placeholder col-2 rounded" style={{ height: 24 }} />
            <span className="placeholder col-2 rounded" style={{ height: 24 }} />
            <span className="placeholder rounded ms-auto" style={{ height: 24, width: 84 }} />
            <span className="placeholder rounded" style={{ height: 24, width: 64 }} />
            <span className="placeholder rounded-circle" style={{ width: 14, height: 14 }} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default SkeletonOffers
