export const isExternalLink = (href = '') => /^https?:|^mailto:|^tel:/i.test(href)

export const scrollToId = (id) => {
  const target = document.getElementById(id)
  if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export const internalScrollProps = (href = '#', fallbackId = 'cause') => {
  if (isExternalLink(href)) return { href }

  return {
    href: '#',
    onClick: (event) => {
      event.preventDefault()
      scrollToId(href.replace(/^#/, '') || fallbackId)
    },
  }
}
