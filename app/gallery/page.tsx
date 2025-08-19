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

  const artworks = getAllArtworks()

  const navigateToArtwork = (slug: string) => {
    router.push(`/gallery/${slug}`)
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Aneira Thomas Header */}
      <div className="absolute top-6 left-8 z-[60]">
        <h1 className={`${coveredByYourGrace.className} text-5xl`} style={{ color: '#DED308' }}>
          Aneira Thomas
        </h1>
      </div>

      {/* Main content */}
      <div className="px-8 pt-32">
        <div
          ref={sectionRef}
          className={`transition-all duration-1000 ease-out ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
          }`}
        >
          {/* Page Title */}
          <div className="mb-8">
            <h2
              className="mb-6 text-6xl"
              style={{ color: '#DED308', fontFamily: 'Menlo', fontWeight: 'bold' }}
            >
              Gallery
            </h2>
            <div className="w-full border-b border-gray-200"></div>
          </div>

          {/* Gallery Grid */}
          <div className="grid max-w-none grid-cols-1 gap-16 md:grid-cols-2 lg:grid-cols-3">
            {artworks.map((artwork, index) => (
              <div
                key={artwork.slug}
                className={`transition-all duration-800 ease-out ${
                  isVisible
                    ? 'translate-y-0 scale-100 opacity-100'
                    : 'translate-y-12 scale-95 opacity-0'
                }`}
                style={{
                  transitionDelay: `${400 + index * 100}ms`,
                }}
              >
                <div
                  className="group relative cursor-pointer transition-transform duration-500 hover:scale-105"
                  onClick={() => navigateToArtwork(artwork.slug)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) =>
                    (e.key === 'Enter' || e.key === ' ') && navigateToArtwork(artwork.slug)
                  }
                >
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-white shadow-lg">
                    <Image
                      src={artwork.imagePath}
                      alt={artwork.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                      priority={index < 6}
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <div className="absolute right-0 bottom-0 left-0 p-4 text-white">
                        <h3 className="mb-1 text-lg font-semibold italic">{artwork.title}</h3>
                        <p className="mb-1 text-sm opacity-90">{artwork.medium}</p>
                        {artwork.year && <p className="mb-2 text-sm opacity-75">{artwork.year}</p>}
                        {artwork.available !== undefined && (
                          <span
                            className={`inline-block px-3 py-1 text-xs font-medium ${
                              artwork.available
                                ? 'bg-green-500/90 text-white'
                                : 'bg-red-500/90 text-white'
                            }`}
                          >
                            {artwork.available ? 'Available' : 'Sold'}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
