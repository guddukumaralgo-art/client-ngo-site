import { internalScrollProps } from '../utils/links'
import { imgFallback } from '../utils/images'

const SOCIAL = [
  { name: 'Facebook', href: '#', path: 'M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z' },
  { name: 'Instagram', href: '#', path: 'M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37zm1.5-4.87h.01M6.5 19.5h11a3 3 0 0 0 3-3v-11a3 3 0 0 0-3-3h-11a3 3 0 0 0-3 3v11a3 3 0 0 0 3 3z' },
  { name: 'Twitter', href: '#', path: 'M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z' },
  { name: 'LinkedIn', href: '#', path: 'M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z M4 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4z' },
]

const splitBrand = (name = 'HopeForward') => {
  const spaced = name.replace(/([a-z])([A-Z])/g, '$1 $2')
  const parts = spaced.split(/\s+/)
  return {
    first: parts[0] || name,
    rest: parts.slice(1).join(' '),
  }
}

export default function Footer({ site }) {
  const brand = splitBrand(site?.ngoName)
  const accent = site?.theme?.accent || '#c9a84c'
  const programs = (site?.programs || []).map((program) => program.title).slice(0, 6)
  const contact = site?.contact || {}
  const emailHref = contact.email?.startsWith('mailto:') ? contact.email : `mailto:${contact.email || ''}`
  const currentYear = new Date().getFullYear()

  return (
    <footer style={{ background: '#0a0f0d', borderTop: '1px solid rgba(255,255,255,0.15)' }}>
      <div className="section-container footer-shell">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-14 mb-14">
          <div className="flex flex-col gap-4 max-w-sm">
            <div className="footer-brand-row">
              <img
                src={site?.images?.profile}
                alt={`${site?.ngoName || 'NGO'} profile`}
                className="footer-brand-avatar"
                onError={imgFallback}
              />
              <div className="font-sans font-bold text-2xl leading-tight">
                <span className="text-white">{brand.first}</span>
                {brand.rest && <span style={{ color: accent }}> {brand.rest}</span>}
              </div>
            </div>
            <p className="font-body text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.4)' }}>
              {site?.tagline || 'Community-led impact for families and villages.'}
            </p>
            <div className="flex flex-wrap gap-3 mt-2">
              {SOCIAL.map(({ name, href, path }) => (
                <a
                  key={name}
                  href={href}
                  aria-label={name}
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  onClick={(event) => event.preventDefault()}
                  style={{
                    background: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(255,255,255,0.15)',
                    transition: 'transform 0.3s ease, border-color 0.3s ease, background 0.3s ease',
                    flexShrink: 0,
                    textDecoration: 'none',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.15)'
                    e.currentTarget.style.borderColor = accent
                    e.currentTarget.style.background = 'rgba(201,168,76,0.15)'
                    e.currentTarget.querySelector('svg').setAttribute('stroke', accent)
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)'
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'
                    e.currentTarget.style.background = 'rgba(255,255,255,0.06)'
                    e.currentTarget.querySelector('svg').setAttribute('stroke', 'rgba(255,255,255,0.6)')
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="rgba(255,255,255,0.6)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d={path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-sans font-bold text-white text-sm mb-5 tracking-wide uppercase">Programs</h4>
            <ul className="flex flex-col gap-3">
              {programs.map((program) => (
                <li key={program}>
                  <a
                    {...internalScrollProps('#programs', 'programs')}
                    className="font-body text-sm transition-colors duration-200"
                    style={{ color: 'rgba(255,255,255,0.45)' }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = accent)}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.45)')}
                  >
                    {program}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-sans font-bold text-white text-sm mb-5 tracking-wide uppercase">Contact</h4>
            <div className="flex flex-col gap-4 font-body text-sm" style={{ color: 'rgba(255,255,255,0.45)' }}>
              <div>
                <div className="text-white/70 font-medium mb-1">Address</div>
                {contact.address || site?.location || 'India'}
              </div>
              <div>
                <div className="text-white/70 font-medium mb-1">Email</div>
                <a
                  href={emailHref}
                  style={{ color: 'rgba(255,255,255,0.45)' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = accent)}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.45)')}
                >
                  {contact.email || 'hello@example.org'}
                </a>
              </div>
              <div>
                <div className="text-white/70 font-medium mb-1">Phone</div>
                {contact.phone || '+91 00 0000 0000'}
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-sans font-bold text-white text-sm mb-5 tracking-wide uppercase">Legal</h4>
            <div className="flex flex-col gap-2 font-body text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>
              <div>Established: {site?.establishedYear || '2013'}</div>
              <div>Location: {site?.location || 'India'}</div>
              <div>Batch: {site?.batch || 'batch 1'}</div>
              <div>Status: {site?.status || 'live'}</div>
            </div>
          </div>
        </div>

        <div
          className="text-center font-sans font-black mb-8 select-none"
          style={{ color: 'rgba(201,168,76,0.12)', fontSize: 'clamp(0.78rem, 2vw, 1rem)', letterSpacing: '0.18em', overflowWrap: 'anywhere' }}
          aria-hidden="true"
        >
          {programs.slice(0, 5).join(' * ').toUpperCase() || 'IMPACT * CARE * COMMUNITY'}
        </div>

        <div
          className="pt-7 flex flex-col lg:flex-row items-center justify-between gap-5 text-xs font-body text-center lg:text-left"
          style={{ borderTop: '1px solid rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.3)' }}
        >
          <span className="leading-relaxed">© {currentYear} {site?.ngoName || 'NGO'} | CSV-generated client website</span>
          <span
            className="px-4 py-2 rounded-full text-center leading-relaxed max-w-3xl"
            style={{ background: 'rgba(255,200,0,0.07)', border: '1px solid rgba(255,200,0,0.15)', color: 'rgba(255,200,0,0.6)' }}
          >
            Demo batch-generation concept. Replace CSV rows with real client-approved organisation details before launch.
          </span>
        </div>
      </div>
    </footer>
  )
}
