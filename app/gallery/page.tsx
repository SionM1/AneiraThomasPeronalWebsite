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
          className={`w-full py-24 bg-white transition-all duration-1000 ease-out ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
          }`}
          style={{ width: '100vw' }}
        >
        {/* Aneira Thomas Header - Top Left Position (scrolls naturally) */}
        <div className="absolute top-6 left-8 z-[60]">
          <h1
            className={`${coveredByYourGrace.className} text-5xl`}
            style={{ color: '#DED308' }}
          >
            Aneira Thomas
          </h1>
        </div>

        {/* Section Title - Left Aligned with Divider */}
        <div className="w-full px-8 sm:px-16 lg:px-24 xl:px-32 2xl:px-48 pt-32">
          <div
            className={`w-full mb-12 transition-all duration-1200 ease-out ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}
            style={{ transitionDelay: '200ms' }}
          >
            <h2
              className="mb-6 text-5xl md:text-6xl"
              style={{ color: '#DED308', fontFamily: 'Menlo', fontWeight: 'bold' }}
            >
              Gallery
            </h2>
          </div>
          {/* Divider Line */}
          <div className="w-full border-b border-gray-200 mb-16"></div>
        </div>

        {/* Gallery Grid - Contained Width */}
        <div
          className={`w-full transition-all duration-1200 ease-out ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
          }`}
          style={{ transitionDelay: '400ms' }}
        >
          <div className="w-full px-8 sm:px-16 lg:px-24 xl:px-32 2xl:px-48">
            <div className="grid max-w-none grid-cols-1 gap-24 md:grid-cols-3">
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
                  <div className="group relative cursor-pointer transition-transform duration-500 hover:scale-105"
                       onClick={() => navigateToArtwork(artwork.slug)}
                       role="button" tabIndex={0}
                       onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && navigateToArtwork(artwork.slug)}
                  >
                    {/* Card with a consistent shape */}
                    <div className="relative aspect-[3/4] w-full overflow-hidden bg-neutral-100 ring-1 ring-black/10">
                      <Image
                        src={artwork.imagePath}
                        alt={artwork.title}
                        fill
                        className="object-cover object-center"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        priority={index < 3}
                      />

                      {/* Hover overlay, transparent by default */}
                      <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-transparent transition-colors duration-500 group-hover:bg-black/20">
                        <span className="bg-white/95 px-6 py-3 text-sm font-semibold text-black shadow-lg opacity-0 translate-y-2 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0">
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
      
      {/* Spacer to ensure proper footer positioning */}
      <div className="h-screen"></div>
      <div className="h-[200vh]"></div>
    </>
  )
}
