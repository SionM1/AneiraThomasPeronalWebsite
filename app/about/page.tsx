import fs from 'fs'
import path from 'path'
import AboutClient from '@/components/AboutClient'
import AdminBar from '@/components/AdminBar'

const ABOUT_IMAGE_PUBLIC_PREFIX = '/static/images/about/'

function resolveImage(value: string | undefined | null, fallback: string): string {
  if (!value) return fallback
  if (value.startsWith('/') || value.startsWith('http')) return value
  return `${ABOUT_IMAGE_PUBLIC_PREFIX}${value}`
}

export default function AboutPage() {
  const dataPath = path.join(process.cwd(), 'data/about/content.json')
  const data = fs.existsSync(dataPath)
    ? (JSON.parse(fs.readFileSync(dataPath, 'utf8')) as Record<string, string>)
    : {}

  const rows: [
    { p1: string; p2: string; imageSrc: string; imageAlt: string },
    { p1: string; p2: string; imageSrc: string; imageAlt: string },
    { p1: string; p2: string; imageSrc: string; imageAlt: string },
  ] = [
    {
      p1: data.row1_p1 ?? '',
      p2: data.row1_p2 ?? '',
      imageSrc: resolveImage(data.row1_image, '/static/images/AneiraWorking1.jpeg'),
      imageAlt: 'In the studio',
    },
    {
      p1: data.row2_p1 ?? '',
      p2: data.row2_p2 ?? '',
      imageSrc: resolveImage(data.row2_image, '/static/images/AneiraWorking2.jpeg'),
      imageAlt: 'Natural materials and process',
    },
    {
      p1: data.row3_p1 ?? '',
      p2: data.row3_p2 ?? '',
      imageSrc: resolveImage(data.row3_image, '/static/images/AneiraWorking3.jpeg'),
      imageAlt: 'Artistic environment',
    },
  ]

  return (
    <>
      <AboutClient rows={rows} />
      <AdminBar editHref="/keystatic/singleton/about" editLabel="Edit About" />
    </>
  )
}
