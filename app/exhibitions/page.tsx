import { Metadata } from 'next'
import { Covered_By_Your_Grace } from 'next/font/google'
import ExhibitionTimeline from '@/components/ExhibitionTimeline'
import { genPageMetadata } from 'app/seo'

const coveredByYourGrace = Covered_By_Your_Grace({
  weight: '400',
  subsets: ['latin'],
})

export const metadata: Metadata = genPageMetadata({ title: 'Exhibitions' })

// Sample exhibition data - replace with your actual data
const exhibitions = [
  {
    id: 1,
    title: "Solo Exhibition: 'Chromatic Visions'",
    venue: 'Modern Art Gallery, London',
    date: 'June 2023',
    description:
      'A solo exhibition featuring a collection of abstract works exploring the relationship between color and emotion. The exhibition showcased 15 new paintings created over the course of two years.',
    imagePath: '/static/images/gallery/CynffonYTan.jpeg',
    link: '/exhibitions/chromatic-visions',
  },
  {
    id: 2,
    title: "Group Show: 'New Perspectives'",
    venue: 'Contemporary Arts Center, Cardiff',
    date: 'March 2023',
    description:
      'A curated selection of works by emerging Welsh artists, examining themes of identity and place in contemporary society. Featured alongside five other notable artists from the region.',
    imagePath: '/static/images/gallery/Duckie.jpeg',
  },
  {
    id: 3,
    title: "Annual Exhibition: 'Reflections'",
    venue: 'Royal Academy of Arts, London',
    date: 'November 2022',
    description:
      "Participated in this prestigious annual exhibition showcasing the best of contemporary British art. My piece 'Mapping the Changing Colours' was selected from over 3,000 submissions.",
    imagePath: '/static/images/gallery/MappingtheChangingColours.jpeg',
  },
  {
    id: 4,
    title: 'International Art Fair',
    venue: 'Saatchi Gallery, London',
    date: 'September 2022',
    description:
      'Featured artist at this international art fair, presenting a series of works exploring themes of nature and transformation. The exhibition attracted collectors and art enthusiasts from around the world.',
    imagePath: '/static/images/gallery/SlugTrail.jpeg',
  },
  {
    id: 5,
    title: 'Emerging Artists Showcase',
    venue: 'Tate Modern, London',
    date: 'May 2022',
    description:
      'Selected for this special showcase highlighting the work of promising emerging artists. The exhibition provided a platform for experimental approaches and innovative techniques.',
    imagePath: '/static/images/gallery/WiltedOrchidNo.1.jpeg',
  },
]

export default function ExhibitionsPage() {
  return (
    <>
      {/* Exhibitions Section - Break Out of SectionContainer */}
      <div className="absolute left-1/2 w-screen -translate-x-1/2 transform">
        <div className="w-full bg-white py-24" style={{ width: '100vw' }}>
          {/* Aneira Thomas Header - Top Left Position (scrolls naturally) */}
          <div className="absolute top-6 left-8 z-[60]">
            <h1 className={`${coveredByYourGrace.className} text-5xl`} style={{ color: '#DED308' }}>
              Aneira Thomas
            </h1>
          </div>

          {/* Section Title - Left Aligned with Divider */}
          <div className="w-full px-8 pt-32 sm:px-16 lg:px-24 xl:px-32 2xl:px-48">
            <div className="mb-12 w-full">
              <h2
                className="mb-6 text-5xl md:text-6xl"
                style={{ color: '#DED308', fontFamily: 'Menlo', fontWeight: 'bold' }}
              >
                Exhibitions
              </h2>
            </div>
            {/* Divider Line */}
            <div className="mb-16 w-full border-b border-gray-200"></div>
          </div>

          {/* Timeline Content */}
          <div className="w-full">
            <ExhibitionTimeline exhibitions={exhibitions} />
          </div>
        </div>
      </div>

      {/* Spacer to maintain layout flow */}
      <div className="min-h-screen"></div>
    </>
  )
}
