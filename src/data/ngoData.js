import { FALLBACK_IMAGE, IMAGES } from '../utils/images'
import { getCategoryFallbackImage } from '../utils/imageFallbacks'

const DEFAULT_COLORS = {
  primary: '#0a6847',
  secondary: '#064e32',
  accent: '#c9a84c',
}

const DEFAULT_SITE = {
  slug: 'hopeforward',
  ngoName: 'HopeForward',
  tagline: 'Transforming rural India through clean water, education, healthcare and women empowerment.',
  location: 'India',
  establishedYear: '2013',
  heroHeadline: 'Empowering Rural India,',
  heroHighlight: 'Changing Lives.',
  heroSubheadline: 'Delivering clean water, education, healthcare and women empowerment across 200+ villages in rural India.',
  missionText: 'Every child deserves clean water to drink, every family deserves access to healthcare, and every woman deserves the tools to build financial independence.',
  donationCta: 'Donate Now ₹',
  theme: DEFAULT_COLORS,
  images: {
    hero: IMAGES.hero,
    banner: IMAGES.hero,
    profile: FALLBACK_IMAGE,
    gallery: FALLBACK_IMAGE,
    about: IMAGES.about,
    donation: IMAGES.donation,
    newsletter: IMAGES.newsletter,
    logo: '',
    favicon: '',
    hasProfileImage: false,
    hasLogoImage: false,
    fallback: FALLBACK_IMAGE,
  },
  programs: [
    {
      title: 'Jal Jeevan — Water for Every Village',
      category: 'Clean Water',
      desc: 'Building bore wells, rain-water harvesting systems and water purification units across arid villages.',
      img: IMAGES.cleanWater,
    },
    {
      title: 'Shiksha — School for All',
      category: 'Education',
      desc: 'Bridging learning gaps with community schools, digital classrooms and mid-day meal programs.',
      img: IMAGES.education,
    },
    {
      title: 'Aarogya — Mobile Clinics',
      category: 'Healthcare',
      desc: 'Bringing doctors to doorsteps through solar-powered mobile health units visiting 20 villages weekly.',
      img: IMAGES.healthcare,
    },
    {
      title: 'Shakti — Women Skill Centers',
      category: 'Women Empowerment',
      desc: 'Vocational training, microfinance access and SHG formation for 4,200+ rural women.',
      img: IMAGES.womenEmpowerment,
    },
  ],
  impacts: [
    { number: '50000+', label: 'Lives Touched', subtext: 'Across 200+ villages' },
    { number: '200+', label: 'Villages Served', subtext: 'Four states covered' },
    { number: '12', label: 'Years of Impact', subtext: 'Founded in 2013' },
    { number: '5Cr+', label: '₹ Deployed', subtext: 'Ground program funding' },
  ],
  testimonials: [
    {
      quote: 'I completed the program and started my own small business. It changed how my family sees the future.',
      name: 'Priya Sharma',
      location: 'Lucknow, Uttar Pradesh',
    },
  ],
  team: [
    { name: 'Ananya Mehta', role: 'Founder & CEO', bio: 'Leads strategy, partnerships and long-term community impact.' },
    { name: 'Vikram Singh', role: 'Director of Operations', bio: 'Oversees field operations and local program delivery.' },
    { name: 'Priya Iyer', role: 'Head of Programs', bio: 'Designs community programs and impact measurement.' },
  ],
  contact: {
    email: 'info@hopeforward.in',
    phone: '+91 11 2345 6789',
    address: '42 Mahatma Gandhi Road, Connaught Place, New Delhi 110 001',
    donateLink: '#cause',
    contactLink: '#contact',
  },
  batch: 'batch 1',
  status: 'live',
}

const ICON_IMAGES = [IMAGES.cleanWater, IMAGES.education, IMAGES.healthcare, IMAGES.womenEmpowerment]

const MOJIBAKE_REPLACEMENTS = [
  [/‚Çπ/g, '₹'],
  [/â‚¹/g, '₹'],
  [/‚Ä¶/g, '...'],
  [/â€¦/g, '...'],
  [/‚Äô/g, "'"],
  [/â€™/g, "'"],
  [/‚Äú/g, '"'],
  [/‚Äù/g, '"'],
  [/â€œ/g, '"'],
  [/â€/g, '"'],
  [/â€“/g, '-'],
  [/â€”/g, '-'],
  [/Â/g, ''],
]

