'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { getFeaturedArtworks } from '@/data/artworksData'

interface FeaturedWorkProps {
  className?: string
}

export default function FeaturedWork({ className = '' }: FeaturedWorkProps) {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px',
      }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const artworks = getFeaturedArtworks(3)

  const navigateToGallery = () => {
    router.push('/gallery')
  }

  const navigateToArtwork = (slug: string) => {
    router.push(`/gallery/${slug}`)
  }

  return (
    <div
      ref={sectionRef}
      className={`relative z-20 py-24 transition-all duration-1000 ease-out ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
      } ${className}`}
    >
      {/* Section Title - full width */}
      <div className="px-8">
        <div
          className={`mb-20 text-center transition-all duration-1200 ease-out ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}
          style={{ transitionDelay: '200ms' }}
        >
          <h2
            className="mb-6 text-5xl md:text-6xl"
            style={{ color: '#DED308', fontFamily: 'Menlo', fontWeight: 'bold' }}
          >
            Featured Work
          </h2>
        </div>
      </div>

      {/* Full-width Gallery - Three cards per row */}
      <div
        className={`w-full transition-all duration-1200 ease-out ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
        }`}
        style={{ transitionDelay: '400ms' }}
      >
        <div className="px-8">
          <div className="grid max-w-none grid-cols-1 gap-8 md:grid-cols-3">
            {artworks.map((artwork, index) => (
              <div
                key={artwork.slug}
                className={`group relative z-30 cursor-pointer transition-all duration-800 ease-out ${
                  isVisible
                    ? 'translate-y-0 scale-100 opacity-100'
                    : 'translate-y-12 scale-95 opacity-0'
                }`}
                role="button"
                tabIndex={0}
                aria-label={`View ${artwork.title}`}
                style={{
                  transitionDelay: `${600 + index * 150}ms`,
                }}
                onClick={() => navigateToArtwork(artwork.slug)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    navigateToArtwork(artwork.slug)
                  }
                }}
              >
                {/* Artwork Container */}
                <div className="relative w-full overflow-hidden bg-transparent transition-all duration-500 group-hover:scale-105">
                  {/* Dynamic aspect ratio based on screen size */}
                  <div className="relative aspect-[4/3] w-full overflow-hidden border-2 border-gray-200 bg-white shadow-lg transition-colors duration-300 group-hover:border-gray-300 md:aspect-[3/4] lg:aspect-square">
                    <Image
                      src={artwork.imagePath}
                      alt={artwork.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <div className="absolute inset-x-0 bottom-0 p-4 text-white">
                      <h3 className="mb-1 text-lg font-semibold italic">{artwork.title}</h3>
                      <p className="mb-1 text-sm opacity-90">{artwork.medium}</p>
                      {artwork.year && <p className="text-sm opacity-75">{artwork.year}</p>}
                    </div>
                  </div>
                </div>

                {/* Artwork Info */}
                <div className="mt-6 text-center">
                  <h3
                    className="text-xl"
                    style={{ color: '#DED308', fontFamily: 'Menlo', fontWeight: 'bold' }}
                  >
                    {artwork.title}
                  </h3>
                  <p
                    className="mt-2 text-base text-black"
                    style={{ fontFamily: 'Menlo', fontWeight: '400' }}
                  >
                    {artwork.medium}
                  </p>
                  {artwork.year && (
                    <p
                      className="mt-1 text-sm text-black"
                      style={{ fontFamily: 'Menlo', fontWeight: '400' }}
                    >
                      {artwork.year}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* View All Button - full width */}
      <div className="px-8">
        <div
          className={`mt-16 text-center transition-all duration-1000 ease-out ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}
          style={{ transitionDelay: '1000ms' }}
        >
          <button
            className="bg-orange bg-opacity-20 border-opacity-40 hover:bg-opacity-30 border-white px-10 py-4 text-lg backdrop-blur-sm transition-all duration-300 hover:scale-105"
            style={{
              color: '#DED308',
              borderColor: '#DED308',
              fontFamily: 'Menlo',
              fontWeight: 'bold',
            }}
            onClick={navigateToGallery}
          >
            View All Work
          </button>
        </div>
      </div>
    </div>
  )
}
