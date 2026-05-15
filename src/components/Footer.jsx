import { ArrowUpRight, Mail, MapPin, Phone, ShieldCheck } from 'lucide-react'
import { internalScrollProps } from '../utils/links'
import { imgFallback } from '../utils/images'

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
  const donateProps = internalScrollProps(contact.donateLink, 'cause')
  const contactProps = internalScrollProps(contact.contactLink, 'contact')

  return (
    <footer style={{ background: '#0a0f0d', borderTop: '1px solid rgba(255,255,255,0.15)' }}>
      <div className="section-container footer-shell">
        <div className="footer-grid">
          <div className="flex flex-col gap-4 max-w-sm">
            <div className="footer-brand-row">
              <img
                src={site?.images?.profile}
                alt={`${site?.ngoName || 'NGO'} profile`}
                className="footer-brand-avatar"
                data-fallback-src={site?.images?.fallback}
                onError={imgFallback}
                loading="lazy"
                decoding="async"
              />
              <div className="font-sans font-bold text-2xl leading-tight">
                <span className="text-white">{brand.first}</span>
                {brand.rest && <span style={{ color: accent }}> {brand.rest}</span>}
              </div>
            </div>
            <p className="font-body text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.4)' }}>
              {site?.tagline || 'Community-led impact for families and villages.'}
            </p>
            <div className="footer-cta-row">
              <a {...donateProps} className="premium-button premium-button--gold premium-button--small">
                <span>Support</span>
              </a>
              <a {...contactProps} className="footer-text-link">
                Contact
                <ArrowUpRight size={14} />
              </a>
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
            <div className="footer-contact-list">
              <div className="footer-contact-item">
                <MapPin size={16} />
                {contact.address || site?.location || 'India'}
              </div>
              <div className="footer-contact-item">
                <Mail size={16} />
                <a
                  href={emailHref}
                  style={{ color: 'rgba(255,255,255,0.45)' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = accent)}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.45)')}
                >
                  {contact.email || 'hello@example.org'}
                </a>
              </div>
              <div className="footer-contact-item">
                <Phone size={16} />
                {contact.phone || '+91 00 0000 0000'}
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-sans font-bold text-white text-sm mb-5 tracking-wide uppercase">Trust</h4>
            <div className="flex flex-col gap-2 font-body text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>
              <div>Established: {site?.establishedYear || '2013'}</div>
              <div>Location: {site?.location || 'India'}</div>
              <div className="footer-concept-note">
                <ShieldCheck size={14} />
                Transparent contact paths, focused programs and community-first impact storytelling.
              </div>
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
          <span className="leading-relaxed">© {currentYear} {site?.ngoName || 'NGO'} | Community impact website</span>
          <span
            className="px-4 py-2 rounded-full text-center leading-relaxed max-w-3xl"
            style={{ background: 'rgba(255,200,0,0.07)', border: '1px solid rgba(255,200,0,0.15)', color: 'rgba(255,200,0,0.6)' }}
          >
            Please verify legal, donation and registration details directly with the organisation before contributing.
          </span>
        </div>
      </div>
    </footer>
  )
}
