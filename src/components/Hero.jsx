import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, HeartHandshake } from 'lucide-react'
import { IMAGES, imgFallback } from '../utils/images'
import { splitMetric } from '../data/ngoData'
import { internalScrollProps } from '../utils/links'

function Counter({ target, suffix }) {
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
      {count.toLocaleString('en-IN')}{suffix}
    </span>
  )
}

const headlineWords = (headline) => String(headline || 'Empowering Rural India,').split(/\s+/)

export default function Hero({ site }) {
  const accent = site?.theme?.accent || '#c9a84c'
  const stats = (site?.impacts || []).slice(0, 4).map((impact) => ({
    ...splitMetric(impact.number),
    label: impact.label,
  }))
  const donateProps = internalScrollProps(site?.contact?.donateLink, 'cause')

  return (
    <section id="home" className="hero-section">
      {/* BG image with Ken Burns */}
      <div className="absolute inset-0 overflow-hidden">
        <img
          src={site?.images?.hero || IMAGES.hero}
          alt={`${site?.ngoName || 'NGO'} hero`}
          onError={imgFallback}
          className="w-full h-[110%] object-cover ken-burns"
          style={{ transformOrigin: 'center center' }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to right, rgba(6,13,9,0.93) 0%, rgba(6,13,9,0.78) 45%, rgba(6,13,9,0.42) 100%), ' +
              'linear-gradient(to top, rgba(6,13,9,0.72) 0%, transparent 45%)',
          }}
        />
      </div>

      {/* Main content */}
      <div className="hero-content section-container">
        {/* Gold tag */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6 self-start"
        >
          <span
            className="section-label"
            style={{
              color: '#c9a84c',
              borderColor: 'rgba(201,168,76,0.35)',
              background: 'rgba(201,168,76,0.1)',
              border: '1px solid rgba(201,168,76,0.35)',
            }}
          >
            Since {site?.establishedYear || '2013'} • {site?.location || 'India'}
          </span>
        </motion.div>

        {/* Headline */}
        <h1 className="hero-title font-sans font-extrabold text-white mb-4">
          <div className="flex flex-wrap" style={{ gap: '0 0.3em', marginBottom: '0.1em' }}>
            {headlineWords(site?.heroHeadline).map((word, i) => (
              <motion.span
                key={`${word}-${i}`}
                className="inline-block"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.15, duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
              >
                {word}
              </motion.span>
            ))}
          </div>
          <motion.span
            className="hero-title-accent shimmer-text italic inline-block"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + headlineWords(site?.heroHeadline).length * 0.15, duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
          >
            {site?.heroHighlight || 'Changing Lives.'}
          </motion.span>
        </h1>

        {/* Sub */}
        <motion.p
          className="hero-copy font-body text-white/72 mt-2 mb-8 leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.7 }}
        >
          {site?.heroSubheadline || 'Delivering clean water, education, healthcare and women empowerment across 200+ villages in rural India.'}
        </motion.p>

        {/* Buttons */}
        <motion.div
          className="inline-flex w-full flex-wrap gap-4 sm:w-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.6 }}
        >
          <a
            href="#about"
            className="premium-button premium-button--ghost"
            onClick={(event) => {
              event.preventDefault()
              document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
            }}
          >
            <span>Our Mission</span>
            <ArrowRight size={17} />
          </a>
          <a
            {...donateProps}
            className="premium-button premium-button--gold"
          >
            <HeartHandshake size={18} />
            <span>{site?.donationCta || 'Donate Now ₹'}</span>
          </a>
        </motion.div>
      </div>

      {/* Stats bar */}
      <div className="hero-stats-wrap">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.7 }}
        >
          <div className="hero-stats-card">
            {stats.map(({ value, suffix, label }) => (
              <div key={label} className="hero-stat">
                <span
                  className="font-sans font-extrabold"
                  style={{ fontSize: '2rem', color: accent }}
                >
                  <Counter target={value} suffix={suffix} />
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
