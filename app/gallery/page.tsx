import { getAllArtworks } from '@/data/artworksData'
import GalleryClient from '@/components/GalleryClient'

export default function GalleryPage() {
  const artworks = getAllArtworks()
  return <GalleryClient artworks={artworks} />
}
