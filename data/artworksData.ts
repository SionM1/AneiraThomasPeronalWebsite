export interface Artwork {
  slug: string
  title: string
  medium: string
  size: string
  description: string
  imagePath: string
  year?: number
  price?: string
  available?: boolean
  dateAdded?: string // Add this field to track when artwork was added
}

export const artworksData: Artwork[] = [
  {
    slug: 'orange-peel',
    title: 'Orange Peel',
    medium: 'Distemper and oil paint on canvas',
    size: '51x66cm',
    description: 'A vibrant exploration of warm orange tones and natural textures.',
    imagePath: '/static/images/Website%20gallery/Orange%20peel.jpeg',
    year: 2023,
    available: true,
    dateAdded: '2023-01-01',
  },
  {
    slug: 'lemon-drop',
    title: 'Lemon Drop',
    medium: 'Distemper and oil paint on canvas',
    size: '40.5x66cm',
    description: 'Bright citrus-inspired artwork with luminous yellow hues.',
    imagePath: '/static/images/Website%20gallery/Lemon%20drop.jpeg',
    year: 2023,
    available: false,
    dateAdded: '2023-01-02',
  },
  {
    slug: 'pollarding-purple',
    title: 'Pollarding Purple',
    medium: 'Distemper and oil paint on canvas',
    size: '51x91.5cm',
    description: 'Rich purple tones depicting the ancient practice of tree pollarding.',
    imagePath: '/static/images/Website%20gallery/Pollarding%20purple.jpeg',
    year: 2024,
    available: false,
    dateAdded: '2024-01-01',
  },
  {
    slug: 'autumn-reflections',
    title: 'Autumn Reflections',
    medium: 'Distemper and oil paint on canvas',
    size: '51x91.5cm',
    description: 'Capturing the golden warmth and reflective beauty of autumn.',
    imagePath: '/static/images/Website%20gallery/Autumn%20reflections.jpeg',
    year: 2024,
    available: false,
    dateAdded: '2024-01-02',
  },
  {
    slug: 'crud-yr-awel',
    title: 'Crud yr Awel',
    medium: 'Distemper and oil paint on canvas',
    size: '38x127cm',
    description: 'Welsh-titled piece exploring wind patterns and movement.',
    imagePath: '/static/images/Website%20gallery/Crud%20yr%20Awel.jpeg',
    year: 2024,
    available: false,
    dateAdded: '2024-01-03',
  },
  {
    slug: 'twisted-twigs',
    title: 'Twisted Twigs',
    medium: 'Distemper and oil paint on canvas',
    size: '38x127cm',
    description: 'Intricate study of natural forms and organic curves.',
    imagePath: '/static/images/Website%20gallery/Twisted%20twigs.jpeg',
    year: 2024,
    available: false,
    dateAdded: '2024-01-04',
  },
  {
    slug: 'sycamore',
    title: 'Sycamore',
    medium: 'Distemper and oil paint on canvas',
    size: '38x127cm',
    description: 'Majestic portrayal of the iconic sycamore tree.',
    imagePath: '/static/images/Website%20gallery/Sycamore%20.jpeg',
    year: 2024,
    available: false,
    dateAdded: '2024-01-05',
  },
  {
    slug: 'tentacle-34818',
    title: 'Tentacle 34818',
    medium: 'Distemper and oil paint on canvas',
    size: '38x127cm',
    description: 'Abstract exploration of flowing, tentacle-like forms.',
    imagePath: '/static/images/Website%20gallery/Tentacle%2034818.jpeg',
    year: 2024,
    available: false,
    dateAdded: '2024-01-06',
  },
  {
    slug: 'tulip-orbs',
    title: 'Tulip Orbs',
    medium: 'Distemper and oil paint on canvas',
    size: '63.5x165cm',
    description: 'Large-scale piece featuring spherical floral forms.',
    imagePath: '/static/images/Website%20gallery/Tulip%20orbs.jpeg',
    year: 2024,
    available: true,
    dateAdded: '2024-01-07',
  },
  {
    slug: 'duckie',
    title: 'Duckie',
    medium: 'Distemper and oil paint on canvas',
    size: '30.5x91.5cm',
    description: 'Playful interpretation of waterfowl in natural habitat.',
    imagePath: '/static/images/Website%20gallery/Duckie.jpeg',
    year: 2024,
    available: false,
    dateAdded: '2024-01-08',
  },
  {
    slug: 'taff-trail-i',
    title: 'Taff Trail I',
    medium: 'Distemper and oil paint on canvas',
    size: '30x60cm',
    description: 'First in a series depicting the famous Welsh walking trail.',
    imagePath: '/static/images/Website%20gallery/Taff%20Trail%20I.jpeg',
    year: 2025,
    available: false,
    dateAdded: '2025-01-01',
  },
  {
    slug: 'taff-trail-ii',
    title: 'Taff Trail II',
    medium: 'Distemper and oil paint on canvas',
    size: '30x60cm',
    description: 'Second piece in the Taff Trail series, continuing the journey.',
    imagePath: '/static/images/Website%20gallery/Taff%20Trail%20II.jpeg',
    year: 2025,
    available: true,
    dateAdded: '2025-01-02',
  },
  {
    slug: 'mapping-the-changing-colours',
    title: 'Mapping the changing colours',
    medium: 'Distemper and oil paint on canvas',
    size: '45x75cm',
    description: 'Dynamic exploration of color transitions and seasonal change.',
    imagePath: '/static/images/Website%20gallery/Mapping%20the%20changing%20colours.jpeg',
    year: 2025,
    available: false,
    dateAdded: '2025-01-03',
  },
  {
    slug: 'rabbit-ears',
    title: 'Rabbit Ears',
    medium: 'Distemper and oil paint on canvas',
    size: '45x75cm',
    description: 'Whimsical piece inspired by natural forms and wildlife.',
    imagePath: '/static/images/Website%20gallery/Rabbit%20Ears.jpeg',
    year: 2025,
    available: true,
    dateAdded: '2025-01-04',
  },
  {
    slug: 'cynffon-y-tan',
    title: 'Cynffon y tân',
    medium: 'Distemper and oil paint on canvas',
    size: '45x75cm',
    description: 'Welsh-titled work exploring fiery tail-like forms.',
    imagePath: '/static/images/Website%20gallery/Cynffonytan.jpeg',
    year: 2025,
    available: true,
    dateAdded: '2025-01-05',
  },
  {
    slug: 'yn-y-cysgodion',
    title: 'Yn y cysgodion',
    medium: 'Distemper and oil paint on canvas',
    size: '45x75cm',
    description: 'Welsh piece meaning "in the shadows" - exploring light and darkness.',
    imagePath: '/static/images/Website%20gallery/Yn%20y%20cysgodion.jpeg',
    year: 2025,
    available: true,
    dateAdded: '2025-01-06',
  },
  {
    slug: 'elfed',
    title: 'Elfed',
    medium: 'Distemper and oil paint on canvas',
    size: '100x100cm',
    description: 'Large square canvas exploring mystical Welsh themes.',
    imagePath: '/static/images/Website%20gallery/Elfed.jpeg',
    year: 2025,
    available: true,
    dateAdded: '2025-01-07',
  },
  {
    slug: 'cassis-iii',
    title: 'Cassis III',
    medium: 'Mixed media on canvas',
    size: '30x40cm',
    description: 'Third in the Cassis series, combining various artistic media.',
    imagePath: '/static/images/Website%20gallery/Cassis%20III.jpeg',
    year: 2025,
    available: true,
    dateAdded: '2025-01-08',
  },
  {
    slug: 'cassis-ii',
    title: 'Cassis II',
    medium: 'Mixed media on canvas',
    size: '30x40cm',
    description: 'Second piece in the Cassis collection using mixed media techniques.',
    imagePath: '/static/images/Website%20gallery/Cassis%20II.jpeg',
    year: 2025,
    available: true,
    dateAdded: '2025-01-09',
  },
  {
    slug: 'cassis-vii',
    title: 'Cassis VII',
    medium: 'Mixed media on canvas',
    size: '30x40cm',
    description: 'Seventh piece in the ongoing Cassis series.',
    imagePath: '/static/images/Website%20gallery/Cassis%20VII.jpeg',
    year: 2025,
    available: true,
    dateAdded: '2025-01-10',
  },
  {
    slug: 'cassis-vi',
    title: 'Cassis VI',
    medium: 'Mixed media on canvas',
    size: '30x40cm',
    description: 'Sixth artwork in the mixed media Cassis collection.',
    imagePath: '/static/images/Website%20gallery/Cassis%20VI.jpeg',
    year: 2025,
    available: true,
    dateAdded: '2025-01-11',
  },
  {
    slug: 'fleeting-iii',
    title: 'Fleeting III',
    medium: 'Oil and chalk pastel on greyboard',
    size: '102x76cm',
    description: 'Third in the Fleeting series, capturing ephemeral moments.',
    imagePath: '/static/images/Website%20gallery/Fleeting%20III.jpeg',
    year: 2025,
    available: true,
    dateAdded: '2025-01-12',
  },
  {
    slug: 'fleeting-v',
    title: 'Fleeting V',
    medium: 'Oil and chalk pastel on greyboard',
    size: '102x76cm',
    description: 'Fifth piece exploring transient beauty and momentary experiences.',
    imagePath: '/static/images/Website%20gallery/Fleeting%20V.jpeg',
    year: 2025,
    available: true,
    dateAdded: '2025-01-13',
  },
  {
    slug: 'fleeting-i',
    title: 'Fleeting I',
    medium: 'Oil and chalk pastel on greyboard',
    size: '102x76cm',
    description: 'First in the Fleeting series, capturing momentary impressions.',
    imagePath: '/static/images/Website%20gallery/Fleeting%20I.jpeg',
    year: 2025,
    available: true,
    dateAdded: '2025-01-14',
  },
]

export function getAllArtworks(): Artwork[] {
  return artworksData.sort((a, b) => {
    // Sort by dateAdded (newest first), fallback to year if no dateAdded
    const dateA = a.dateAdded || `${a.year || 2020}-01-01`
    const dateB = b.dateAdded || `${b.year || 2020}-01-01`
    return new Date(dateB).getTime() - new Date(dateA).getTime()
  })
}

export function getArtworkBySlug(slug: string): Artwork | undefined {
  return artworksData.find((artwork) => artwork.slug === slug)
}

export function getNewestArtwork(): Artwork | undefined {
  const sortedArtworks = getAllArtworks()
  return sortedArtworks[0] // Returns the newest artwork
}

export function getFeaturedArtworks(count: number = 3): Artwork[] {
  return getAllArtworks().slice(0, count) // Returns the newest artworks
}
