'use client'

import { useEffect, useMemo, useRef, useState, type RefObject } from 'react'
import Image from 'next/image'
import { Covered_By_Your_Grace } from 'next/font/google'

const coveredByYourGrace = Covered_By_Your_Grace({ weight: '400', subsets: ['latin'] })
const BRAND = '#DED308'

function useReveal(ref: RefObject<Element>, threshold = 0.15) {
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

function useParallax(ref: RefObject<HTMLElement>, speed = 0.12) {
  const [y, setY] = useState(0)
  const reduced = useMemo(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    []
  )
  const isMobile = useMemo(() => typeof window !== 'undefined' && window.innerWidth < 1024, [])
  useEffect(() => {
    if (!ref.current || reduced || isMobile) return
    let raf = 0
    const onScroll = () => {
      raf =
        raf ||
        requestAnimationFrame(() => {
          const el = ref.current!
          const rect = el.getBoundingClientRect()
          const delta = rect.top + rect.height / 2 - window.innerHeight / 2
          setY(Math.max(-80, Math.min(80, -delta * speed)))
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
  }, [ref, speed, reduced, isMobile])
  return reduced || isMobile ? 0 : y
}

interface Row {
  p1: string
  p2: string
  imageSrc: string
  imageAlt: string
}

export default function AboutClient({ rows }: { rows: [Row, Row, Row] }) {
  const rootRef = useRef<HTMLDivElement>(null)
  const show = useReveal(rootRef)
  const img1Ref = useRef<HTMLDivElement>(null)
  const img2Ref = useRef<HTMLDivElement>(null)
  const img3Ref = useRef<HTMLDivElement>(null)
  const y1 = useParallax(img1Ref, 0.12)
  const y2 = useParallax(img2Ref, -0.1)
  const y3 = useParallax(img3Ref, 0.14)
  const [row1, row2, row3] = rows

  return (
    <div className="relative left-1/2 w-screen -translate-x-1/2 bg-white">
      <div className="absolute top-4 left-4 z-[60] sm:top-6 sm:left-8">
        <h1
          className={`${coveredByYourGrace.className} text-3xl sm:text-4xl md:text-5xl`}
          style={{ color: BRAND }}
        >
          Aneira Thomas
        </h1>
      </div>

      <section
        ref={rootRef}
        className={`w-full px-4 pt-32 transition-all duration-700 sm:px-8 md:px-16 lg:px-24 xl:px-32 2xl:px-48 ${show ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'}`}
      >
        <div className="mb-12 w-full">
          <h2
            className="mb-6 text-3xl sm:text-4xl md:text-5xl lg:text-6xl"
            style={{ color: BRAND, fontFamily: 'Menlo', fontWeight: 'bold' }}
          >
            About
          </h2>
          <div className="w-full border-b border-gray-200" />
        </div>

        {/* row 1 */}
        <div className="mb-16 grid grid-cols-1 gap-8 md:gap-12 lg:mb-24 lg:grid-cols-12 lg:items-center lg:gap-12 xl:gap-16">
          <div className="space-y-6 lg:col-span-6">
            <p
              className="text-base leading-8 text-gray-900 md:text-lg"
              style={{ fontFamily: 'Menlo' }}
            >
              {row1.p1}
            </p>
            <p
              className="text-base leading-8 text-gray-900 md:text-lg"
              style={{ fontFamily: 'Menlo' }}
            >
              {row1.p2}
            </p>
          </div>
          <div ref={img1Ref} className="lg:col-span-6">
            <div
              className="relative aspect-[4/3] w-full overflow-hidden border border-gray-200 shadow-md md:aspect-[3/2]"
              style={{ transform: `translateY(${y1}px)` }}
            >
              <Image
                src={row1.imageSrc}
                alt={row1.imageAlt}
                fill
                className="object-cover transition-transform duration-700 hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 transition-opacity duration-500 hover:opacity-100" />
            </div>
          </div>
        </div>

        {/* row 2 */}
        <div className="mb-16 grid grid-cols-1 gap-8 md:gap-12 lg:mb-24 lg:grid-cols-12 lg:items-center lg:gap-12 xl:gap-16">
          <div ref={img2Ref} className="order-first lg:order-none lg:col-span-6">
            <div
              className="relative aspect-[4/3] w-full overflow-hidden border border-gray-200 shadow-md md:aspect-[3/2]"
              style={{ transform: `translateY(${y2}px)` }}
            >
              <Image
                src={row2.imageSrc}
                alt={row2.imageAlt}
                fill
                className="object-cover transition-transform duration-700 hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
          <div className="space-y-6 lg:col-span-6">
            <p
              className="text-base leading-8 text-gray-900 md:text-lg"
              style={{ fontFamily: 'Menlo' }}
            >
              {row2.p1}
            </p>
            <p
              className="text-base leading-8 text-gray-900 md:text-lg"
              style={{ fontFamily: 'Menlo' }}
            >
              {row2.p2}
            </p>
          </div>
        </div>

        {/* row 3 */}
        <div className="grid grid-cols-1 gap-8 pb-32 md:gap-12 lg:grid-cols-12 lg:items-center lg:gap-12 xl:gap-16">
          <div className="space-y-6 lg:col-span-6">
            <p
              className="text-base leading-8 text-gray-900 md:text-lg"
              style={{ fontFamily: 'Menlo' }}
            >
              {row3.p1}
            </p>
            <p
              className="text-base leading-8 text-gray-900 md:text-lg"
              style={{ fontFamily: 'Menlo' }}
            >
              {row3.p2}
            </p>
          </div>
          <div ref={img3Ref} className="lg:col-span-6">
            <div
              className="relative aspect-[4/3] w-full overflow-hidden border border-gray-200 shadow-md md:aspect-[3/2]"
              style={{ transform: `translateY(${y3}px)` }}
            >
              <Image
                src={row3.imageSrc}
                alt={row3.imageAlt}
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
