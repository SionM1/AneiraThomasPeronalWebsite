import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Covered_By_Your_Grace } from 'next/font/google'
import { getArtworkBySlug, getAllArtworks } from '@/data/artworksData'

const coveredByYourGrace = Covered_By_Your_Grace({
  weight: '400',
  subsets: ['latin'],
})

interface ArtworkPageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateStaticParams() {
  const artworks = getAllArtworks()
  return artworks.map((artwork) => ({
    slug: artwork.slug,
  }))
}

export async function generateMetadata({ params }: ArtworkPageProps): Promise<Metadata> {
  const { slug } = await params
  const artwork = getArtworkBySlug(slug)

  if (!artwork) {
    return {}
  }

  return {
    title: artwork.title,
    description: artwork.description,
    openGraph: {
      title: artwork.title,
      description: artwork.description,
      images: [artwork.imagePath],
    },
  }
}

export default async function ArtworkPage({ params }: ArtworkPageProps) {
  const { slug } = await params
  const artwork = getArtworkBySlug(slug)

  if (!artwork) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Aneira Thomas Header - Top Left Position */}
      <div className="absolute top-6 left-8 z-[60]">
        <h1 className={`${coveredByYourGrace.className} text-5xl`} style={{ color: '#DED308' }}>
          Aneira Thomas
        </h1>
      </div>

      {/* Back button */}
      <div className="px-4 pt-32 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
        <Link
          href="/gallery"
          className="group mb-8 inline-flex items-center"
          style={{ color: '#DED308', fontFamily: 'Menlo', fontWeight: 'bold' }}
        >
          <svg
            className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Back to Gallery
        </Link>
      </div>

      {/* Main content area */}
      <div className="px-4 pb-24 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
        <div className="grid grid-cols-1 gap-16 lg:gap-20 xl:grid-cols-5">
          {/* Image - Takes up more space and centers itself */}
          <div className="flex justify-center xl:col-span-3">
            <div className="relative max-w-full">
              <div className="overflow-hidden border-2 border-gray-200">
                <Image
                  src={artwork.imagePath}
                  alt={artwork.title}
                  width={1200}
                  height={900}
                  className="h-auto w-full object-contain"
                  sizes="(max-width: 1280px) 100vw, 60vw"
                  priority
                />
              </div>
            </div>
          </div>

          {/* Details - Takes up remaining space */}
          <div className="xl:col-span-2">
            <div className="flex flex-col justify-start space-y-8">
              <div>
                <h1
                  className="mb-4 text-4xl"
                  style={{ color: '#DED308', fontFamily: 'Menlo', fontWeight: 'bold' }}
                >
                  {artwork.title}
                </h1>
                {artwork.year && (
                  <p
                    className="text-xl"
                    style={{ fontFamily: 'Menlo', fontWeight: '400', color: '#000' }}
                  >
                    {artwork.year}
                  </p>
                )}
              </div>

              <div className="space-y-6">
                <div>
                  <h3
                    className="mb-2 text-sm tracking-wide uppercase"
                    style={{ fontFamily: 'Menlo', fontWeight: 'bold', color: '#000' }}
                  >
                    Medium
                  </h3>
                  <p
                    className="text-lg"
                    style={{ fontFamily: 'Menlo', fontWeight: '400', color: '#000' }}
                  >
                    {artwork.medium}
                  </p>
                </div>

                <div>
                  <h3
                    className="mb-2 text-sm tracking-wide uppercase"
                    style={{ fontFamily: 'Menlo', fontWeight: 'bold', color: '#000' }}
                  >
                    Dimensions
                  </h3>
                  <p
                    className="text-lg"
                    style={{ fontFamily: 'Menlo', fontWeight: '400', color: '#000' }}
                  >
                    {artwork.size}
                  </p>
                </div>

                {artwork.available !== undefined && (
                  <div>
                    <h3
                      className="mb-2 text-sm tracking-wide uppercase"
                      style={{ fontFamily: 'Menlo', fontWeight: 'bold', color: '#000' }}
                    >
                      Availability
                    </h3>
                    <p
                      className="text-lg"
                      style={{
                        fontFamily: 'Menlo',
                        fontWeight: '400',
                        color: artwork.available ? '#059669' : '#DC2626',
                      }}
                    >
                      {artwork.available ? 'Available' : 'Sold'}
                    </p>
                  </div>
                )}

                {artwork.price && artwork.available && (
                  <div>
                    <h3
                      className="mb-2 text-sm tracking-wide uppercase"
                      style={{ fontFamily: 'Menlo', fontWeight: 'bold', color: '#000' }}
                    >
                      Price
                    </h3>
                    <p
                      className="text-lg"
                      style={{ fontFamily: 'Menlo', fontWeight: '400', color: '#000' }}
                    >
                      {artwork.price}
                    </p>
                  </div>
                )}
              </div>

              <div>
                <h3
                  className="mb-4 text-sm tracking-wide uppercase"
                  style={{ fontFamily: 'Menlo', fontWeight: 'bold', color: '#000' }}
                >
                  Description
                </h3>
                <p
                  className="text-lg leading-relaxed"
                  style={{
                    fontFamily: 'Menlo',
                    fontWeight: '400',
                    color: '#000',
                    lineHeight: '1.7',
                  }}
                >
                  {artwork.description}
                </p>
              </div>

              {/* Contact/Inquiry button */}
              <div className="pt-6">
                <Link
                  href="/contact"
                  className="inline-flex items-center rounded-full border-2 px-8 py-4 text-lg font-medium transition-colors duration-300 hover:scale-105"
                  style={{
                    color: '#DED308',
                    borderColor: '#DED308',
                    fontFamily: 'Menlo',
                    fontWeight: 'bold',
                    backgroundColor: 'rgba(222, 211, 8, 0.1)',
                  }}
                >
                  Inquire About This Piece
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
