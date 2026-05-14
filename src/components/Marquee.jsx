const DEFAULT_ITEMS = ['Clean Water', 'Education', 'Healthcare', 'Women Empowerment', 'Community Impact']

export default function Marquee({ site }) {
  const accent = site?.theme?.accent || '#c9a84c'
  const ITEMS = [
    site?.ngoName,
    site?.location,
    ...(site?.programs || []).map((program) => program.category),
    site?.batch,
  ].filter(Boolean)
  const items = ITEMS.length ? [...new Set(ITEMS)] : DEFAULT_ITEMS
  const doubled = [...items, ...items]

  return (
    <div
      className="py-4 overflow-hidden"
      style={{ background: '#0a0f0d', borderTop: '1px solid rgba(201,168,76,0.15)', borderBottom: '1px solid rgba(201,168,76,0.15)' }}
      aria-hidden="true"
    >
      <div className="section-container">
        <div className="ticker-window">
          <div className="flex whitespace-nowrap marquee-track">
            {doubled.map((item, i) => (
              <span
                key={i}
                className="ticker-item inline-flex items-center gap-2 sm:gap-3 font-sans font-semibold uppercase"
                style={{ color: accent }}
              >
                {item}
                <span className="opacity-30">✦</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
