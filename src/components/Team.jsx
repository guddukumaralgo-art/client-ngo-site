import { motion } from 'framer-motion'
import { initialsFromName } from '../data/ngoData'
import { imgFallback } from '../utils/images'

export default function Team({ site }) {
  const team = site?.team || []
  const colors = [site?.theme?.primary || '#0a6847', site?.theme?.accent || '#c9a84c', site?.theme?.secondary || '#125e3c']

  return (
    <section id="team" className="section-block section-dark">
      <div className="section-container">
        {/* Header */}
        <motion.div
          className="text-center mb-16 md:mb-20"
        >
          <span
            className="section-label"
            style={{ color: '#c9a84c', background: 'rgba(201,168,76,0.1)', border: '1px solid rgba(201,168,76,0.25)' }}
          >
            Our Leadership
          </span>
          <h2 className="section-h2 mt-5 text-white">
            Meet the Team
          </h2>
          <p className="section-copy font-body text-white/50 mt-4">
            The people guiding {site?.ngoName || 'this NGO'} from strategy to field delivery.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {team.map(({ name, role, bio }, index) => {
            const color = colors[index % colors.length]
            const useProfileImage = index === 0 && site?.images?.hasProfileImage
            return (
              <motion.div
              key={name}
              className="premium-card-light equal-card group flex min-h-[315px] flex-col items-center text-center cursor-pointer"
              style={{
                borderRadius: '16px',
                padding: '36px 26px',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 20px 60px rgba(0,0,0,0.25)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = '0 22px 70px rgba(24, 28, 24, 0.12)'
              }}
            >
              {/* Avatar */}
              <div
                className="team-avatar icon-box w-20 h-20 rounded-full font-sans font-extrabold text-white text-2xl mb-6"
                style={{
                  background: `linear-gradient(135deg, ${color}, ${color}aa)`,
                  border: '3px solid transparent',
                  transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
                  boxSizing: 'border-box',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#c9a84c'
                  e.currentTarget.style.boxShadow = `0 0 0 4px rgba(201,168,76,0.2)`
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'transparent'
                  e.currentTarget.style.boxShadow = 'none'
                }}
              >
                {useProfileImage ? (
                  <img
                    src={site.images.profile}
                    alt={`${name} profile`}
                    data-fallback-src={site.images.fallback}
                    onError={imgFallback}
                    loading="lazy"
                    decoding="async"
                  />
                ) : (
                  initialsFromName(name)
                )}
              </div>

              <div
                className="font-sans font-bold text-base mb-1"
                style={{ color: '#1a1a1a' }}
              >
                {name}
              </div>
              <div
                className="font-body text-xs font-medium mb-4 px-3 py-1 rounded-full"
                style={{ color: color, background: `${color}18` }}
              >
                {role}
              </div>
              <p className="font-body text-xs leading-relaxed" style={{ color: '#697268' }}>
                {bio}
              </p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