const fixEncoding = (value) =>
  MOJIBAKE_REPLACEMENTS.reduce(
    (text, [pattern, replacement]) => text.replace(pattern, replacement),
    String(value ?? '')
  )

const clean = (value, fallback = '') => {
  const text = fixEncoding(value).trim()
  return text || fallback
}

const cleanHeader = (value) => clean(value).replace(/^\uFEFF/, '')

const firstFilled = (...values) => values.map((value) => clean(value)).find(Boolean) || ''

const imageFrom = (values, fallback = FALLBACK_IMAGE) => firstFilled(...values) || fallback

const cleanDonationCta = (value) => {
  const raw = String(value ?? '')
  const fixed = clean(raw, DEFAULT_SITE.donationCta).replace(/\s+/g, ' ')

  if (/[âÇπ‚]/.test(fixed)) return 'Support This Cause'
  return fixed
}

const validColor = (value, fallback) => {
  const text = clean(value)
  return /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(text) ? text : fallback
}

const slugify = (value) =>
  clean(value, 'ngo-client')
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

export const initialsFromName = (name) =>
  clean(name, 'NGO')
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('') || 'NG'

export const splitMetric = (value) => {
  const raw = clean(value, '0')
  const match = raw.replace(/,/g, '').match(/^([^0-9]*)(\d+(?:\.\d+)?)(.*)$/)

  if (!match) return { value: 0, prefix: '', suffix: raw }

  return {
    value: Number(match[2]),
    prefix: clean(match[1]),
    suffix: clean(match[3]),
  }
}

export const parseCsv = (text) => {
  const rows = []
  let row = []
  let cell = ''
  let quoted = false

  for (let i = 0; i < text.length; i += 1) {
    const char = text[i]
    const next = text[i + 1]

    if (char === '"') {
      if (quoted && next === '"') {
        cell += '"'
        i += 1
      } else {
        quoted = !quoted
      }
    } else if (char === ',' && !quoted) {
      row.push(cell)
      cell = ''
    } else if ((char === '\n' || char === '\r') && !quoted) {
      if (char === '\r' && next === '\n') i += 1
      row.push(cell)
      if (row.some((item) => item.trim())) rows.push(row)
      row = []
      cell = ''
    } else {
      cell += char
    }
  }

  row.push(cell)
  if (row.some((item) => item.trim())) rows.push(row)

  const [headers = [], ...records] = rows
  return records.map((record) =>
    headers.reduce((entry, header, index) => {
      const key = cleanHeader(header)
      if (key) entry[key] = clean(record[index])
      return entry
    }, {})
  )
}

