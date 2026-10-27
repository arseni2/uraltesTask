import { useEffect, useRef } from 'react'
import Tooltip from 'bootstrap/js/dist/tooltip'

function TooltipIcon({ icon, title, className = '', placement = 'top', ariaLabel }) {
  const ref = useRef(null)

  useEffect(() => {
    if (!ref.current) return undefined
    const tooltip = new Tooltip(ref.current, {
      title,
      placement,
      trigger: 'hover focus',
    })
    return () => tooltip.dispose()
  }, [title, placement])

  return (
    <i
      ref={ref}
      className={`bi ${icon} ${className}`}
      data-bs-toggle="tooltip"
      title={title}
      role="img"
      aria-label={ariaLabel || title}
      tabIndex={0}
    />
  )
}

export default TooltipIcon
