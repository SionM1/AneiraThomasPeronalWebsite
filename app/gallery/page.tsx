import { getAllArtworks } from '@/data/artworksData'
import GalleryClient from '@/components/GalleryClient'
import AdminBar from '@/components/AdminBar'

export default function GalleryPage() {
  const artworks = getAllArtworks()
  return (
    <>
      <GalleryClient artworks={artworks} />
      <AdminBar editHref="/keystatic/collection/artworks" editLabel="Edit Gallery" />
    </>
  )
}