export const normalizeClient = (row, index = 0) => {
  const fallbackImage = getCategoryFallbackImage(row)
  const theme = {
    primary: validColor(row.primary_color, DEFAULT_COLORS.primary),
    secondary: validColor(row.secondary_color, DEFAULT_COLORS.secondary),
    accent: validColor(row.accent_color, DEFAULT_COLORS.accent),
  }

  const programs = [1, 2, 3, 4]
    .map((n, i) => {
      const programFallback = getCategoryFallbackImage({
        ...row,
        category: row[`program_${n}_category`],
        title: row[`program_${n}_title`],
        desc: row[`program_${n}_description`],
      })

      return {
        title: clean(row[`program_${n}_title`], DEFAULT_SITE.programs[i]?.title),
        category: clean(row[`program_${n}_category`], DEFAULT_SITE.programs[i]?.category),
        desc: clean(row[`program_${n}_description`], DEFAULT_SITE.programs[i]?.desc),
        img: clean(row[`program_${n}_image_url`], ICON_IMAGES[i] || programFallback),
        fallback: programFallback,
      }
    })
    .filter((program) => program.title && program.category)

  const impacts = [1, 2, 3, 4].map((n, i) => ({
    number: clean(row[`impact_${n}_number`], DEFAULT_SITE.impacts[i]?.number),
    label: clean(row[`impact_${n}_label`], DEFAULT_SITE.impacts[i]?.label),
    subtext: clean(row[`impact_${n}_subtext`], DEFAULT_SITE.impacts[i]?.subtext),
  }))

  const team = [1, 2, 3]
    .map((n, i) => ({
      name: clean(row[`team_${n}_name`], DEFAULT_SITE.team[i]?.name),
      role: clean(row[`team_${n}_role`], DEFAULT_SITE.team[i]?.role),
      bio: clean(row[`team_${n}_bio`], DEFAULT_SITE.team[i]?.bio),
    }))
    .filter((member) => member.name && member.role)

  const ngoName = clean(row.ngo_name, DEFAULT_SITE.ngoName)
  const hasProfileImage = Boolean(clean(row.client_profile_image_url))
  const hasLogoImage = Boolean(clean(row.logo_url))
  const profileImage = imageFrom(
    [row.client_profile_image_url, row.logo_url, row.hero_image_url],
    fallbackImage
  )
  const bannerImage = imageFrom(
    [row.client_banner_image_url, row.hero_image_url, row.program_1_image_url],
    fallbackImage
  )
  const galleryImage = imageFrom(
    [row.client_banner_image_url, row.client_profile_image_url, row.hero_image_url, row.program_1_image_url],
    fallbackImage
  )
  const aboutImage = imageFrom(
    [row.client_banner_image_url, row.hero_image_url, row.program_1_image_url],
    fallbackImage
  )

  return {
    slug: slugify(row.slug || ngoName || `client-${index + 1}`),
    ngoName,
    tagline: clean(row.tagline, DEFAULT_SITE.tagline),
    location: clean(row.location, DEFAULT_SITE.location),
    establishedYear: clean(row.established_year, DEFAULT_SITE.establishedYear),
    heroHeadline: clean(row.hero_headline, DEFAULT_SITE.heroHeadline),
    heroHighlight: clean(row.hero_highlight, DEFAULT_SITE.heroHighlight),
    heroSubheadline: clean(row.hero_subheadline, DEFAULT_SITE.heroSubheadline),
    missionText: clean(row.mission_text, DEFAULT_SITE.missionText),
    donationCta: cleanDonationCta(row.donation_cta),
    theme,
    images: {
      hero: bannerImage,
      banner: bannerImage,
      profile: profileImage,
      gallery: galleryImage,
      about: aboutImage,
      donation: imageFrom([row.program_1_image_url, row.client_banner_image_url, row.hero_image_url], fallbackImage),
      newsletter: bannerImage,
      logo: firstFilled(row.client_profile_image_url, row.logo_url, row.hero_image_url),
      favicon: firstFilled(row.client_profile_image_url, row.logo_url),
      hasProfileImage,
      hasLogoImage,
      fallback: fallbackImage,
    },
    programs: programs.length ? programs : DEFAULT_SITE.programs,
    impacts,
    testimonials: [
      {
        quote: clean(row.testimonial_quote, DEFAULT_SITE.testimonials[0].quote),
        name: clean(row.testimonial_name, DEFAULT_SITE.testimonials[0].name),
        location: clean(row.testimonial_location, DEFAULT_SITE.testimonials[0].location),
      },
    ],
    team: team.length ? team : DEFAULT_SITE.team,
    contact: {
      email: clean(row.email, DEFAULT_SITE.contact.email),
      phone: clean(row.phone, DEFAULT_SITE.contact.phone),
      address: clean(row.address, DEFAULT_SITE.contact.address),
      donateLink: clean(row.donate_link, DEFAULT_SITE.contact.donateLink),
      contactLink: clean(row.contact_link, DEFAULT_SITE.contact.contactLink),
    },
    batch: clean(row.batch, 'batch 1'),
    status: clean(row.status, 'draft').toLowerCase(),
  }
}

export const visibleSites = (sites) =>
  sites.filter((site) => ['live', 'ready'].includes(site.status))

export const loadNgoClients = async () => {
  try {
    const response = await fetch(`${import.meta.env?.BASE_URL || '/'}data/ngo_clients.csv`, { cache: 'no-store' })
    if (!response.ok) throw new Error(`CSV request failed: ${response.status}`)
    const rows = parseCsv(await response.text())
    const sites = visibleSites(rows.map(normalizeClient))
    return sites.length ? sites : [DEFAULT_SITE]
  } catch (error) {
    console.warn('Using fallback NGO data.', error)
    return [DEFAULT_SITE]
  }
}

export { DEFAULT_SITE }
