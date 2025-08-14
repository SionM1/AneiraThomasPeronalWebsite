'use client'

import { useEffect, useRef, useState } from 'react'
import { Covered_By_Your_Grace } from 'next/font/google'
import Image from 'next/image'

const coveredByYourGrace = Covered_By_Your_Grace({
  weight: '400',
  subsets: ['latin'],
})

export default function AboutPage() {
  const [isVisible, setIsVisible] = useState(false) // Start hidden for proper animation
  const sectionRef = useRef<HTMLDivElement>(null)

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

  return (
    <>
      {/* About Section - Break Out of SectionContainer */}
      <div className="absolute left-1/2 w-screen -translate-x-1/2 transform">
        <div
          ref={sectionRef}
          className={`w-full bg-white py-24 transition-all duration-1000 ease-out ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
          }`}
          style={{ width: '100vw' }}
        >
          {/* Aneira Thomas Header - Top Left Position (scrolls naturally) */}
          <div className="absolute top-6 left-8 z-[60]">
            <h1 className={`${coveredByYourGrace.className} text-5xl`} style={{ color: '#DED308' }}>
              Aneira Thomas
            </h1>
          </div>

          {/* Section Title - Left Aligned with Divider */}
          <div className="w-full px-8 pt-32 sm:px-16 lg:px-24 xl:px-32 2xl:px-48">
            <div
              className={`mb-12 w-full transition-all duration-1200 ease-out ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              }`}
              style={{ transitionDelay: '200ms' }}
            >
              <h2
                className="mb-6 text-5xl md:text-6xl"
                style={{ color: '#DED308', fontFamily: 'Menlo', fontWeight: 'bold' }}
              >
                About
              </h2>
            </div>
            {/* Divider Line */}
            <div className="mb-16 w-full border-b border-gray-200"></div>
          </div>

          {/* Content Sections - Contained Width */}
          <div
            className={`w-full transition-all duration-1200 ease-out ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
            }`}
            style={{ transitionDelay: '400ms' }}
          >
            <div className="w-full px-8 sm:px-16 lg:px-24 xl:px-32 2xl:px-48">
              <div className="w-full space-y-32">
                {/* Artist Background Section */}
                <div
                  className={`grid grid-cols-12 items-start gap-x-12 gap-y-12 transition-all duration-800 ease-out ${
                    isVisible
                      ? 'translate-y-0 scale-100 opacity-100'
                      : 'translate-y-12 scale-95 opacity-0'
                  }`}
                  style={{ transitionDelay: '600ms' }}
                >
                  <div className="col-span-12 w-full lg:col-span-5 xl:col-span-6">
                    <div className="prose prose-xl w-full max-w-none">
                      <p
                        className="mb-6 max-w-none text-lg leading-relaxed text-gray-900"
                        style={{ fontFamily: 'Menlo', lineHeight: '1.7' }}
                      >
                        Aneira Thomas is a contemporary artist whose work explores the intricate
                        relationship between human emotion and the natural world. Growing up
                        surrounded by the rolling hills and ancient woodlands of Wales, she
                        developed an early fascination with the way light moves through landscapes
                        and how organic forms can express the ineffable.
                      </p>

                      <p
                        className="max-w-none text-lg leading-relaxed text-gray-900"
                        style={{ fontFamily: 'Menlo', lineHeight: '1.7' }}
                      >
                        Her artistic journey began in childhood, sketching the changing seasons from
                        her bedroom window. This intimate observation of nature's rhythms became the
                        foundation for her mature practice, where she translates fleeting moments of
                        natural beauty into lasting visual experiences.
                      </p>
                    </div>
                  </div>

                  <div className="col-span-12 w-full lg:col-span-7 xl:col-span-6">
                    <div className="relative aspect-[3/2] w-full overflow-hidden border-2 border-gray-200">
                      <Image
                        src="/static/images/AneiraWorking1.jpeg"
                        alt="Aneira Thomas in her studio, surrounded by natural materials and works in progress"
                        fill
                        className="h-auto w-full object-cover object-center"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        priority
                      />
                    </div>
                  </div>
                </div>

                {/* Connection to Nature Section */}
                <div
                  className={`grid grid-cols-12 items-start gap-x-12 gap-y-12 transition-all duration-800 ease-out ${
                    isVisible
                      ? 'translate-y-0 scale-100 opacity-100'
                      : 'translate-y-12 scale-95 opacity-0'
                  }`}
                  style={{ transitionDelay: '750ms' }}
                >
                  <div className="col-span-12 w-full lg:col-span-5 xl:col-span-6">
                    <div className="prose prose-xl w-full max-w-none">
                      <h2
                        className={`${coveredByYourGrace.className} mb-6 max-w-none text-3xl`}
                        style={{ color: '#DED308' }}
                      >
                        Connection to Nature
                      </h2>

                      <p
                        className="mb-6 max-w-none text-lg leading-relaxed text-gray-900"
                        style={{ fontFamily: 'Menlo', lineHeight: '1.7' }}
                      >
                        Nature serves as both muse and teacher in Aneira's artistic practice. She
                        finds inspiration in the subtle interplay of shadow and light filtering
                        through forest canopies, the delicate architecture of seed pods, and the
                        weathered textures of ancient stone walls. These organic elements inform her
                        choice of materials and techniques, creating works that feel alive with
                        natural energy.
                      </p>

                      <p
                        className="max-w-none text-lg leading-relaxed text-gray-900"
                        style={{ fontFamily: 'Menlo', lineHeight: '1.7' }}
                      >
                        Her process often begins outdoors, where she collects fragments of bark,
                        pressed flowers, and sketches of cloud formations. Back in her studio, these
                        gathered elements become the starting point for paintings and mixed-media
                        works that capture not just the appearance of nature, but its essential
                        spirit.
                      </p>
                    </div>
                  </div>

                  <div className="col-span-12 w-full lg:col-span-7 xl:col-span-6">
                    <div className="relative aspect-[3/2] w-full overflow-hidden border-2 border-gray-200">
                      <Image
                        src="/static/images/AneiraWorking2.jpeg"
                        alt="Aneira Thomas working with natural materials in her creative process"
                        fill
                        className="h-auto w-full object-cover object-center"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                      />
                    </div>
                  </div>
                </div>

                {/* Philosophy Section */}
                <div
                  className={`grid grid-cols-12 items-start gap-x-12 gap-y-12 transition-all duration-800 ease-out ${
                    isVisible
                      ? 'translate-y-0 scale-100 opacity-100'
                      : 'translate-y-12 scale-95 opacity-0'
                  }`}
                  style={{ transitionDelay: '900ms' }}
                >
                  <div className="col-span-12 w-full lg:col-span-5 xl:col-span-6">
                    <div className="prose prose-xl w-full max-w-none">
                      <h2
                        className={`${coveredByYourGrace.className} mb-6 max-w-none text-3xl`}
                        style={{ color: '#DED308' }}
                      >
                        Philosophy
                      </h2>

                      <p
                        className="mb-6 max-w-none text-lg leading-relaxed text-gray-900"
                        style={{ fontFamily: 'Menlo', lineHeight: '1.7' }}
                      >
                        At the heart of Aneira's work lies a belief that art can serve as a bridge
                        between the human experience and the natural world. She approaches each
                        piece with reverence for the materials themselves, allowing their inherent
                        qualities to guide the creative process rather than imposing a predetermined
                        vision.
                      </p>

                      <p
                        className="max-w-none text-lg leading-relaxed text-gray-900"
                        style={{ fontFamily: 'Menlo', lineHeight: '1.7' }}
                      >
                        Through her ongoing exploration of texture, color, and form, Aneira
                        continues to develop a body of work that invites viewers to slow down and
                        reconnect with the quiet wisdom found in nature's patterns. Her art serves
                        as a gentle reminder of our deep interdependence with the living world
                        around us.
                      </p>
                    </div>
                  </div>

                  <div className="col-span-12 w-full lg:col-span-7 xl:col-span-6">
                    <div className="relative aspect-[3/2] w-full overflow-hidden border-2 border-gray-200">
                      <Image
                        src="/static/images/AneiraWorking3.jpeg"
                        alt="Aneira Thomas in her artistic environment, connecting with nature-inspired elements"
                        fill
                        className="h-auto w-full object-cover object-center"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                      />
                    </div>
                  </div>
                </div>
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
