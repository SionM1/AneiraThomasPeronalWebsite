import fs from 'fs'
import path from 'path'

export interface Artwork {
  slug: string
  title: string
  medium: string
  size: string
  imagePath: string
  year?: number
  price?: string
  available?: boolean
  dateAdded?: string
}

const artworksDir = path.join(process.cwd(), 'data/artworks')

function readArtworksFromDisk(): Artwork[] {
  const files = fs.readdirSync(artworksDir).filter((f) => f.endsWith('.json'))

  return files.map((filename) => {
    const slug = filename.replace(/\.json$/, '')
    const fileContents = fs.readFileSync(path.join(artworksDir, filename), 'utf8')
    const data = JSON.parse(fileContents)
    return {
      slug,
      title: data.title ?? '',
      medium: data.medium ?? '',
      size: data.size ?? '',
      imagePath: data.imagePath ?? '',
      year: data.year,
      price: data.price,
      available: data.available,
      dateAdded: data.dateAdded,
    } as Artwork
  })
}

export function getAllArtworks(): Artwork[] {
  return readArtworksFromDisk().sort((a, b) => {
    const dateA = a.dateAdded || `${a.year || 2020}-01-01`
    const dateB = b.dateAdded || `${b.year || 2020}-01-01`
    return new Date(dateB).getTime() - new Date(dateA).getTime()
  })
}

export function getArtworkBySlug(slug: string): Artwork | undefined {
  return readArtworksFromDisk().find((artwork) => artwork.slug === slug)
}

export function getNewestArtwork(): Artwork | undefined {
  return getAllArtworks()[0]
}

export function getFeaturedArtworks(count: number = 3): Artwork[] {
  return getAllArtworks().slice(0, count)
}
