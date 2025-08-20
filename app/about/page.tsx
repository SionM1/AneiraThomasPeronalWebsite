'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import Image from 'next/image'
import { Covered_By_Your_Grace } from 'next/font/google'

const coveredByYourGrace = Covered_By_Your_Grace({ weight: '400', subsets: ['latin'] })
const BRAND = '#DED308'

/* ---------- small hooks ---------- */

// reveal once when the root section scrolls into view
function useReveal(ref: React.RefObject<Element>, threshold = 0.15) {
  const [shown, setShown] = useState(false)
  useEffect(() => {
    if (!ref.current) return
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setShown(true)
      },
      { threshold }
    )
    io.observe(ref.current)
    return () => io.disconnect()
  }, [ref, threshold])
  return shown
}

// per-element parallax (relative to its own position, not page scroll)
// pass a speed like 0.12, -0.1, etc
function useParallax(ref: React.RefObject<HTMLElement>, speed = 0.12) {
  const [y, setY] = useState(0)

  const reduced = useMemo(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    []
  )

  useEffect(() => {
    if (!ref.current || reduced) return

    let raf = 0
    const onScroll = () => {
      raf =
        raf ||
        requestAnimationFrame(() => {
          const el = ref.current!
          const rect = el.getBoundingClientRect()
          // distance from center of viewport
          const delta = rect.top + rect.height / 2 - window.innerHeight / 2
          // clamp so we don’t drift too far
          const translated = Math.max(-80, Math.min(80, -delta * speed))
          setY(translated)
          raf = 0
        })
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      if (raf) cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [ref, speed, reduced])

  return reduced ? 0 : y
}

/* ---------- page ---------- */

export default function AboutPage() {
  const rootRef = useRef<HTMLDivElement>(null)
  const show = useReveal(rootRef)

  // image refs for parallax
  const img1Ref = useRef<HTMLDivElement>(null)
  const img2Ref = useRef<HTMLDivElement>(null)
  const img3Ref = useRef<HTMLDivElement>(null)

  const y1 = useParallax(img1Ref, 0.12) // slow
  const y2 = useParallax(img2Ref, -0.1) // opposite direction
  const y3 = useParallax(img3Ref, 0.14) // a touch faster

  return (
    <div className="relative left-1/2 w-screen -translate-x-1/2 bg-white">
      {/* page padding wrapper */}
      <section
        ref={rootRef}
        className={`mx-auto max-w-7xl px-4 py-20 transition-all duration-700 sm:px-6 sm:py-24 lg:px-10 ${show ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'}`}
      >
        {/* name lockup / header */}
        <div className="relative mb-8 sm:mb-10 md:mb-12">
          <h1
            className={`${coveredByYourGrace.className} text-3xl sm:text-4xl md:text-5xl`}
            style={{ color: BRAND }}
          >
            Aneira Thomas
          </h1>
        </div>

        {/* section title */}
        <div className="mb-10 sm:mb-12 md:mb-14">
          <h2
            className="text-3xl font-bold sm:text-4xl md:text-5xl"
            style={{ color: BRAND, fontFamily: 'Menlo' }}
          >
            About
          </h2>
          <div className="mt-4 h-px w-full bg-gray-200" />
        </div>

        {/* row #1 */}
        <div className="mb-16 grid grid-cols-1 items-center gap-8 lg:mb-24 lg:grid-cols-12 lg:gap-12 xl:gap-16">
          {/* text */}
          <div className="space-y-6 lg:col-span-6">
            <p
              className="text-base leading-8 text-gray-900 md:text-lg"
              style={{ fontFamily: 'Menlo' }}
            >
              Aneira Thomas&apos;s practice explores her deep connection with nature and produces
              surfaces full of movement, patterns and layers. Whilst reminiscing her memories, she
              pulls visual prompts from organic details of nature as a symbol of time passing.
            </p>
            <p
              className="text-base leading-8 text-gray-900 md:text-lg"
              style={{ fontFamily: 'Menlo' }}
            >
              Through bright colourful surfaces, Thomas longs to feel connected to nature and
              explores this relationship through mark making and slower-paced methods such as
              extracting natural pigments and traditional painting techniques.
            </p>
          </div>

          {/* image */}
          <div ref={img1Ref} className="lg:col-span-6">
            <div
              className="relative aspect-[4/3] w-full overflow-hidden border border-gray-200 shadow-md md:aspect-[3/2]"
              style={{ transform: `translateY(${y1}px)` }}
            >
              <Image
                src="/static/images/AneiraWorking1.jpeg"
                alt="In the studio"
                fill
                className="object-cover transition-transform duration-700 hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 transition-opacity duration-500 hover:opacity-100" />
            </div>
          </div>
        </div>

        {/* row #2 (flip) */}
        <div className="mb-16 grid grid-cols-1 items-center gap-8 lg:mb-24 lg:grid-cols-12 lg:gap-12 xl:gap-16">
          {/* image */}
          <div ref={img2Ref} className="order-first lg:order-none lg:col-span-6">
            <div
              className="relative aspect-[4/3] w-full overflow-hidden border border-gray-200 shadow-md md:aspect-[3/2]"
              style={{ transform: `translateY(${y2}px)` }}
            >
              <Image
                src="/static/images/AneiraWorking2.jpeg"
                alt="Natural materials and process"
                fill
                className="object-cover transition-transform duration-700 hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>

          {/* text */}
          <div className="space-y-6 lg:col-span-6">
            <p
              className="text-base leading-8 text-gray-900 md:text-lg"
              style={{ fontFamily: 'Menlo' }}
            >
              Materials guide the process rather than a fixed outcome. Collected fragments—bark,
              pressed flowers, pencil notes—seed layered works that capture both the appearance and
              the spirit of the natural world.
            </p>
            <p
              className="text-base leading-8 text-gray-900 md:text-lg"
              style={{ fontFamily: 'Menlo' }}
            >
              The work invites a slower pace: to pause, remember, and reconnect with the rhythms we
              share with the landscape.
            </p>
          </div>
        </div>

        {/* row #3 */}
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-12 xl:gap-16">
          {/* text */}
          <div className="space-y-6 lg:col-span-6">
            <p
              className="text-base leading-8 text-gray-900 md:text-lg"
              style={{ fontFamily: 'Menlo' }}
            >
              Light, shadow, and the delicate architecture of organic forms shape a practice aimed
              at creating living surfaces—paintings that feel like they breathe.
            </p>
            <p
              className="text-base leading-8 text-gray-900 md:text-lg"
              style={{ fontFamily: 'Menlo' }}
            >
              Ultimately the work is a reminder of interdependence with the living world—a quiet
              invitation to look longer, and feel more.
            </p>
          </div>

          {/* image */}
          <div ref={img3Ref} className="lg:col-span-6">
            <div
              className="relative aspect-[4/3] w-full overflow-hidden border border-gray-200 shadow-md md:aspect-[3/2]"
              style={{ transform: `translateY(${y3}px)` }}
            >
              <Image
                src="/static/images/AneiraWorking3.jpeg"
                alt="Artistic environment"
                fill
                className="object-cover transition-transform duration-700 hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
