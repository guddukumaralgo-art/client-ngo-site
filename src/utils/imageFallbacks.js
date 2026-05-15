const FALLBACK_IMAGES = {
  education: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=80',
  healthcare: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1200&q=80',
  women: 'https://images.unsplash.com/photo-1611702700098-dec597b27d9d?auto=format&fit=crop&w=1200&q=80',
  relief: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1200&q=80',
  environment: 'https://images.unsplash.com/photo-1595803227900-03e3b93f06e0?auto=format&fit=crop&w=1200&q=80',
  animal: 'https://images.unsplash.com/photo-1601758125946-6ec2ef64daf8?auto=format&fit=crop&w=1200&q=80',
  default: 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?auto=format&fit=crop&w=1200&q=80',
}

const CATEGORY_KEYWORDS = [
  {
    key: 'education',
    words: ['school', 'education', 'shiksha', 'child', 'children', 'student', 'learning', 'literacy'],
  },
  {
    key: 'healthcare',
    words: ['health', 'healthcare', 'medical', 'clinic', 'hospital', 'ayurveda', 'patient', 'doctor', 'blood', 'wellness'],
  },
  {
    key: 'women',
    words: ['women', 'woman', 'girl', 'livelihood', 'skill', 'self help', 'empowerment'],
  },
  {
    key: 'relief',
    words: ['food', 'hunger', 'relief', 'poverty', 'ration', 'poor', 'homeless'],
  },
  {
    key: 'environment',
    words: ['environment', 'tree', 'nature', 'water', 'clean water', 'river', 'plantation', 'climate'],
  },
  {
    key: 'animal',
    words: ['animal', 'dog', 'cow', 'rescue', 'shelter'],
  },
]

const textFrom = (source = {}) =>
  [
    source.ngo_name,
    source.ngoName,
    source.tagline,
    source.mission_text,
    source.missionText,
    source.program_1_category,
    source.program_1_title,
    source.program_1_description,
    source.category,
    source.title,
    source.desc,
    source.location,
  ]
    .filter(Boolean)
    .join(' ')
    .toLowerCase()

export const DEFAULT_CATEGORY_FALLBACK = FALLBACK_IMAGES.default

export const getCategoryFallbackImage = (source = {}) => {
  const haystack = textFrom(source)
  const match = CATEGORY_KEYWORDS.find(({ words }) =>
    words.some((word) => haystack.includes(word))
  )

  return FALLBACK_IMAGES[match?.key] || FALLBACK_IMAGES.default
}

export { FALLBACK_IMAGES }
