import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { internalScrollProps, scrollToId } from '../utils/links'

const links = ['Home', 'About', 'Programs', 'Impact', 'Team', 'Contact']

const splitBrand = (name = 'HopeForward') => {
  const spaced = name.replace(/([a-z])([A-Z])/g, '$1 $2')
  const parts = spaced.split(/\s+/)
  return {
    first: parts[0] || name,
    rest: parts.slice(1).join(' '),
  }
}

export default function Navbar({ site }) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const brand = splitBrand(site?.ngoName)
  const accent = site?.theme?.accent || '#c9a84c'
  const donateProps = internalScrollProps(site?.contact?.donateLink, 'cause')

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <motion.header
        className="site-header"
        animate={{ y: 0 }}
        transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
      >
        <nav
          className={`site-nav transition-all duration-500 ${scrolled ? 'site-nav--scrolled' : ''}`}
        >
          {/* Logo */}
          <a
            href="#"
            className="flex min-w-0 items-center gap-1 font-sans font-bold text-xl leading-none select-none"
            onClick={(event) => {
              event.preventDefault()
              scrollToId('home')
            }}
          >
            {site?.images?.logo ? (
              <img src={site.images.logo} alt={site.ngoName} className="h-8 max-w-[180px] object-contain" />
            ) : (
              <>
                <span className="text-white">{brand.first}</span>
                <span style={{ color: accent }}>{brand.rest}</span>
              </>
            )}
          </a>

          {/* Desktop links */}
          <ul className="site-nav-links hidden md:flex">
            {links.map((l) => (
              <li key={l}>
                <a
                  href="#"
                  onClick={(event) => {
                    event.preventDefault()
                    scrollToId(l.toLowerCase())
                  }}
                  className="text-white/80 hover:text-white text-sm font-medium transition-colors duration-200 font-body"
                >
                  {l}
                </a>
              </li>
            ))}
          </ul>

          {/* Donate button */}
          <a
            {...donateProps}
            className="nav-donate premium-button premium-button--gold premium-button--small"
          >
            <span>{site?.donationCta?.replace(/\s*₹$/, '') || 'Donate Now'}</span>
          </a>

          {/* Hamburger */}
          <button
            className="md:hidden text-white p-2 flex items-center justify-center"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={24} />
          </button>
        </nav>
      </motion.header>

      {/* Mobile overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[100] flex flex-col"
            style={{ background: 'rgba(6,13,9,0.97)', backdropFilter: 'blur(24px)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex justify-end p-6">
              <button className="text-white" onClick={() => setOpen(false)} aria-label="Close menu">
                <X size={28} />
              </button>
            </div>
            <div className="flex flex-col items-center justify-center flex-1 gap-8 px-6">
              {links.map((l, i) => (
                <motion.a
                  key={l}
                  href="#"
                  className="text-white text-3xl sm:text-4xl font-sans font-bold hover:text-[#c9a84c] transition-colors"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07 }}
                  onClick={(event) => {
                    event.preventDefault()
                    setOpen(false)
                    setTimeout(() => scrollToId(l.toLowerCase()), 80)
                  }}
                >
                  {l}
                </motion.a>
              ))}
              <motion.a
                {...donateProps}
                className="premium-button premium-button--gold mt-3 max-w-xs"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: links.length * 0.07 }}
                onClick={(event) => {
                  donateProps.onClick?.(event)
                  setOpen(false)
                }}
              >
                {site?.donationCta || 'Donate Now ₹'}
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
