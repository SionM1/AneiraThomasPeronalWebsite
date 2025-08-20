import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Covered_By_Your_Grace } from 'next/font/google'
import { getArtworkBySlug, getAllArtworks } from '@/data/artworksData'

const coveredByYourGrace = Covered_By_Your_Grace({ weight: '400', subsets: ['latin'] })

interface PageProps {
  params: { slug: string }
}

export function generateStaticParams() {
  const artworks = getAllArtworks()
  return artworks.map((a) => ({ slug: a.slug }))
}

// optional: keep if you want 404 for unknown slugs at build time
export const dynamicParams = false

export function generateMetadata({ params }: PageProps): Metadata {
  const artwork = getArtworkBySlug(params.slug)
  if (!artwork) return {}

  return {
    title: artwork.title,
    openGraph: {
      title: artwork.title,
      images: [artwork.imagePath],
    },
  }
}

export default function ArtworkPage({ params }: PageProps) {
  const artwork = getArtworkBySlug(params.slug)
  if (!artwork) notFound()

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="absolute top-4 left-4 z-[60] sm:top-6 sm:left-6">
        <h1
          className={`${coveredByYourGrace.className} text-3xl sm:text-4xl lg:text-5xl`}
          style={{ color: '#DED308' }}
        >
          Aneira Thomas
        </h1>
      </div>

      {/* Back */}
      <div className="px-4 pt-20 sm:px-6 sm:pt-24 lg:px-8">
        <Link
          href="/gallery"
          className="group mb-6 inline-flex items-center"
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

      {/* Content */}
      <div className="px-4 pb-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-12">
          {/* Image – square corners, no internal letterboxing */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-center">
              <Image
                src={artwork.imagePath}
                alt={artwork.title}
                width={2000}
                height={2000}
                priority
                sizes="(max-width: 1024px) 100vw, 66vw"
                className="block h-[70svh] w-auto shadow-lg" // ← no rounded-lg
                style={{ objectFit: 'contain' }}
              />
            </div>
          </div>
          {/* Details */}
          <div className="lg:col-span-1">
            <div className="space-y-6">
              <div>
                <h1
                  className="mb-3 text-2xl italic sm:text-3xl lg:text-4xl"
                  style={{ color: '#DED308', fontFamily: 'Menlo', fontWeight: 'bold' }}
                >
                  {artwork.title}
                </h1>
                {artwork.year && (
                  <p className="text-lg sm:text-xl" style={{ fontFamily: 'Menlo', color: '#000' }}>
                    {artwork.year}
                  </p>
                )}
              </div>

              <div className="space-y-4">
                <div>
                  <h3
                    className="mb-2 text-xs tracking-wide uppercase"
                    style={{ fontFamily: 'Menlo', fontWeight: 'bold', color: '#000' }}
                  >
                    Medium
                  </h3>
                  <p className="text-base" style={{ fontFamily: 'Menlo', color: '#000' }}>
                    {artwork.medium}
                  </p>
                </div>

                <div>
                  <h3
                    className="mb-2 text-xs tracking-wide uppercase"
                    style={{ fontFamily: 'Menlo', fontWeight: 'bold', color: '#000' }}
                  >
                    Dimensions
                  </h3>
                  <p className="text-base" style={{ fontFamily: 'Menlo', color: '#000' }}>
                    {artwork.size}
                  </p>
                </div>

                {artwork.available !== undefined && (
                  <div>
                    <h3
                      className="mb-2 text-xs tracking-wide uppercase"
                      style={{ fontFamily: 'Menlo', fontWeight: 'bold', color: '#000' }}
                    >
                      Availability
                    </h3>
                    <p
                      className="text-base"
                      style={{
                        fontFamily: 'Menlo',
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
                      className="mb-2 text-xs tracking-wide uppercase"
                      style={{ fontFamily: 'Menlo', fontWeight: 'bold', color: '#000' }}
                    >
                      Price
                    </h3>
                    <p className="text-base" style={{ fontFamily: 'Menlo', color: '#000' }}>
                      {artwork.price}
                    </p>
                  </div>
                )}
              </div>

              <div className="pt-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center rounded-full border-2 px-6 py-3 text-base font-medium transition-transform hover:scale-105"
                  style={{
                    color: '#DED308',
                    borderColor: '#DED308',
                    fontFamily: 'Menlo',
                    fontWeight: 'bold',
                    backgroundColor: 'rgba(222, 211, 8, 0.08)',
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
