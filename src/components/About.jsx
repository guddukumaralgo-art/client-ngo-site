import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { IMAGES, imgFallback } from '../utils/images'
import { internalScrollProps } from '../utils/links'

const fadeLeft = { initial: { opacity: 0, x: -50 }, whileInView: { opacity: 1, x: 0 }, viewport: { once: true, margin: '-80px' }, transition: { duration: 0.8, ease: [0.4, 0, 0.2, 1] } }
const fadeRight = { initial: { opacity: 0, x: 50 }, whileInView: { opacity: 1, x: 0 }, viewport: { once: true, margin: '-80px' }, transition: { duration: 0.8, ease: [0.4, 0, 0.2, 1] } }

export default function About({ site }) {
  const primary = site?.theme?.primary || '#0a6847'
  const accent = site?.theme?.accent || '#c9a84c'
  const impacts = site?.impacts || []
  const primaryImpact = impacts[0]?.number || '50K+'
  const secondaryImpact = impacts[1]?.number || '200+'
  const reverseLayout = site?.layoutVariant === 1

  return (
    <section id="about" className="section-block section-light">
      <div className="section-container">
        <div className={`about-grid ${reverseLayout ? 'about-grid--reverse' : ''}`}>

          {/* Image with decorative border */}
          <motion.div {...fadeLeft} className="about-image-shell">
            {/* Decorative green gradient bg behind image */}
            <div
              className="absolute rounded-3xl"
              style={{
                top: '18px', left: '-16px', right: '24px', bottom: '24px',
                background: 'linear-gradient(135deg, rgba(10,104,71,0.18), rgba(201,168,76,0.18))',
                borderRadius: '26px',
                zIndex: 0,
              }}
            />
            {/* Gold accent border */}
            <div
              className="absolute rounded-3xl"
              style={{
                top: '18px', left: '-16px', right: '24px', bottom: '24px',
                border: '2px solid rgba(201,168,76,0.3)',
                borderRadius: '26px',
                zIndex: 0,
              }}
            />
            <img
              src={site?.images?.about || site?.images?.fallback || IMAGES.about}
              alt={`${site?.ngoName || 'NGO'} community story`}
              data-fallback-src={site?.images?.fallback}
              onError={imgFallback}
              className="relative z-10 w-full rounded-3xl object-cover shadow-2xl"
              style={{ aspectRatio: '4/5', maxHeight: '560px' }}
              loading="lazy"
              decoding="async"
            />
            <div className="about-profile-medallion" style={{ borderColor: accent }}>
              <img
                src={site?.images?.profile}
                alt=""
                data-fallback-src={site?.images?.fallback}
                onError={imgFallback}
                loading="lazy"
                decoding="async"
              />
            </div>
          </motion.div>

          {/* Text */}
          <motion.div {...fadeRight} className="flex flex-col gap-7">
            <span
              className="section-label self-start"
              style={{ color: primary, background: 'rgba(10,104,71,0.1)', border: '1px solid rgba(10,104,71,0.2)' }}
            >
              Our Story
            </span>

            <h2 className="section-h2" style={{ color: '#1a1a1a' }}>
              Building a Stronger {site?.location || 'India'}, <span style={{ color: primary }}>One Village at a Time</span>
            </h2>

            {/* Pull-quote */}
            <blockquote
              className="py-4 pl-5 font-body text-base italic leading-relaxed"
              style={{ borderLeft: '3px solid #c9a84c', color: '#697268' }}
            >
              "Since {site?.establishedYear || '2013'}, we've reached{' '}
              <strong style={{ color: primary, fontStyle: 'normal' }}>{primaryImpact} lives</strong>{' '}
              across{' '}
              <strong style={{ color: primary, fontStyle: 'normal' }}>{secondaryImpact} communities</strong>{' '}
              with community-led impact."
            </blockquote>

            <p className="font-body text-base leading-relaxed max-w-2xl" style={{ color: '#697268' }}>
              {site?.missionText}
            </p>

            {/* Key stats inline */}
            <div className="about-metric-grid">
              {impacts.slice(0, 3).map(({ number, label }) => (
                <div key={label} className="about-metric-card">
                  <span className="font-sans font-extrabold text-3xl" style={{ color: accent }}>{number}</span>
                  <span className="font-body text-xs" style={{ color: '#697268' }}>{label}</span>
                </div>
              ))}
            </div>

            <a
              {...internalScrollProps('#programs', 'programs')}
              className="premium-button premium-button--green self-start"
            >
              <span>See Our Programs</span>
              <ArrowRight size={17} />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
