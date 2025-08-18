'use client'

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

interface Exhibition {
  id: number
  title: string
  venue: string
  date: string
  description: string
  imagePath: string
  link?: string
}
interface Props {
  exhibitions: Exhibition[]
}

export default function ExhibitionTimeline({ exhibitions }: Props) {
  const timelineRef = useRef<HTMLDivElement>(null)
  const pathRef = useRef<SVGPathElement>(null)
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([])
  sectionRefs.current = sectionRefs.current.slice(0, exhibitions.length)

  // drawing state
  const [pathLen, setPathLen] = useState(1)
  const [progress, setProgress] = useState(0) // 0..1, top of page → bottom of timeline
  const [stops, setStops] = useState<number[]>([]) // per-card reveal thresholds 0..1
  const [highlight, setHighlight] = useState<number | null>(null)

  // tune these
  const EASING_POWER = 1.6 // 1 = linear, >1 = starts slower, ends faster
  const STICKY_TOP = 72 // px – where the SVG sticks

  // responsive spacing for the bezier path
  const SPACING =
    typeof window === 'undefined'
      ? 300
      : window.innerWidth < 640
        ? 230
        : window.innerWidth < 1024
          ? 260
          : 300

  const AMPLITUDE = 60
  const CENTER_X = 60

  // build the winding path once
  const d = useMemo(() => {
    let p = `M${CENTER_X},${SPACING * 0.2}`
    exhibitions.forEach((_, i) => {
      const y = (i + 1) * SPACING + SPACING * 0.2
      const even = i % 2 === 0
      const c1x = CENTER_X + (even ? AMPLITUDE : -AMPLITUDE)
      const c1y = y - SPACING * 0.7
      const c2x = CENTER_X + (even ? AMPLITUDE * 0.5 : -AMPLITUDE * 0.5)
      const c2y = y - SPACING * 0.3
      p += ` C${c1x},${c1y} ${c2x},${c2y} ${CENTER_X},${y}`
    })
    return p
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [exhibitions.length, SPACING])

  const totalSvgH = useMemo(
    () => (exhibitions.length + 1) * SPACING + 120,
    [exhibitions.length, SPACING]
  )

  // measure actual path length for perfect stroke animation
  useLayoutEffect(() => {
    if (pathRef.current) setPathLen(pathRef.current.getTotalLength() || 1)
  }, [d])

  /**
   * KEY FIX 1:
   * Map page scroll (window.scrollY) to [0..1] where:
   *   0   = page top
   *   1   = bottom of timeline (absolute Y of bottom)
   * This guarantees the stroke starts at 0 at the very top of the page.
   */
  useEffect(() => {
    if (!timelineRef.current) return

    let endY = 1 // absolute Y of the bottom of the timeline

    const measure = () => {
      const tRect = timelineRef.current!.getBoundingClientRect()
      const tTopAbs = window.scrollY + tRect.top // absolute top of timeline
      const tBotAbs = tTopAbs + tRect.height // absolute bottom of timeline
      endY = Math.max(1, tBotAbs) // avoid divide by zero

      // KEY FIX 2:
      // For each card, store the absolute Y of its top against endY → threshold 0..1
      const cardStops = sectionRefs.current.map((el) => {
        if (!el) return 1
        const r = el.getBoundingClientRect()
        const yAbs = window.scrollY + r.top
        const stop = Math.min(1, Math.max(0, yAbs / endY))
        return stop
      })
      setStops(cardStops)

      // also update progress immediately
      setProgress(Math.min(1, Math.max(0, window.scrollY / endY)))
    }

    let raf = 0
    const onScroll = () => {
      raf =
        raf ||
        requestAnimationFrame(() => {
          setProgress((p) => {
            const y = window.scrollY
            return Math.min(1, Math.max(0, y / endY))
          })
          raf = 0
        })
    }

    const onResize = () => measure()

    measure()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [exhibitions.length])

  // eased stroke
  const eased = useMemo(() => Math.pow(progress, EASING_POWER), [progress])

  // small observer to pick a live highlight (optional)
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          const id = Number(e.target.getAttribute('data-id') || 0)
          if (e.isIntersecting) setHighlight(id)
        }),
      { rootMargin: `-${STICKY_TOP}px 0px -50% 0px`, threshold: 0.01 }
    )
    sectionRefs.current.forEach((el) => el && io.observe(el))
    return () => io.disconnect()
  }, [])

  return (
    <div ref={timelineRef} className="w-full py-8 pb-28 sm:py-12">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-12 gap-6 lg:gap-8">
          {/* SVG gutter – visible from sm+; sticky so it tracks the scroll */}
          <div className="col-span-2 hidden sm:block">
            <div className="sticky" style={{ top: STICKY_TOP }}>
              <svg width="120" height={totalSvgH} viewBox={`0 0 120 ${totalSvgH}`}>
                <path ref={pathRef} d={d} fill="none" stroke="none" />
                <path d={d} fill="none" stroke="#E5E7EB" strokeWidth="2" className="opacity-30" />
                <path
                  d={d}
                  fill="none"
                  stroke="url(#grad)"
                  strokeWidth="4"
                  strokeDasharray={pathLen}
                  strokeDashoffset={pathLen * (1 - eased)}
                  style={{ filter: 'drop-shadow(0 2px 4px rgba(48,35,188,0.25))' }}
                />
                <defs>
                  <linearGradient id="grad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#DED308" />
                    <stop offset="100%" stopColor="#C4BB07" />
                  </linearGradient>
                </defs>

                {/* nodes reveal exactly when scroll passes their card top */}
                {exhibitions.map((ex, i) => {
                  const y = (i + 1) * SPACING + SPACING * 0.2
                  const x = CENTER_X
                  const revealed = eased >= (stops[i] ?? 1)
                  const hot = highlight === ex.id
                  return (
                    <g key={ex.id}>
                      <circle
                        cx={x}
                        cy={y}
                        r="12"
                        fill="none"
                        stroke="#DED308"
                        strokeWidth="2"
                        className={`transition-all duration-500 ${revealed ? 'scale-100 opacity-60' : 'scale-0 opacity-0'}`}
                        style={{ transformOrigin: `${x}px ${y}px` }}
                      />
                      <circle
                        cx={x}
                        cy={y}
                        r="8"
                        stroke="#DED308"
                        strokeWidth="3"
                        fill={revealed ? (hot ? '#DED308' : 'white') : 'transparent'}
                        className={`transition-all duration-500 ${revealed ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`}
                        style={{ transformOrigin: `${x}px ${y}px` }}
                      />
                    </g>
                  )
                })}
              </svg>
            </div>
          </div>

          {/* Cards */}
          <div className="col-span-12 sm:col-span-10">
            <div className="space-y-28 md:space-y-32">
              {exhibitions.map((ex, i) => {
                const revealed = eased >= (stops[i] ?? 1)
                return (
                  <div
                    key={ex.id}
                    ref={(el) => {
                      sectionRefs.current[i] = el
                    }}
                    data-id={ex.id}
                    className={`transition-all duration-700 ease-out ${revealed ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'}`}
                  >
                    <div
                      className={`group overflow-hidden bg-white shadow-xl transition-all duration-500 ${highlight === ex.id ? 'ring-2 ring-[#DED308]/20' : ''}`}
                    >
                      <div className="flex flex-col lg:flex-row">
                        <div className="w-full lg:w-1/3 xl:w-1/4">
                          <div className="relative aspect-[3/4] w-full overflow-hidden bg-gray-100 sm:aspect-[4/5] md:aspect-[3/4]">
                            <Image
                              src={ex.imagePath || '/static/images/placeholder-exhibition.jpg'}
                              alt={ex.title}
                              fill
                              className="object-contain transition-transform duration-700 group-hover:scale-105"
                              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                          </div>
                        </div>
                        <div className="flex-1 p-4 sm:p-6 lg:p-8">
                          <div className="mb-4 flex flex-col lg:flex-row lg:items-start lg:justify-between">
                            <div className="flex-1">
                              <h3 className="mb-2 text-xl font-bold text-gray-900 italic transition-colors duration-300 group-hover:text-[#DED308] sm:text-2xl">
                                {ex.title}
                              </h3>
                              {ex.venue && (
                                <p className="mb-1 text-base text-gray-600 sm:text-lg">
                                  {ex.venue}
                                </p>
                              )}
                            </div>
                            <div className="mt-2 lg:mt-0">
                              <span className="inline-block bg-[#DED308] px-3 py-2 text-sm font-medium text-white transition-colors duration-300 group-hover:bg-[#C4BB07] sm:px-4">
                                {ex.date}
                              </span>
                            </div>
                          </div>

                          {ex.description && (
                            <p className="mb-6 leading-relaxed text-gray-600">{ex.description}</p>
                          )}

                          {ex.link && (
                            <Link
                              href={ex.link}
                              className="inline-flex items-center border border-transparent bg-[#DED308] px-6 py-3 text-base font-medium text-white transition-all duration-300 hover:scale-105 hover:bg-[#C4BB07] hover:shadow-lg"
                            >
                              View Details
                              <svg
                                className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                                />
                              </svg>
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
