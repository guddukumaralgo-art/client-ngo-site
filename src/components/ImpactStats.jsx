import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Droplets, BookOpen, HeartPulse, Users } from 'lucide-react'
import { IMAGES, imgFallback } from '../utils/images'
import { splitMetric } from '../data/ngoData'

const ICONS = [Droplets, BookOpen, HeartPulse, Users]

function AnimatedCounter({ target, suffix }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const started = useRef(false)

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true
        const duration = 2000
        const steps = 80
        const inc = target / steps
        let cur = 0
        const t = setInterval(() => {
          cur = Math.min(cur + inc, target)
          setCount(Math.floor(cur))
          if (cur >= target) clearInterval(t)
        }, duration / steps)
      }
    }, { threshold: 0.5 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [target])

  return <span ref={ref}>{count.toLocaleString('en-IN')}{suffix}</span>
}

export default function ImpactStats({ site }) {
  const accent = site?.theme?.accent || '#c9a84c'
  const stats = (site?.impacts || []).slice(0, 4).map((impact, index) => ({
    icon: ICONS[index] || Users,
    ...splitMetric(impact.number),
    label: impact.label,
    sub: impact.subtext,
  }))

  return (
    <section
      id="impact"
      className="relative section-block impact-section"
    >
      <img
        src={site?.images?.hero || IMAGES.hero}
        alt=""
        data-fallback-src={site?.images?.fallback}
        onError={imgFallback}
        className="impact-bg-image"
        loading="lazy"
        decoding="async"
        aria-hidden="true"
      />
      <div className="impact-bg-overlay" />

      <div className="relative z-10 section-container">
        {/* Section label */}
        <motion.div
          className="text-center mb-16 md:mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7 }}
        >
          <span
            className="section-label"
            style={{ color: '#c9a84c', background: 'rgba(201,168,76,0.1)', border: '1px solid rgba(201,168,76,0.25)' }}
          >
            Our Impact
          </span>
          <h2 className="section-h2 mt-5 text-white">
            Numbers That Tell a Story
          </h2>
          <p className="section-copy font-body text-white/60 mt-4">
            Every number represents real work delivered by {site?.ngoName || 'this NGO'}.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map(({ icon: Icon, value, suffix, label, sub }, i) => (
            <motion.div
              key={label}
              className="premium-card impact-card equal-card flex min-h-[250px] flex-col items-center justify-center text-center p-8 lg:p-10"
              style={{
                borderRadius: '16px',
                transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
              }}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ delay: i * 0.1, duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
              whileHover={{ y: -4, transition: { duration: 0.3 } }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = accent
                e.currentTarget.style.boxShadow = '0 8px 40px rgba(201,168,76,0.2)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.14)'
                e.currentTarget.style.boxShadow = '0 18px 56px rgba(0,0,0,0.28), inset 0 1px 0 rgba(255,255,255,0.14)'
              }}
            >
              <div
                className="icon-box w-16 h-16 rounded-2xl mb-6"
                style={{ background: 'rgba(201,168,76,0.15)', border: '1px solid rgba(201,168,76,0.25)' }}
              >
                <Icon size={28} strokeWidth={1.9} style={{ color: accent }} />
              </div>
              <div
                className="font-sans font-extrabold text-4xl mb-3 leading-none"
                style={{ color: accent, textShadow: '0 0 30px rgba(201,168,76,0.3)' }}
              >
                <AnimatedCounter target={value} suffix={suffix} />
              </div>
              <div className="font-sans font-bold text-white text-sm leading-snug mb-1.5">{label}</div>
              <div className="font-body text-white/45 text-xs leading-relaxed">{sub}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
