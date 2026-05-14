import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { HeartHandshake, ShieldCheck } from 'lucide-react'
import { IMAGES, imgFallback } from '../utils/images'
import { internalScrollProps } from '../utils/links'

function fmt(n) {
  if (n >= 100000) return `₹${(n / 100000).toFixed(n % 100000 === 0 ? 0 : 1)} Lakh`
  return `₹${n.toLocaleString('en-IN')}`
}

export default function Cause({ site }) {
  const [animated, setAnimated] = useState(false)
  const ref = useRef(null)
  const accent = site?.theme?.accent || '#c9a84c'
  const donateProps = internalScrollProps(site?.contact?.donateLink, 'cause')
  const campaigns = (site?.programs || []).slice(0, 3).map((program, index) => ({
    name: program.title,
    raised: [800000, 350000, 180000][index] || 150000,
    goal: [1000000, 500000, 300000][index] || 250000,
    pct: [80, 70, 60][index] || 55,
  }))

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !animated) setAnimated(true)
    }, { threshold: 0.3 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [animated])

  return (
    <section id="cause" className="relative section-block overflow-hidden">
      {/* BG */}
      <img
        src={site?.images?.donation || IMAGES.donation}
        alt="Donation and community"
        onError={imgFallback}
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0" style={{ background: 'rgba(6,13,9,0.90)' }} />

      <div ref={ref} className="relative z-10 section-container" style={{ maxWidth: '1000px' }}>
        {/* Header */}
        <motion.div
          className="text-center mb-16 md:mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
        >
          <span
            className="section-label"
            style={{ color: '#c9a84c', background: 'rgba(201,168,76,0.1)', border: '1px solid rgba(201,168,76,0.25)' }}
          >
            Active Campaigns
          </span>
          <h2 className="section-h2 mt-5 text-white">
            Every ₹100 Can Change a Life
          </h2>
          <p className="section-copy font-body text-white/55 mt-4">
            Your donation supports {site?.ngoName || 'this NGO'} programs directly — helping field teams reach communities faster.
          </p>
        </motion.div>

        {/* Campaign cards */}
        <div className="flex flex-col gap-6 mb-12">
          {campaigns.map(({ name, raised, goal, pct }, i) => (
            <motion.div
              key={name}
              className="premium-card p-6 md:p-8"
              style={{
                borderRadius: '16px',
              }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:justify-between sm:items-start mb-4">
                <h3 className="font-sans font-bold text-white text-base leading-snug">{name}</h3>
                <span
                  className="text-xs font-bold font-sans px-3 py-1 rounded-full flex-shrink-0 self-start"
                  style={{ background: 'rgba(201,168,76,0.2)', color: accent }}
                >
                  {pct}%
                </span>
              </div>
              {/* Progress track */}
              <div
                className="w-full h-2.5 rounded-full overflow-hidden mb-3"
                style={{ background: 'rgba(255,255,255,0.1)' }}
              >
                <div
                  className="h-full rounded-full progress-bar"
                  style={{
                    width: animated ? `${pct}%` : '0%',
                    background: `linear-gradient(90deg, ${site?.theme?.primary || '#0a6847'}, ${accent})`,
                    boxShadow: '0 0 12px rgba(201,168,76,0.4)',
                  }}
                />
              </div>
              <div className="flex flex-col gap-1 sm:flex-row sm:justify-between text-xs font-body" style={{ color: 'rgba(255,255,255,0.45)' }}>
                <span>Raised: <strong style={{ color: accent }}>{fmt(raised)}</strong></span>
                <span>Goal: {fmt(goal)}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          className="flex flex-col items-center gap-5"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
        >
          <a
            {...donateProps}
            className="premium-button premium-button--gold"
          >
            <HeartHandshake size={18} />
            <span>{site?.donationCta || 'Donate Now ₹'}</span>
          </a>

          {/* 80G badge */}
          <div
            className="inline-flex max-w-full items-center justify-center gap-2 px-5 py-2.5 rounded-full text-center"
            style={{
              background: 'rgba(255,255,255,0.06)',
              backdropFilter: 'blur(16px)',
              border: '1px solid rgba(255,255,255,0.12)',
            }}
          >
            <ShieldCheck size={16} style={{ color: accent }} />
            <span className="font-body text-sm font-medium text-white/80">
              80G Tax Exemption Available • FCRA Registered
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
