import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, BadgeCheck, HeartHandshake, ShieldCheck, UsersRound } from 'lucide-react'
import { IMAGES, imgFallback } from '../utils/images'
import { splitMetric } from '../data/ngoData'
import { internalScrollProps } from '../utils/links'

function Counter({ target, prefix = '', suffix = '' }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const started = useRef(false)

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !started.current) {
          started.current = true
          const duration = 1800
          const steps = 60
          const increment = target / steps
          let current = 0
          const timer = setInterval(() => {
            current = Math.min(current + increment, target)
            setCount(Math.floor(current))
            if (current >= target) clearInterval(timer)
          }, duration / steps)
        }
      },
      { threshold: 0.4 }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [target])

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}{count.toLocaleString('en-IN')}{suffix}
    </span>
  )
}

const headlineWords = (headline) => String(headline || 'Empowering Rural India,').split(/\s+/)

export default function Hero({ site }) {
  const accent = site?.theme?.accent || '#c9a84c'
  const primary = site?.theme?.primary || '#0a6847'
  const words = headlineWords(site?.heroHeadline)
  const stats = (site?.impacts || []).slice(0, 4).map((impact) => ({
    ...splitMetric(impact.number),
    label: impact.label,
  }))
  const donateProps = internalScrollProps(site?.contact?.donateLink, 'cause')
  const programProps = internalScrollProps('#programs', 'programs')
  const trustBadges = [
    { label: 'Community Impact', icon: UsersRound },
    { label: 'Outreach Ready', icon: BadgeCheck },
    { label: 'Support Driven', icon: ShieldCheck },
  ]

  return (
    <section id="home" className="hero-section" style={{ '--hero-accent': accent, '--hero-primary': primary }}>
      <div className="hero-ambient" aria-hidden="true" />

      {/* Main content */}
      <div className="hero-content section-container">
        <div className="hero-editorial-grid">
          <div className="hero-copy-column">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-4 self-start"
            >
              <span
                className="section-label"
                style={{
                  color: accent,
                  borderColor: 'rgba(201,168,76,0.35)',
                  background: 'rgba(201,168,76,0.1)',
                  border: '1px solid rgba(201,168,76,0.35)',
                }}
              >
                Since {site?.establishedYear || '2013'} • {site?.location || 'India'}
              </span>
            </motion.div>

            <motion.div
              className="hero-identity"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.55 }}
            >
              <img
                src={site?.images?.profile}
                alt={`${site?.ngoName || 'NGO'} profile`}
                data-fallback-src={site?.images?.fallback}
                onError={imgFallback}
                loading="eager"
                decoding="async"
              />
              <div>
                <span>{site?.ngoName || 'NGO'}</span>
                <small>{site?.tagline || 'Community-led impact'}</small>
              </div>
            </motion.div>

            <h1 className="hero-title font-sans font-extrabold text-white mb-4">
              <div className="flex flex-wrap" style={{ gap: '0 0.3em', marginBottom: '0.1em' }}>
                {words.map((word, i) => (
                  <motion.span
                    key={`${word}-${i}`}
                    className="inline-block"
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.14 + i * 0.07, duration: 0.58, ease: [0.4, 0, 0.2, 1] }}
                  >
                    {word}{i < words.length - 1 ? ' ' : ''}
                  </motion.span>
                ))}
              </div>
              <motion.span
                className="hero-title-accent hero-highlight-text italic inline-block"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.26 + words.length * 0.055, duration: 0.58, ease: [0.4, 0, 0.2, 1] }}
              >
                {site?.heroHighlight || 'Changing Lives.'}
              </motion.span>
            </h1>

            <motion.p
              className="hero-copy font-body text-white/72 mt-2 mb-8 leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.52, duration: 0.55 }}
            >
              {site?.heroSubheadline || 'Delivering clean water, education, healthcare and women empowerment across 200+ villages in rural India.'}
            </motion.p>

            <motion.div
              className="hero-trust-row"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.62, duration: 0.5 }}
            >
              {trustBadges.map(({ label, icon: Icon }) => (
                <span key={label} className="hero-trust-badge">
                  <Icon size={15} />
                  {label}
                </span>
              ))}
            </motion.div>

            <motion.div
              className="hero-actions"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.72, duration: 0.5 }}
            >
              <a
                {...donateProps}
                className="premium-button premium-button--gold"
              >
                <HeartHandshake size={18} />
                <span>Support This Cause</span>
              </a>
              <a
                {...programProps}
                className="premium-button premium-button--ghost"
              >
                <span>See Our Programs</span>
                <ArrowRight size={17} />
              </a>
            </motion.div>

            <motion.p
              className="hero-cta-note"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.82, duration: 0.5 }}
            >
              Every contribution helps this mission reach one more family.
            </motion.p>
          </div>

          <motion.div
            className="hero-visual-wrap"
            initial={{ opacity: 0, x: 34 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.35, duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
          >
            <div className="hero-visual-card">
              <img
                src={site?.images?.hero || IMAGES.hero}
                alt={`${site?.ngoName || 'NGO'} community impact`}
                data-fallback-src={site?.images?.fallback}
                onError={imgFallback}
                className="hero-main-image"
                loading="eager"
                decoding="async"
              />
              <div className="hero-image-overlay" />
              <div className="hero-image-caption">
                <img
                  src={site?.images?.profile}
                  alt=""
                  data-fallback-src={site?.images?.fallback}
                  onError={imgFallback}
                  loading="eager"
                  decoding="async"
                />
                <span>Field stories from {site?.location || 'India'}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Stats bar */}
      <div className="hero-stats-wrap">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.7 }}
        >
          <div className="hero-stats-card">
            {stats.map(({ value, prefix, suffix, label }) => (
              <div key={label} className="hero-stat">
                <span
                  className="font-sans font-extrabold"
                  style={{ fontSize: '2rem', color: accent }}
                >
                  <Counter target={value} prefix={prefix} suffix={suffix} />
                </span>
                <span
                  className="font-body text-white/70 mt-1.5 tracking-wide text-center"
                  style={{ fontSize: '12px' }}
                >
                  {label}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
