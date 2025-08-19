'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

interface SectionData {
  id: number
  title: string
  content: string
  imagePath: string
  imageAlt: string
}

interface AboutSectionsProps {
  coveredByYourGrace: {
    className: string
  }
}

export default function AboutSections({ coveredByYourGrace }: AboutSectionsProps) {
  const [visibleSections, setVisibleSections] = useState<number[]>([])
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([])

  // Sample data - replace with your actual content
  const sections: SectionData[] = [
    {
      id: 1,
      title: "Aneira's Artist Statment",
      content:
        'Aneira Thomas’s practice explores her deep connection with nature and produces surfaces full of movement, patterns and layers. Whilst reminiscing her memories, she pulls visual prompts from organic details of nature as a symbol of time passing. Through bright colourful surfaces, Thomas longs to feel connected to nature and explores this relationship through mark making. Her practice includes many slower paced methods such as extracting natural pigments, making canvas stretcher bars and using traditional painting techniques. These methods encourage her audience to slow their pace, reflect on their memories and regain a bond with the natural world. Thomas approaches her work using a variety of mediums, which allows her to work with several layers that weave into one harmonious surface.',
      imagePath: '/static/images/AneiraWorking1.jpeg',
      imageAlt: 'Aneira in her early years',
    },
    {
      id: 2,
      title: 'Connection to Nature',
      content: '',
      imagePath: '/static/images/AneiraWorking2.jpeg',
      imageAlt: "Aneira's nature-inspired work",
    },
    {
      id: 3,
      title: 'Artistic Philosophy',
      content: '',
      imagePath: '/static/images/AneiraWorking3.jpeg',
      imageAlt: 'Aneira in her studio',
    },
  ]

  useEffect(() => {
    sectionRefs.current = sectionRefs.current.slice(0, sections.length)

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = parseInt(entry.target.getAttribute('data-id') || '0')
          if (entry.isIntersecting) {
            setVisibleSections((prev) => (prev.includes(id) ? prev : [...prev, id]))
          }
        })
      },
      {
        threshold: 0.2,
        rootMargin: '0px 0px -10% 0px',
      }
    )

    sectionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => observer.disconnect()
  }, [sections.length])

  return (
    <div className="w-full py-12" style={{ width: '100vw' }}>
      {sections.map((section, index) => {
        const isEven = index % 2 === 1
        const isVisible = visibleSections.includes(section.id)

        return (
          <div
            key={section.id}
            ref={(el) => {
              sectionRefs.current[index] = el
            }}
            data-id={section.id}
            className={`flex flex-col ${isEven ? 'md:flex-row-reverse' : 'md:flex-row'} mb-24 items-center gap-8 px-8 transition-all duration-1000 ease-out md:px-16 lg:px-24 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
            }`}
          >
            {/* Image */}
            <div className="w-full md:w-1/2">
              <div className="relative aspect-[4/3] w-full overflow-hidden shadow-xl">
                <Image
                  src={section.imagePath}
                  alt={section.imageAlt}
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>

            {/* Text */}
            <div className="w-full md:w-1/2">
              <div
                className={`transition-all delay-300 duration-1000 ${
                  isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                }`}
              >
                <h2
                  className={`${coveredByYourGrace.className} mb-4 text-3xl drop-shadow-md`}
                  style={{ color: '#DED308' }}
                >
                  {section.title}
                </h2>
                <p className="text-lg leading-relaxed text-white" style={{ fontFamily: 'Menlo' }}>
                  {section.content}
                </p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
