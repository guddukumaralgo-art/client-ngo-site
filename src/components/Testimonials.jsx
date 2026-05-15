import { useCallback, useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Quote } from 'lucide-react'
import { initialsFromName } from '../data/ngoData'

const INTERVAL = 5000

export default function Testimonials({ site }) {
  const [cur, setCur] = useState(0)
  const [paused, setPaused] = useState(false)
  const timer = useRef(null)
  const testimonials = site?.testimonials?.length ? site.testimonials : []
  const primary = site?.theme?.primary || '#0a6847'
  const accent = site?.theme?.accent || '#c9a84c'

  const startTimer = useCallback(() => {
    clearInterval(timer.current)
    if (testimonials.length < 2) return
    timer.current = setInterval(() => {
      setCur((c) => (c + 1) % testimonials.length)
    }, INTERVAL)
  }, [testimonials.length])

  useEffect(() => {
    if (!paused) startTimer()
    else clearInterval(timer.current)
    return () => clearInterval(timer.current)
  }, [paused, startTimer])

  const goTo = (i) => {
    setCur(i)
    startTimer()
  }

  const t = testimonials[cur] || {
    quote: site?.missionText || 'Community-led impact starts with trust and consistent support.',
    name: site?.ngoName || 'Community Member',
    location: site?.location || 'India',
  }

  return (
    <section
      id="testimonials"
      className="section-block section-light"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="section-container" style={{ maxWidth: '980px' }}>
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7 }}
        >
          <span
            className="section-label"
            style={{ color: primary, background: 'rgba(10,104,71,0.08)', border: '1px solid rgba(10,104,71,0.2)' }}
          >
            Real Stories
          </span>
          <h2 className="section-h2 mt-5" style={{ color: '#1a1a1a' }}>
            Voices from the Ground
          </h2>
        </motion.div>

        {/* Card */}
        <div
          className="premium-card-light relative overflow-hidden"
          style={{
            borderRadius: '18px',
            padding: 'clamp(28px, 5%, 48px)',
          }}
        >
          <Quote className="testimonial-quote-mark" aria-hidden="true" />

          <AnimatePresence mode="wait">
            <motion.div
              key={cur}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
              className="flex flex-col items-center text-center gap-8"
            >
              {/* Quote */}
          <p
                className="font-body text-lg md:text-xl leading-relaxed relative z-10 max-w-3xl"
                style={{ color: '#1a1a1a' }}
              >
                "{t.quote}"
              </p>

              {/* Avatar + name */}
              <div className="flex flex-col items-center gap-3">
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center font-sans font-extrabold text-white text-lg flex-shrink-0"
                  style={{ background: `linear-gradient(135deg, ${primary}, ${accent})` }}
                >
                  {initialsFromName(t.name)}
                </div>
                <div>
                  <div className="font-sans font-bold text-base" style={{ color: '#1a1a1a' }}>{t.name}</div>
                  <div className="font-body text-sm" style={{ color: '#697268' }}>{t.location}</div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Dots — gold when active */}
        <div className="flex justify-center gap-3 mt-8">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className="rounded-full transition-all duration-300"
              style={{
                width: i === cur ? 28 : 10,
                height: 10,
                background: i === cur ? accent : 'rgba(201,168,76,0.3)',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
              }}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
