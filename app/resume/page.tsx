import { Covered_By_Your_Grace } from 'next/font/google'

const coveredByYourGrace = Covered_By_Your_Grace({
  weight: '400',
  subsets: ['latin'],
})

export default function Resume() {
  return (
    <div className="w-full py-12 sm:py-14 md:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h1
          className={`${coveredByYourGrace.className} mb-6 text-center text-3xl sm:mb-8 sm:text-4xl md:text-5xl lg:text-6xl`}
          style={{ color: '#DED308' }}
        >
          Resume
        </h1>
        <p
          className="text-center text-base text-gray-600 sm:text-lg"
          style={{ fontFamily: 'Menlo' }}
        >
          Coming soon...
        </p>
      </div>
    </div>
  )
}
