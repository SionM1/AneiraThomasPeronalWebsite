import { Metadata } from 'next'
import { Covered_By_Your_Grace } from 'next/font/google'
import Link from 'next/link'
import ContactForm from '@/components/ContactForm'
import AdminBar from '@/components/AdminBar'
import { genPageMetadata } from '../seo'
import fs from 'fs'
import path from 'path'

const coveredByYourGrace = Covered_By_Your_Grace({
  weight: '400',
  subsets: ['latin'],
})

export const metadata: Metadata = genPageMetadata({
  title: 'Contact',
  description:
    'Get in touch with Aneria Thomas for commissions, exhibitions, or general inquiries.',
})

export default function ContactPage() {
  const dataPath = path.join(process.cwd(), 'data/contact/content.json')
  const data = fs.existsSync(dataPath)
    ? (JSON.parse(fs.readFileSync(dataPath, 'utf8')) as Record<string, string>)
    : {}

  const email = data.email ?? 'aneirathomas@outlook.com'
  const location = data.location ?? 'Cardiff, Wales, UK'
  const responseTime = data.responseTime ?? 'Usually within 24-48 hours'
  const introText =
    data.introText ??
    "I'm always excited to discuss new projects, collaborate with fellow artists, or share insights about my work and process."

  return (
<<<<<<< HEAD
    <div className="w-full">
      {/* Aneira Thomas Header - Top Left Position */}
      <div className="absolute top-4 left-4 z-[60] sm:top-6 sm:left-8">
        <Link href="/">
=======
    <>
      <div className="w-full">
        {/* Header */}
        <div className="absolute top-4 left-4 z-[60] sm:top-6 sm:left-8">
>>>>>>> e56c611d50253d57be3c429d819d471008172b47
          <h1
            className={`${coveredByYourGrace.className} text-3xl sm:text-4xl md:text-5xl`}
            style={{ color: '#DED308' }}
          >
            Aneira Thomas
          </h1>
<<<<<<< HEAD
        </Link>
      </div>
=======
        </div>
>>>>>>> e56c611d50253d57be3c429d819d471008172b47

        <div className="w-full px-4 pt-32 pb-32 sm:px-8 md:px-16 lg:px-24 xl:px-32 2xl:px-48">
          <div className="grid grid-cols-1 gap-12 sm:gap-14 md:gap-16 lg:grid-cols-2">
            {/* Left: Title + Info */}
            <div className="space-y-6 sm:space-y-8">
              <div className="mb-12 w-full">
                <h2
                  className="mb-6 text-3xl sm:text-4xl md:text-5xl lg:text-6xl"
                  style={{ color: '#DED308', fontFamily: 'Menlo', fontWeight: 'bold' }}
                >
                  Contact
                </h2>
                <div className="w-full border-b border-gray-200"></div>
              </div>

              <div>
                <h2
                  className={`${coveredByYourGrace.className} mb-4 text-2xl sm:mb-6 sm:text-3xl md:text-4xl`}
                  style={{ color: '#DED308' }}
                >
                  Let&apos;s Connect
                </h2>
                <p className="mb-6 text-base text-gray-600 sm:mb-8 sm:text-lg">{introText}</p>
              </div>

              <div className="space-y-4 sm:space-y-6">
                {/* Email */}
                <div className="flex items-start space-x-3 sm:space-x-4">
                  <div className="flex-shrink-0">
                    <div className="flex h-8 w-8 items-center justify-center bg-[#DED308] sm:h-10 sm:w-10">
                      <svg
                        className="h-4 w-4 text-white sm:h-6 sm:w-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-gray-900 sm:text-lg">Email</h3>
                    <p className="text-sm text-gray-600 sm:text-base">{email}</p>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-start space-x-3 sm:space-x-4">
                  <div className="flex-shrink-0">
                    <div className="flex h-8 w-8 items-center justify-center bg-[#DED308] sm:h-10 sm:w-10">
                      <svg
                        className="h-4 w-4 text-white sm:h-6 sm:w-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-gray-900 sm:text-lg">Location</h3>
                    <p className="text-sm text-gray-600 sm:text-base">{location}</p>
                  </div>
                </div>

                {/* Response Time */}
                <div className="flex items-start space-x-3 sm:space-x-4">
                  <div className="flex-shrink-0">
                    <div className="flex h-8 w-8 items-center justify-center bg-[#DED308] sm:h-10 sm:w-10">
                      <svg
                        className="h-4 w-4 text-white sm:h-6 sm:w-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-gray-900 sm:text-lg">
                      Response Time
                    </h3>
                    <p className="text-sm text-gray-600 sm:text-base">{responseTime}</p>
                  </div>
                </div>
              </div>

              {/* Inquiry Types */}
              <div className="bg-gray-50 p-4 sm:p-6">
                <h3
                  className={`${coveredByYourGrace.className} mb-3 text-lg sm:mb-4 sm:text-xl`}
                  style={{ color: '#DED308' }}
                >
                  What I Can Help With
                </h3>
                <ul className="space-y-2 text-sm text-gray-600 sm:text-base">
                  {[
                    'Commission requests',
                    'Exhibition collaborations',
                    'Interview requests',
                    'General inquiries about my work',
                  ].map((item) => (
                    <li key={item} className="flex items-center space-x-2">
                      <svg
                        className="h-4 w-4 flex-shrink-0 text-[#DED308] sm:h-5 sm:w-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right: Contact Form */}
            <div>
              <ContactForm />
            </div>
          </div>
        </div>
      </div>

      <AdminBar section="Contact" />
    </>
  )
}
