import fs from 'fs'
import path from 'path'

export interface Exhibition {
  slug: string
  id: number
  title: string
  venue: string
  date: string
  description: string
  imagePath: string
  link?: string
  order?: number
}

const exhibitionsDir = path.join(process.cwd(), 'data/exhibitions')
const EXHIBITIONS_PUBLIC_PREFIX = '/static/images/exhibition-uploads'

function resolveImagePath(value: string | undefined | null, slug: string): string {
  if (!value) return ''
  if (value.startsWith('/') || value.startsWith('http')) return value
  return `${EXHIBITIONS_PUBLIC_PREFIX}/${slug}/${value}`
}

function readExhibitionsFromDisk(): Exhibition[] {
  if (!fs.existsSync(exhibitionsDir)) return []
  const files = fs.readdirSync(exhibitionsDir).filter((f) => f.endsWith('.json'))
  return files.map((filename, index) => {
    const slug = filename.replace(/\.json$/, '')
    const data = JSON.parse(fs.readFileSync(path.join(exhibitionsDir, filename), 'utf8'))
    return {
      slug,
      id: index + 1,
      title: data.title ?? '',
      venue: data.venue ?? '',
      date: data.date ?? '',
      description: data.description ?? '',
      imagePath: resolveImagePath(data.imagePath, slug),
      link: data.link || undefined,
      order: data.order,
    }
  })
}

export function getAllExhibitions(): Exhibition[] {
  return readExhibitionsFromDisk().sort((a, b) => {
    const orderA = a.order ?? 999
    const orderB = b.order ?? 999
    return orderA - orderB
  })
}
