import { useEffect, useMemo, useState } from 'react'
import { ArrowRight, MapPin } from 'lucide-react'
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
  return (
    <main className="gallery-page">
      <section className="section-container gallery-shell">
        <div className="gallery-hero">
          <h1 className="gallery-title">NGO Website Batch Gallery</h1>
          <div className="gallery-summary" aria-label={`${sites.length} ready/live websites`}>
            <strong>{sites.length}</strong>
            <span>ready/live websites</span>
          </div>
        </div>

        <div className="gallery-grid">
          {sites.map((site, index) => (
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
                />
                <div />
                <span>{site.status}</span>
              </div>

              <div className="gallery-card-body">
                <div className="gallery-card-meta">
                  <span>{site.batch}</span>
                  <span>Site {String(index + 1).padStart(2, '0')}</span>
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
          ))}
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
          <span className="section-label gallery-label">Loading CSV</span>
          <h1 className="gallery-title">Preparing NGO websites...</h1>
        </section>
      </main>
    )
  }

  if (routeSlug && selectedSite) return <NgoWebsite key={selectedSite.slug} site={selectedSite} />

  return (
    <Gallery sites={sites} />
  )
}
