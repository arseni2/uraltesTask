/* mirrors .brand-item geometry: padding .7/.9rem, border, radius .85rem,
   min-height 56px, avatar 40x40 radius 10px, two text lines (19px each),
   badge 24px, chevron 16px.
   Bar widths are fixed pixels mimicking real text lengths:
   short brand names (FEBI, GLASER...) + medium truncated part names. */

const AVATAR_RADIUS = 10
const NAME_WIDTHS = [44, 96, 70, 58, 110, 80]
const PART_WIDTHS = [180, 140, 200, 160, 120, 190]
const BADGE_WIDTHS = [56, 64, 72]

function SkeletonBrands({ rows = 6 }) {
  return (
    <div aria-hidden="true" className="d-grid gap-2">
      {Array.from({ length: rows }, (_, i) => (
        <div className="skeleton-row" key={i} style={{ '--sk-idx': i }}>
          <span className="placeholder rounded" style={{ width: 40, height: 40, borderRadius: AVATAR_RADIUS }} />
          <div className="flex-grow-1" style={{ minWidth: 0 }}>
            <span
              className="placeholder rounded d-block"
              style={{ width: NAME_WIDTHS[i % NAME_WIDTHS.length], height: 19 }}
            />
            <span
              className="placeholder rounded d-block"
              style={{ width: PART_WIDTHS[(i + 3) % PART_WIDTHS.length], height: 19, maxWidth: '100%' }}
            />
          </div>
          <span
            className="placeholder rounded d-none d-sm-block"
            style={{ width: BADGE_WIDTHS[i % BADGE_WIDTHS.length], height: 24 }}
          />
          <span className="placeholder rounded d-none d-sm-block" style={{ width: 16, height: 16 }} />
        </div>
      ))}
    </div>
  )
}

export default SkeletonBrands
