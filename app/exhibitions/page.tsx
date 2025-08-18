import { Metadata } from 'next'
import { Covered_By_Your_Grace } from 'next/font/google'
import ExhibitionTimeline from '@/components/ExhibitionTimeline'
import { genPageMetadata } from 'app/seo'

const coveredByYourGrace = Covered_By_Your_Grace({
  weight: '400',
  subsets: ['latin'],
})

export const metadata: Metadata = genPageMetadata({ title: 'Exhibitions and Awards' })

// Exhibitions and Awards data
const exhibitions = [
  {
    id: 1,
    title: 'Confab, MFA final exhibition',
    venue: 'CSAD, Cardiff Metropolitan University, CF5 2YB',
    date: '11th-15th July 2025',
    description: '',
    imagePath: '/static/images/Website exhibition posters/Confab.JPG',
  },
  {
    id: 2,
    title: 'Open 2025, BayArt exhibition',
    venue: '54B/C Bute Street, Cardiff Bay, CF10 5AF',
    date: '18th April-31st May 2025',
    description: '',
    imagePath: '/static/images/Website exhibition posters/poster open call 2025.JPEG',
  },
  {
    id: 3,
    title: 'The Hari x Woolff all-female exhibition, The Graduate Art Show',
    venue: 'The Hari, 20 Chesham Place, London, SW1X 8HQ',
    date: 'March-September 2025',
    description: '',
    imagePath: '/static/images/Website exhibition posters/TheHarixWoolff.JPG',
  },
  {
    id: 4,
    title: 'Public Vote Emerging Art Prize Winner, New Blood Art',
    venue: '',
    date: '2025',
    description: '',
    imagePath:
      '/static/images/Website exhibition posters/New Blood Art Emerging Art Prize 2024 Nomination.JPG',
  },
  {
    id: 5,
    title: 'The Graduate Art Show, at the Woolff Gallery',
    venue: '89 Charlotte St, London, W1T 4PU',
    date: '15th November-3rd December 2024',
    description: '',
    imagePath: '/static/images/Website exhibition posters/thehari.jpg',
  },
  {
    id: 6,
    title: 'Circus, MFA mid year exhibition',
    venue: 'Umbrella Gallery, Capitol Centre, CF10 2HQ',
    date: '28th November-1st December 2024',
    description: '',
    imagePath: '/static/images/Website exhibition posters/Circus, MFA mid year exhibitio.JPG',
  },
  {
    id: 7,
    title: 'New Blood Art Emerging Art Prize 2024 Nomination+Shortlisted',
    venue: '',
    date: '2024',
    description: '',
    imagePath:
      '/static/images/Website exhibition posters/New Blood Art Emerging Art Prize 2024 Nomination.JPG',
  },
  {
    id: 8,
    title: 'Helen Gregory Memorial Purchase Prize Award',
    venue: '',
    date: '2024',
    description: '',
    imagePath:
      '/static/images/Website exhibition posters/Helen Gregory Memorial Purchase Prize Award.jpeg',
  },
  {
    id: 9,
    title: "I'w Barhau, Fine Art final degree show",
    venue: 'CSAD, Cardiff Metropolitan University, CF5 2YB',
    date: '7th-12th June 2024',
    description: '',
    imagePath: '/static/images/Website exhibition posters/iwbarhau.jpg',
  },
  {
    id: 10,
    title: 'Dahlia Art Collective Show',
    venue: 'The Alcove Space, CSAD, Cardiff Metropolitan University, CF5 2YB',
    date: '15th-19th April 2024',
    description: '',
    imagePath: '/static/images/Website exhibition posters/Dahlia Art Collective Show.jpg',
  },
  {
    id: 11,
    title: 'Undod, Fine Art Level 6 winter exhibition',
    venue: '54B/C Bute Street, Cardiff Bay, CF10 5AF',
    date: '8th-10th December 2023',
    description: '',
    imagePath:
      '/static/images/Website exhibition posters/Undod, Fine Art Level 6 winter exhibition.JPG',
  },
  {
    id: 12,
    title: 'Everything but the kitchen sink, Fine Art+Photography Level 5 end of year exhibition',
    venue: 'Umbrella Gallery, Capitol Centre, CF10 2HQ',
    date: '4th-5th April 2023',
    description: '',
    imagePath: '/static/images/Website exhibition posters/Everything but the kitchen sink.JPG',
  },
  {
    id: 13,
    title: 'Bysedd Mochyn, Fine Art Level 4 end of year exhibition',
    venue: 'Umbrella Gallery, Capitol Centre, CF10 2HQ',
    date: '13th-15th May 2022',
    description: '',
    imagePath: '/static/images/Website exhibition posters/Byseddmochyn.webp',
  },
]

export default function ExhibitionsPage() {
  return (
    <div className="relative left-1/2 min-h-screen w-screen -translate-x-1/2 transform">
      <div className="w-full bg-white py-16 sm:py-24" style={{ width: '100vw' }}>
        {/* Aneira Thomas Header - Top Left Position (scrolls naturally) */}
        <div className="absolute top-4 left-4 z-[60] sm:top-6 sm:left-8">
          <h1
            className={`${coveredByYourGrace.className} text-3xl sm:text-4xl md:text-5xl`}
            style={{ color: '#DED308' }}
          >
            Aneira Thomas
          </h1>
        </div>

        {/* Section Title - Left Aligned with Divider */}
        <div className="w-full px-4 pt-32 sm:px-8 md:px-16 lg:px-24 xl:px-32 2xl:px-48">
          <div className="mb-12 w-full">
            <h2
              className="mb-6 text-3xl sm:text-4xl md:text-5xl lg:text-6xl"
              style={{ color: '#DED308', fontFamily: 'Menlo', fontWeight: 'bold' }}
            >
              Exhibitions and Awards
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
  )
}
