'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Artwork } from '@/data/artworksData'
import { useState, useEffect, useRef } from 'react'

interface GalleryGridProps {
  artworks: Artwork[]
}

export default function GalleryGrid({ artworks }: GalleryGridProps) {
  const [visibleItems, setVisibleItems] = useState<string[]>([])
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    // Initialize refs array
    itemRefs.current = itemRefs.current.slice(0, artworks.length)

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const slug = entry.target.getAttribute('data-slug')
          if (entry.isIntersecting && slug) {
            setVisibleItems((prev) => (prev.includes(slug) ? prev : [...prev, slug]))
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -10% 0px',
      }
    )

    itemRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => observer.disconnect()
  }, [artworks.length])

  return (
    <div className="w-full py-12">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {artworks.map((artwork, index) => {
          const isVisible = visibleItems.includes(artwork.slug)

          return (
            <div
              key={artwork.slug}
              ref={(el) => {
                itemRefs.current[index] = el
              }}
              data-slug={artwork.slug}
              className={`transition-all duration-1000 ease-out ${
                isVisible
                  ? 'translate-y-0 scale-100 opacity-100'
                  : 'translate-y-12 scale-95 opacity-0'
              }`}
              style={{
                transitionDelay: `${index * 100}ms`,
              }}
            >
              <Link
                href={`/gallery/${artwork.slug}`}
                className="group relative block overflow-hidden bg-white shadow-lg transition-transform duration-300 hover:scale-[1.02] hover:shadow-xl"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={artwork.imagePath}
                    alt={artwork.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                    priority={index < 6}
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                      <h3 className="mb-1 text-lg font-semibold">{artwork.title}</h3>
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
              </Link>
            </div>
          )
        })}
      </div>
    </div>
  )
}
