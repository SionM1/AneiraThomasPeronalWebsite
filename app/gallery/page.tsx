'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { Covered_By_Your_Grace } from 'next/font/google'
import { getAllArtworks } from '@/data/artworksData'

const coveredByYourGrace = Covered_By_Your_Grace({
  weight: '400',
  subsets: ['latin'],
})

export default function GalleryPage() {
  const [visibleItems, setVisibleItems] = useState(new Set<number>())
  const router = useRouter()
  const artworks = getAllArtworks()
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    // Show first batch immediately
    const initialBatch = Array.from({ length: Math.min(6, artworks.length) }, (_, i) => i)
    setVisibleItems(new Set(initialBatch))

    // Set up intersection observer for remaining items
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = itemRefs.current.indexOf(entry.target as HTMLDivElement)
            if (index !== -1) {
              setVisibleItems((prev) => new Set(prev).add(index))
            }
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: '50px 0px 50px 0px',
      }
    )

    // Observe items that aren't initially visible
    itemRefs.current.slice(6).forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => observer.disconnect()
  }, [artworks.length])

  const navigateToArtwork = (slug: string) => {
    router.push(`/gallery/${slug}`)
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Aneira Thomas Header - standardized to Exhibitions */}
      <div className="absolute top-4 left-4 z-[60] sm:top-6 sm:left-8">
        <Link href="/">
          <h1
            className={`${coveredByYourGrace.className} text-3xl sm:text-4xl md:text-5xl`}
            style={{ color: '#DED308' }}
          >
            Aneira Thomas
          </h1>
        </Link>
      </div>

      {/* Main content */}
      <div className="w-full px-4 pt-32 sm:px-8 md:px-16 lg:px-24 xl:px-32 2xl:px-48">
        {/* Page Title - standardized */}
        <div className="mb-12 w-full">
          <h2
            className="mb-6 text-3xl sm:text-4xl md:text-5xl lg:text-6xl"
            style={{ color: '#DED308', fontFamily: 'Menlo', fontWeight: 'bold' }}
          >
            Gallery
          </h2>
          <div className="w-full border-b border-gray-200"></div>
        </div>

        {/* Gallery Grid */}
        <div className="grid max-w-none grid-cols-2 gap-4 sm:gap-6 md:gap-8 lg:grid-cols-3 lg:gap-12 xl:grid-cols-4">
          {artworks.map((artwork, index) => (
            <div
              key={artwork.slug}
              ref={(el) => (itemRefs.current[index] = el)}
              className={`transition-all duration-800 ease-out ${
                visibleItems.has(index)
                  ? 'translate-y-0 scale-100 opacity-100'
                  : 'translate-y-12 scale-95 opacity-0'
              }`}
              style={{
                transitionDelay: visibleItems.has(index) ? `${Math.min(index, 5) * 100}ms` : '0ms',
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
  )
}
