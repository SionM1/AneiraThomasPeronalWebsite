'use client'

import { useEffect, useRef, useState } from 'react'
import { Covered_By_Your_Grace } from 'next/font/google'
import Image from 'next/image'

const coveredByYourGrace = Covered_By_Your_Grace({
  weight: '400',
  subsets: ['latin'],
})

export default function AboutPage() {
  const [isVisible, setIsVisible] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const sectionRef = useRef<HTMLDivElement>(null)

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

  // Parallax scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
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

        {/* Artist Statement Section */}
        <div className="w-full px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24 2xl:px-32">
          {/* Section Title */}
          <div className="mb-12 md:mb-16 lg:mb-20">
            <h3
              className="mb-4 text-3xl md:text-4xl lg:text-5xl"
              style={{ color: '#DED308', fontFamily: 'Menlo', fontWeight: 'bold' }}
            >
              Artist Statement
            </h3>
            <div className="w-24 border-b-2 border-gray-300"></div>
          </div>

          {/* Content with Parallax Images */}
          <div className="space-y-20 md:space-y-32 lg:space-y-40">
            {/* First Section */}
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16 xl:gap-20">
              <div className="space-y-6 lg:space-y-8">
                <p
                  className="text-base leading-relaxed text-gray-900 md:text-lg lg:text-xl"
                  style={{ fontFamily: 'Menlo', lineHeight: '1.7' }}
                >
                  My work explores the intricate relationship between human emotion and the natural
                  world. Growing up surrounded by the rolling hills and ancient woodlands of Wales,
                  I developed an early fascination with the way light moves through landscapes and
                  how organic forms can express the ineffable.
                </p>
                <p
                  className="text-base leading-relaxed text-gray-900 md:text-lg lg:text-xl"
                  style={{ fontFamily: 'Menlo', lineHeight: '1.7' }}
                >
                  My artistic journey began in childhood, sketching the changing seasons from my
                  bedroom window. This intimate observation of nature's rhythms became the
                  foundation for my mature practice, where I translate fleeting moments of natural
                  beauty into lasting visual experiences.
                </p>
              </div>
              <div
                className="relative order-first lg:order-none"
                style={{ transform: `translateY(${scrollY * 0.2}px)` }}
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden border-2 border-gray-200 shadow-lg md:aspect-[3/2] lg:aspect-[4/5]">
                  <Image
                    src="/static/images/AneiraWorking1.jpeg"
                    alt="Aneira Thomas in her studio"
                    fill
                    className="object-cover object-center transition-transform duration-700 hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority
                  />
                </div>
              </div>
            </div>

            {/* Second Section */}
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16 xl:gap-20">
              <div className="relative" style={{ transform: `translateY(${scrollY * -0.15}px)` }}>
                <div className="relative aspect-[4/3] w-full overflow-hidden border-2 border-gray-200 shadow-lg md:aspect-[3/2] lg:aspect-[4/5]">
                  <Image
                    src="/static/images/AneiraWorking2.jpeg"
                    alt="Aneira Thomas working with natural materials"
                    fill
                    className="object-cover object-center transition-transform duration-700 hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
              </div>
              <div className="space-y-6 lg:space-y-8">
                <p
                  className="text-base leading-relaxed text-gray-900 md:text-lg lg:text-xl"
                  style={{ fontFamily: 'Menlo', lineHeight: '1.7' }}
                >
                  Each piece begins with careful observation and collection of natural elements -
                  fragments of bark, pressed flowers, sketches of cloud formations. These gathered
                  materials become the starting point for paintings and mixed-media works that
                  capture not just the appearance of nature, but its essential spirit.
                </p>
                <p
                  className="text-base leading-relaxed text-gray-900 md:text-lg lg:text-xl"
                  style={{ fontFamily: 'Menlo', lineHeight: '1.7' }}
                >
                  I approach each work with reverence for the materials themselves, allowing their
                  inherent qualities to guide the creative process rather than imposing a
                  predetermined vision. Through ongoing exploration of texture, color, and form, I
                  continue to develop a body of work that invites viewers to slow down and reconnect
                  with the quiet wisdom found in nature's patterns.
                </p>
              </div>
            </div>

            {/* Third Section */}
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16 xl:gap-20">
              <div className="space-y-6 lg:space-y-8">
                <p
                  className="text-base leading-relaxed text-gray-900 md:text-lg lg:text-xl"
                  style={{ fontFamily: 'Menlo', lineHeight: '1.7' }}
                >
                  My art serves as a bridge between the human experience and the natural world,
                  creating works that feel alive with natural energy. The subtle interplay of shadow
                  and light, the delicate architecture of organic forms, and the weathered textures
                  of ancient surfaces all inform my choice of materials and techniques.
                </p>
                <p
                  className="text-base leading-relaxed text-gray-900 md:text-lg lg:text-xl"
                  style={{ fontFamily: 'Menlo', lineHeight: '1.7' }}
                >
                  Ultimately, my work serves as a gentle reminder of our deep interdependence with
                  the living world around us, encouraging a slower, more contemplative engagement
                  with the beauty that surrounds us every day.
                </p>
              </div>
              <div
                className="relative order-first lg:order-none"
                style={{ transform: `translateY(${scrollY * 0.25}px)` }}
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden border-2 border-gray-200 shadow-lg md:aspect-[3/2] lg:aspect-[4/5]">
                  <Image
                    src="/static/images/AneiraWorking3.jpeg"
                    alt="Aneira Thomas in her artistic environment"
                    fill
                    className="object-cover object-center transition-transform duration-700 hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
