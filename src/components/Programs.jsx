import { motion } from 'framer-motion'
import { imgFallback } from '../utils/images'

function ProgramCard({ prog, large = false, delay = 0, accent = '#c9a84c' }) {
  return (
    <motion.div
      className="relative overflow-hidden group cursor-pointer"
      style={{
        minHeight: large ? '500px' : '270px',
        height: '100%',
        borderRadius: '14px',
        boxShadow: '0 18px 48px rgba(0,0,0,0.32)',
        transition: 'box-shadow 0.3s ease',
      }}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ delay, duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
      whileHover={{ scale: 1.03, transition: { duration: 0.3 } }}
      onMouseEnter={(e) => (e.currentTarget.style.boxShadow = '0 20px 60px rgba(0,0,0,0.5)')}
      onMouseLeave={(e) => (e.currentTarget.style.boxShadow = '0 4px 24px rgba(0,0,0,0.3)')}
    >
      {/* Image */}
      <img
        src={prog.img}
        alt={prog.title}
        data-fallback-src={prog.fallback}
        onError={imgFallback}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.08]"
      />
      {/* Gradient overlay — transparent to dark */}
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.56) 46%, rgba(0,0,0,0.18) 76%, transparent 100%)' }}
      />
      {/* Content */}
      <div className="program-card-content absolute bottom-0 left-0 right-0 z-10">
        <span
          className="inline-block max-w-full text-xs font-bold font-sans uppercase px-3 py-1 rounded-full mb-3"
          style={{ background: 'rgba(201,168,76,0.2)', color: accent, border: '1px solid rgba(201,168,76,0.3)' }}
        >
          {prog.category}
        </span>
        <h3
          className="font-sans font-bold text-white leading-snug mb-2"
          style={{ fontSize: large ? '1.5rem' : '1.05rem' }}
        >
          {prog.title}
        </h3>
        {large && (
          <p className="font-body text-white/65 text-sm leading-relaxed max-w-2xl">{prog.desc}</p>
        )}
      </div>
    </motion.div>
  )
}

export default function Programs({ site }) {
  const programs = site?.programs || []
  const accent = site?.theme?.accent || '#c9a84c'
  const [large, ...rest] = programs
  const stacked = rest.slice(0, 2)
  const bottom = rest.slice(2)

  return (
    <section id="programs" className="section-block section-dark">
      <div className="section-container">
        {/* Header */}
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
            Our Programs
          </span>
          <h2 className="section-h2 mt-5 text-white">
            Programs Built for Lasting Change
          </h2>
          <p className="section-copy font-body text-white/50 mt-4">
            Integrated initiatives shaped around {site?.ngoName || 'our'} mission in {site?.location || 'India'}.
          </p>
        </motion.div>

        {/* Bento top row: large + 2 stacked */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.65fr_1fr] gap-6 mb-6">
          {large && <ProgramCard prog={large} large delay={0} accent={accent} />}
          <div className="flex flex-col gap-6">
            {stacked.map((program, index) => (
              <ProgramCard key={program.title} prog={program} delay={0.1 + index * 0.1} accent={accent} />
            ))}
          </div>
        </div>

        {/* Bento bottom row: 3 equal */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {bottom.map((p, i) => (
            <ProgramCard key={p.title} prog={p} delay={0.1 * (i + 1)} accent={accent} />
          ))}
        </div>
      </div>
    </section>
  )
}
