'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Covered_By_Your_Grace } from 'next/font/google'
import { getAllArtworks } from '@/data/artworksData'

const coveredByYourGrace = Covered_By_Your_Grace({
  weight: '400',
  subsets: ['latin'],
})

export default function GalleryPage() {
  const [isVisible, setIsVisible] = useState(false) // Start hidden for proper animation
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
        threshold: 0.2, // Match Featured Work threshold
        rootMargin: '0px 0px -50px 0px', // Match Featured Work margin
      }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const artworks = getAllArtworks()

  const navigateToArtwork = (slug: string) => {
    router.push(`/gallery/${slug}`)
  }

  return (
    <>
      {/* Gallery Section - Break Out of SectionContainer */}
      <div className="absolute left-1/2 w-screen -translate-x-1/2 transform">
        <div
          ref={sectionRef}
          className={`w-full bg-white py-24 transition-all duration-1000 ease-out ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
          }`}
          style={{ width: '100vw' }}
        >
          {/* Aneira Thomas Header - Top Left Position (scrolls naturally) */}
          <div className="absolute top-4 left-4 z-[60] sm:top-6 sm:left-6 md:left-8">
            <h1
              className={`${coveredByYourGrace.className} text-2xl sm:text-3xl md:text-4xl lg:text-5xl`}
              style={{ color: '#DED308' }}
            >
              Aneira Thomas
            </h1>
          </div>

          {/* Section Title - Left Aligned with Divider */}
          <div className="w-full px-4 pt-24 sm:px-6 sm:pt-28 md:px-8 md:pt-32 lg:px-16 lg:pt-32 xl:px-24 xl:pt-32 2xl:px-32">
            <div
              className={`mb-8 w-full transition-all duration-1200 ease-out sm:mb-10 md:mb-12 ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              }`}
              style={{ transitionDelay: '200ms' }}
            >
              <h2
                className="mb-4 text-3xl sm:mb-6 sm:text-4xl md:text-5xl lg:text-6xl"
                style={{ color: '#DED308', fontFamily: 'Menlo', fontWeight: 'bold' }}
              >
                Gallery
              </h2>
            </div>
            {/* Divider Line */}
            <div className="mb-8 w-full border-b border-gray-200 sm:mb-12 md:mb-16"></div>
          </div>

          {/* Gallery Grid - Contained Width */}
          <div
            className={`w-full transition-all duration-1200 ease-out ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
            }`}
            style={{ transitionDelay: '400ms' }}
          >
            <div className="w-full px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24 2xl:px-32">
              <div className="grid max-w-none grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-12 md:gap-16 lg:grid-cols-3 lg:gap-20 xl:gap-24">
                {artworks.map((artwork, index) => (
                  <div
                    key={artwork.slug}
                    className={`transition-all duration-800 ease-out ${
                      isVisible
                        ? 'translate-y-0 scale-100 opacity-100'
                        : 'translate-y-12 scale-95 opacity-0'
                    }`}
                    style={{
                      transitionDelay: `${600 + index * 150}ms`,
                    }}
                  >
                    <div
                      className="group touch-target relative cursor-pointer transition-transform duration-500 hover:scale-105"
                      onClick={() => navigateToArtwork(artwork.slug)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) =>
                        (e.key === 'Enter' || e.key === ' ') && navigateToArtwork(artwork.slug)
                      }
                    >
                      {/* Card with a consistent shape */}
                      <div className="relative aspect-[3/4] w-full overflow-hidden bg-neutral-100 ring-1 ring-black/10">
                        <Image
                          src={artwork.imagePath}
                          alt={artwork.title}
                          fill
                          className="object-cover object-center"
                          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                          priority={index < 6}
                        />

                        {/* Hover overlay, transparent by default */}
                        <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-transparent transition-colors duration-500 group-hover:bg-black/20">
                          <span className="translate-y-2 bg-white/95 px-4 py-2 text-xs font-semibold text-black opacity-0 shadow-lg transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 sm:px-6 sm:py-3 sm:text-sm">
                            View Artwork
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Spacer to maintain layout flow */}
      <div className="min-h-screen"></div>
    </>
  )
}
