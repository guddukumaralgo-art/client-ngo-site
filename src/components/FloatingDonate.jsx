import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HeartHandshake } from 'lucide-react'
import { internalScrollProps } from '../utils/links'

export default function FloatingDonate({ site }) {
  const [visible, setVisible] = useState(false)
  const donateProps = internalScrollProps(site?.contact?.donateLink, 'cause')

  useEffect(() => {
    const onScroll = () => {
      const footer = document.querySelector('footer')
      const footerTop = footer?.getBoundingClientRect().top ?? Number.POSITIVE_INFINITY
      const clearOfFooter = footerTop > window.innerHeight

      setVisible(window.scrollY > 400 && clearOfFooter)
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          {...donateProps}
          className="floating-donate donate-glow premium-button premium-button--gold"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
          whileHover={{ scale: 1.06 }}
        >
          <HeartHandshake size={16} className="relative z-10" />
          <span className="relative z-10">Support This Cause</span>
        </motion.a>
      )}
    </AnimatePresence>
  )
}
