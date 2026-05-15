import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send } from 'lucide-react'
import { IMAGES, imgFallback } from '../utils/images'

export default function Newsletter({ site }) {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const accent = site?.theme?.accent || '#c9a84c'

  const handleSubmit = (e) => {
    e.preventDefault()
    if (email) setSent(true)
  }

  return (
    <section id="contact" className="relative section-block section-block--tight overflow-hidden">
      {/* BG */}
      <img
        src={site?.images?.newsletter || IMAGES.newsletter}
        alt={`${site?.ngoName || 'NGO'} community updates`}
        data-fallback-src={site?.images?.fallback}
        onError={imgFallback}
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0" style={{ background: 'rgba(6,13,9,0.88)' }} />

      <div className="relative z-10 section-container text-center" style={{ maxWidth: '980px' }}>
        <div>
          <span
            className="section-label"
            style={{ color: accent, background: 'rgba(201,168,76,0.1)', border: '1px solid rgba(201,168,76,0.25)' }}
          >
            Stay Connected
          </span>
          <h2 className="section-h2 mt-5 text-white">
            Join {site?.ngoName || 'Our'} Supporters
          </h2>
          <p className="section-copy font-body text-white/55 mt-4 mb-10">
            Get impact reports, field stories and campaign updates from {site?.location || 'our communities'} straight to your inbox.
          </p>

          {sent ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="font-sans font-bold text-[#0a0f0d] inline-block"
              style={{ background: accent, borderRadius: '12px', padding: '16px 32px' }}
            >
              ✓ Thank you — you're on the list!
            </motion.div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="premium-card newsletter-form"
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '16px',
                justifyContent: 'center',
                alignItems: 'center',
                maxWidth: '760px',
                margin: '0 auto',
                padding: '16px',
                borderRadius: '20px',
              }}
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                required
                className="font-body"
                style={{
                  background: '#ffffff',
                  borderRadius: '14px',
                  padding: '16px 20px',
                  flex: '1 1 280px',
                  minWidth: 0,
                  color: '#1a1a1a',
                  border: '2px solid transparent',
                  fontSize: '15px',
                  outline: 'none',
                  transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
                }}
              />
              <button
                type="submit"
                className="premium-button premium-button--gold"
              >
                <span>Subscribe</span>
                <Send size={15} />
              </button>
            </form>
          )}

          <p className="font-body text-xs mt-6 mb-2" style={{ color: 'rgba(255,255,255,0.35)' }}>
            We respect your privacy. Unsubscribe anytime. No spam, ever.
          </p>
        </div>
      </div>
    </section>
  )
}
