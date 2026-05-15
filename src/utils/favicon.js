const DEFAULT_FAVICON_HREF = `${import.meta.env?.BASE_URL || '/'}favicon.svg`

let faviconRequestId = 0

const getIconLink = () => {
  const links = Array.from(document.querySelectorAll('link[rel~="icon"]'))
  const link = links[0] || document.createElement('link')

  link.rel = 'icon'
  if (!link.parentNode) document.head.appendChild(link)
  links.slice(1).forEach((extraLink) => extraLink.remove())

  return link
}

export const setFavicon = (href = DEFAULT_FAVICON_HREF) => {
  const nextHref = href || DEFAULT_FAVICON_HREF
  const link = getIconLink()

  link.href = nextHref
  if (nextHref === DEFAULT_FAVICON_HREF || nextHref.endsWith('.svg')) {
    link.type = 'image/svg+xml'
  } else {
    link.removeAttribute('type')
  }
}

export const setDynamicFavicon = (href) => {
  const nextHref = href || DEFAULT_FAVICON_HREF
  const requestId = ++faviconRequestId

  setFavicon(nextHref)

  if (nextHref === DEFAULT_FAVICON_HREF) return

  const img = new Image()
  img.onload = () => {
    if (requestId === faviconRequestId) setFavicon(nextHref)
  }
  img.onerror = () => {
    if (requestId === faviconRequestId) setFavicon(DEFAULT_FAVICON_HREF)
  }
  img.src = nextHref
}

export { DEFAULT_FAVICON_HREF }
