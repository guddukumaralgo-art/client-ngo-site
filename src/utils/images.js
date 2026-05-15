const BASE_URL = import.meta.env?.BASE_URL || '/'

export const FALLBACK_IMAGE = `${BASE_URL}fallback-ngo.svg`
export const FALLBACK_BANNER = `${BASE_URL}fallback-banner.svg`

export const IMAGES = {
  hero: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=1920&q=80',
  about: 'https://images.unsplash.com/photo-1532375810709-75b1da00537c?auto=format&fit=crop&w=800&q=80',
  cleanWater: 'https://images.unsplash.com/photo-1551731409-43eb3e517a1a?auto=format&fit=crop&w=600&q=80',
  education: 'https://images.unsplash.com/photo-1594608661623-aa0bd3a69799?auto=format&fit=crop&w=600&q=80',
  healthcare: 'https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?auto=format&fit=crop&w=600&q=80',
  womenEmpowerment: 'https://images.unsplash.com/photo-1611702700098-dec597b27d9d?auto=format&fit=crop&w=600&q=80',
  childWelfare: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=600&q=80',
  ruralDevelopment: 'https://images.unsplash.com/photo-1595803227900-03e3b93f06e0?auto=format&fit=crop&w=600&q=80',
  donation: 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?auto=format&fit=crop&w=1920&q=80',
  newsletter: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1920&q=80',
}

export const imgFallback = (e) => {
  const fallback = e.currentTarget.dataset.fallbackSrc || FALLBACK_IMAGE
  if (e.currentTarget.src !== fallback) e.currentTarget.src = fallback
}
