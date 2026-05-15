const FALLBACK_IMAGES = {
  education: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1600&q=82',
  healthcare: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1600&q=82',
  women: 'https://images.unsplash.com/photo-1611702700098-dec597b27d9d?auto=format&fit=crop&w=1600&q=82',
  relief: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1600&q=82',
  environment: 'https://images.unsplash.com/photo-1595803227900-03e3b93f06e0?auto=format&fit=crop&w=1600&q=82',
  animal: 'https://images.unsplash.com/photo-1601758125946-6ec2ef64daf8?auto=format&fit=crop&w=1600&q=82',
  default: 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?auto=format&fit=crop&w=1600&q=82',
}

const CATEGORY_KEYWORDS = [
  {
    key: 'education',
    words: ['school', 'education', 'shiksha', 'child', 'children', 'student', 'learning', 'literacy', 'classroom'],
  },
  {
    key: 'healthcare',
    words: ['health', 'healthcare', 'medical', 'clinic', 'hospital', 'ayurveda', 'patient', 'doctor', 'blood', 'wellness', 'camp'],
  },
  {
    key: 'women',
    words: ['women', 'woman', 'girl', 'livelihood', 'skill', 'self help', 'self-help', 'empowerment', 'shg'],
  },
  {
    key: 'relief',
    words: ['food', 'hunger', 'relief', 'poverty', 'ration', 'poor', 'homeless', 'distribution', 'family support'],
  },
  {
    key: 'environment',
    words: ['environment', 'tree', 'nature', 'water', 'clean water', 'river', 'plantation', 'climate', 'sanitation'],
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
