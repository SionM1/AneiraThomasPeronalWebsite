import { Covered_By_Your_Grace } from 'next/font/google'
import projectsData from '@/data/projectsData'
import Card from '@/components/Card'
import { genPageMetadata } from 'app/seo'

const coveredByYourGrace = Covered_By_Your_Grace({
  weight: '400',
  subsets: ['latin'],
})

export const metadata = genPageMetadata({ title: 'Projects' })

export default function Projects() {
  return (
    <>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 px-4 pt-4 pb-6 sm:px-6 sm:pt-6 sm:pb-8 md:space-y-5 lg:px-8">
          <h1
            className={`${coveredByYourGrace.className} text-2xl leading-tight sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl`}
            style={{ color: '#DED308' }}
          >
            Projects
          </h1>
          <p className="text-base leading-6 text-gray-500 sm:text-lg sm:leading-7 dark:text-gray-400">
            Showcase your projects with a hero image (16 x 9)
          </p>
        </div>
        <div className="container px-4 py-8 sm:px-6 sm:py-10 md:py-12 lg:px-8">
          <div className="-m-2 flex flex-wrap sm:-m-4">
            {projectsData.map((d) => (
              <Card
                key={d.title}
                title={d.title}
                description={d.description}
                imgSrc={d.imgSrc}
                href={d.href}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
