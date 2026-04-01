import { Metadata } from 'next'
import { Covered_By_Your_Grace } from 'next/font/google'
import ExhibitionTimeline from '@/components/ExhibitionTimeline'
import AdminBar from '@/components/AdminBar'
import { getAllExhibitions } from '@/data/exhibitionsData'
import { genPageMetadata } from 'app/seo'

const coveredByYourGrace = Covered_By_Your_Grace({
  weight: '400',
  subsets: ['latin'],
})

export const metadata: Metadata = genPageMetadata({ title: 'Exhibitions and Awards' })

export default function ExhibitionsPage() {
  const exhibitions = getAllExhibitions()

  return (
    <>
      <div className="absolute left-1/2 w-screen -translate-x-1/2 transform">
        <div className="w-full bg-white py-16 sm:py-24" style={{ width: '100vw' }}>
          {/* Header */}
          <div className="absolute top-4 left-4 z-[60] sm:top-6 sm:left-8">
            <h1
              className={`${coveredByYourGrace.className} text-3xl sm:text-4xl md:text-5xl`}
              style={{ color: '#DED308' }}
            >
              Aneira Thomas
            </h1>
          </div>

          {/* Section Title */}
          <div className="w-full px-4 pt-32 sm:px-8 md:px-16 lg:px-24 xl:px-32 2xl:px-48">
            <div className="mb-12 w-full">
              <h2
                className="mb-6 text-3xl sm:text-4xl md:text-5xl lg:text-6xl"
                style={{ color: '#DED308', fontFamily: 'Menlo', fontWeight: 'bold' }}
              >
                Exhibitions and Awards
              </h2>
              <div className="w-full border-b border-gray-200"></div>
            </div>
          </div>

          {/* Timeline */}
          <div className="w-full pb-32">
            <ExhibitionTimeline exhibitions={exhibitions} />
          </div>
        </div>
      </div>

      {/* Spacer for footer */}
      <div className="h-32"></div>

      <AdminBar editHref="/keystatic/collection/exhibitions" editLabel="Edit Exhibitions" />
    </>
  )
}
