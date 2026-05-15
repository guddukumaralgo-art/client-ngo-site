import { useEffect, useMemo, useState } from 'react'
import { ArrowRight, BadgeCheck, Database, Layers, MapPin, Smartphone, Sparkles } from 'lucide-react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import About from './components/About'
import ImpactStats from './components/ImpactStats'
import Programs from './components/Programs'
import Cause from './components/Cause'
import Testimonials from './components/Testimonials'
import Team from './components/Team'
import Partners from './components/Partners'
import Newsletter from './components/Newsletter'
import Footer from './components/Footer'
import FloatingDonate from './components/FloatingDonate'
import { DEFAULT_SITE, loadNgoClients } from './data/ngoData'
import { imgFallback } from './utils/images'
import { DEFAULT_FAVICON_HREF, setDynamicFavicon } from './utils/favicon'

const getRouteSlug = () => window.location.hash.replace(/^#\/?/, '').split('?')[0].trim()

function Gallery({ sites }) {
  const conceptCount = Math.max(sites.length, 170)
  const galleryStats = [
    { value: `${conceptCount}+`, label: 'NGO Concepts', icon: Layers },
    { value: 'CSV', label: 'Generated', icon: Database },
    { value: 'Mobile', label: 'Ready', icon: Smartphone },
    { value: 'Premium', label: 'Landing Pages', icon: Sparkles },
  ]

  return (
    <main className="gallery-page">
      <section className="section-container gallery-shell">
        <div className="gallery-hero">
          <div className="gallery-kicker">
            <BadgeCheck size={16} />
            <span>Premium NGO Website Portfolio</span>
          </div>
          <div className="gallery-hero-grid">
            <div>
              <h1 className="gallery-title">
                Premium NGO websites shaped for trust, emotion, and action.
              </h1>
              <p className="gallery-copy">
                A curated showcase of donor-ready NGO landing pages with cinematic imagery,
                confident storytelling, and polished mobile-first presentation.
              </p>
            </div>
            <div className="gallery-summary" aria-label={`${sites.length} ready/live websites`}>
              <strong>{sites.length}</strong>
              <span>ready and live websites</span>
            </div>
          </div>

          <div className="gallery-stats-strip" aria-label="Gallery highlights">
            {galleryStats.map(({ value, label, icon: Icon }) => (
              <div className="gallery-stat-pill" key={label}>
                <Icon size={17} />
                <span>
                  <strong>{value}</strong>
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="gallery-grid">
          {sites.map((site, index) => {
            const statusLabel = site.status === 'live' ? 'Live' : 'Ready'

            return (
              <a
                key={site.slug}
                href={`#/${site.slug}`}
                className="premium-card gallery-card"
                style={{ '--card-accent': site.theme.accent, '--card-primary': site.theme.primary }}
              >
                <div className="gallery-card-media">
                  <img
                    src={site.images.gallery}
                    alt={`${site.ngoName} preview`}
                    data-fallback-src={site.images.fallback}
                    onError={imgFallback}
                    loading={index < 6 ? 'eager' : 'lazy'}
                    decoding="async"
                  />
                  <div />
                  <span className="gallery-status">{statusLabel}</span>
                  <span className="gallery-card-logo" aria-hidden="true">
                    <img
                      src={site.images.profile}
                      alt=""
                      data-fallback-src={site.images.fallback}
                      onError={imgFallback}
                      loading="lazy"
                      decoding="async"
                    />
                  </span>
                </div>

                <div className="gallery-card-body">
                  <div className="gallery-card-meta">
                    <span>{site.batch}</span>
                    <span>Concept {String(index + 1).padStart(2, '0')}</span>
                  </div>
                  <h2>{site.ngoName}</h2>
                  <p>{site.tagline}</p>
                  <div className="gallery-location">
                    <MapPin size={15} />
                    <span>{site.location}</span>
                  </div>
                  <div className="premium-button premium-button--gold gallery-button">
                    <span>View Website</span>
                    <ArrowRight size={16} />
                  </div>
                </div>
              </a>
            )
          })}
        </div>
      </section>
    </main>
  )
}

function NgoWebsite({ site }) {
  const vars = {
    '--site-primary': site.theme.primary,
    '--site-secondary': site.theme.secondary,
    '--site-accent': site.theme.accent,
  }

  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [site.slug])

  return (
    <div className="site-template" style={vars}>
      <Navbar site={site} />
      <main>
        <Hero site={site} />
        <Marquee site={site} />
        <About site={site} />
        <ImpactStats site={site} />
        <Programs site={site} />
        <Cause site={site} />
        <Testimonials site={site} />
        <Team site={site} />
        <Partners site={site} />
        <Newsletter site={site} />
      </main>
      <Footer site={site} />
      <FloatingDonate site={site} />
    </div>
  )
}

export default function App() {
  const [sites, setSites] = useState([DEFAULT_SITE])
  const [loading, setLoading] = useState(true)
  const [routeSlug, setRouteSlug] = useState(getRouteSlug)

  useEffect(() => {
    let mounted = true
    loadNgoClients().then((loadedSites) => {
      if (!mounted) return
      setSites(loadedSites)
      setLoading(false)
    })
    return () => {
      mounted = false
    }
  }, [])

  useEffect(() => {
    const onHashChange = () => setRouteSlug(getRouteSlug())
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  const selectedSite = useMemo(
    () => sites.find((site) => site.slug === routeSlug),
    [routeSlug, sites]
  )

  useEffect(() => {
    const activeSite = routeSlug && selectedSite ? selectedSite : null
    setDynamicFavicon(activeSite?.images?.favicon || DEFAULT_FAVICON_HREF)
    document.title = activeSite
      ? `${activeSite.ngoName} | NGO Website`
      : 'NGO Website Batch Gallery'
  }, [routeSlug, selectedSite])

  if (loading) {
    return (
      <main className="gallery-page">
        <section className="section-container gallery-shell gallery-loading">
          <span className="section-label gallery-label">Preparing Gallery</span>
          <h1 className="gallery-title">Opening the NGO portfolio...</h1>
        </section>
      </main>
    )
  }

  if (routeSlug && selectedSite) return <NgoWebsite key={selectedSite.slug} site={selectedSite} />

  return (
    <Gallery sites={sites} />
  )
}
