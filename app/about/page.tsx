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
    <div className="relative left-1/2 min-h-screen w-screen -translate-x-1/2 transform">
      {/* About Section - Break Out of SectionContainer */}
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
              About
            </h2>
          </div>
          {/* Divider Line */}
          <div className="mb-8 w-full border-b border-gray-200 sm:mb-12 md:mb-16"></div>
        </div>

        {/* Content Sections - Contained Width */}
        <div
          className={`w-full transition-all duration-1200 ease-out ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
          }`}
          style={{ transitionDelay: '400ms' }}
        >
          <div className="w-full px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24 2xl:px-32">
            <div className="w-full space-y-16 sm:space-y-20 md:space-y-24 lg:space-y-32">
              {/* Artist Background Section */}
              <div
                className={`flex flex-col items-start gap-x-4 gap-y-6 transition-all duration-800 ease-out sm:gap-x-6 sm:gap-y-8 lg:grid lg:grid-cols-12 lg:gap-x-8 lg:gap-y-8 xl:gap-x-12 xl:gap-y-12 ${
                  isVisible
                    ? 'translate-y-0 scale-100 opacity-100'
                    : 'translate-y-12 scale-95 opacity-0'
                }`}
                style={{ transitionDelay: '600ms' }}
              >
                <div className="w-full lg:col-span-5 xl:col-span-6">
                  <div className="prose prose-sm sm:prose prose-lg lg:prose-xl w-full max-w-none">
                    <p
                      className="mb-3 max-w-none text-sm leading-relaxed text-gray-900 sm:mb-4 sm:text-base lg:mb-6 lg:text-lg"
                      style={{ fontFamily: 'Menlo', lineHeight: '1.7' }}
                    >
                      Aneira Thomas is a contemporary artist whose work explores the intricate
                      relationship between human emotion and the natural world. Growing up
                      surrounded by the rolling hills and ancient woodlands of Wales, she developed
                      an early fascination with the way light moves through landscapes and how
                      organic forms can express the ineffable.
                    </p>

                    <p
                      className="max-w-none text-sm leading-relaxed text-gray-900 sm:text-base lg:text-lg"
                      style={{ fontFamily: 'Menlo', lineHeight: '1.7' }}
                    >
                      Her artistic journey began in childhood, sketching the changing seasons from
                      her bedroom window. This intimate observation of nature's rhythms became the
                      foundation for her mature practice, where she translates fleeting moments of
                      natural beauty into lasting visual experiences.
                    </p>
                  </div>
                </div>

                <div className="order-first w-full lg:order-none lg:col-span-7 xl:col-span-6">
                  <div className="relative aspect-[4/3] w-full overflow-hidden border-2 border-gray-200 sm:aspect-[3/2]">
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
                className={`flex flex-col items-start gap-x-4 gap-y-6 transition-all duration-800 ease-out sm:gap-x-6 sm:gap-y-8 lg:grid lg:grid-cols-12 lg:gap-x-8 lg:gap-y-8 xl:gap-x-12 xl:gap-y-12 ${
                  isVisible
                    ? 'translate-y-0 scale-100 opacity-100'
                    : 'translate-y-12 scale-95 opacity-0'
                }`}
                style={{ transitionDelay: '750ms' }}
              >
                <div className="w-full lg:col-span-5 xl:col-span-6">
                  <div className="prose prose-sm sm:prose prose-lg lg:prose-xl w-full max-w-none">
                    <h2
                      className={`${coveredByYourGrace.className} mb-3 max-w-none text-xl sm:mb-4 sm:text-2xl lg:mb-6 lg:text-3xl`}
                      style={{ color: '#DED308' }}
                    >
                      Connection to Nature
                    </h2>

                    <p
                      className="mb-3 max-w-none text-sm leading-relaxed text-gray-900 sm:mb-4 sm:text-base lg:mb-6 lg:text-lg"
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
                      className="max-w-none text-sm leading-relaxed text-gray-900 sm:text-base lg:text-lg"
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

                <div className="w-full lg:col-span-7 xl:col-span-6">
                  <div className="relative aspect-[4/3] w-full overflow-hidden border-2 border-gray-200 sm:aspect-[3/2]">
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
                className={`flex flex-col items-start gap-x-4 gap-y-6 transition-all duration-800 ease-out sm:gap-x-6 sm:gap-y-8 lg:grid lg:grid-cols-12 lg:gap-x-8 lg:gap-y-8 xl:gap-x-12 xl:gap-y-12 ${
                  isVisible
                    ? 'translate-y-0 scale-100 opacity-100'
                    : 'translate-y-12 scale-95 opacity-0'
                }`}
                style={{ transitionDelay: '900ms' }}
              >
                <div className="w-full lg:col-span-5 xl:col-span-6">
                  <div className="prose prose-sm sm:prose prose-lg lg:prose-xl w-full max-w-none">
                    <h2
                      className={`${coveredByYourGrace.className} mb-3 max-w-none text-xl sm:mb-4 sm:text-2xl lg:mb-6 lg:text-3xl`}
                      style={{ color: '#DED308' }}
                    >
                      Philosophy
                    </h2>

                    <p
                      className="mb-3 max-w-none text-sm leading-relaxed text-gray-900 sm:mb-4 sm:text-base lg:mb-6 lg:text-lg"
                      style={{ fontFamily: 'Menlo', lineHeight: '1.7' }}
                    >
                      At the heart of Aneira's work lies a belief that art can serve as a bridge
                      between the human experience and the natural world. She approaches each piece
                      with reverence for the materials themselves, allowing their inherent qualities
                      to guide the creative process rather than imposing a predetermined vision.
                    </p>

                    <p
                      className="max-w-none text-sm leading-relaxed text-gray-900 sm:text-base lg:text-lg"
                      style={{ fontFamily: 'Menlo', lineHeight: '1.7' }}
                    >
                      Through her ongoing exploration of texture, color, and form, Aneira continues
                      to develop a body of work that invites viewers to slow down and reconnect with
                      the quiet wisdom found in nature's patterns. Her art serves as a gentle
                      reminder of our deep interdependence with the living world around us.
                    </p>
                  </div>
                </div>

                <div className="order-first w-full lg:order-none lg:col-span-7 xl:col-span-6">
                  <div className="relative aspect-[4/3] w-full overflow-hidden border-2 border-gray-200 sm:aspect-[3/2]">
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
  )
}
