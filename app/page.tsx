import { getFeaturedArtworks } from '@/data/artworksData'
import HomePageClient from '@/components/HomePageClient'

export default function Page() {
  const featuredArtworks = getFeaturedArtworks(3)
  return <HomePageClient featuredArtworks={featuredArtworks} />
}
