const PARTNERS = [
  'Local Volunteers',
  'Community Leaders',
  'Field Teams',
  'Donor Network',
  'School Partners',
  'Health Workers',
]

export default function Partners({ site }) {
  const accent = site?.theme?.accent || '#c9a84c'
  const items = [
    ...PARTNERS,
    `${site?.location || 'India'} Communities`,
    `${site?.ngoName || 'NGO'} Supporters`,
  ]
  const doubled = [...items, ...items]

  return (
    <section className="section-block section-block--tight section-dark overflow-hidden">
      <div className="section-container">
        <div className="text-center mb-12">
          <span
            className="section-label"
            style={{ color: accent, background: 'rgba(201,168,76,0.1)', border: '1px solid rgba(201,168,76,0.25)' }}
          >
            Our Partners
          </span>
          <h2 className="section-h2 mt-5 text-white">
            Powered by Local Trust
          </h2>
          <p className="font-body text-xs mt-2" style={{ color: 'rgba(255,255,255,0.3)' }}>
            Community and supporter network for {site?.ngoName || 'this NGO'}
          </p>
        </div>
      </div>

      <div className="section-container">
        <div className="ticker-window">
          <div
            className="flex whitespace-nowrap"
            style={{ animation: 'marqueeLeft 22s linear infinite' }}
          >
            {doubled.map((p, i) => (
              <div
                key={i}
                className="partner-pill premium-card inline-flex items-center justify-center flex-shrink-0"
                style={{
                  borderRadius: '8px',
                  transition: 'background 0.3s ease, border-color 0.3s ease',
                  cursor: 'default',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(201,168,76,0.15)'
                  e.currentTarget.style.borderColor = 'rgba(201,168,76,0.4)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.1)'
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'
                }}
              >
                <span
                  className="font-sans font-bold text-sm"
                  style={{ color: 'rgba(255,255,255,0.85)', letterSpacing: '0.02em' }}
                >
                  {p}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
