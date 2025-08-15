import Link from '@/components/Link'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import { formatDate } from 'pliny/utils/formatDate'
import NewsletterForm from 'pliny/ui/NewsletterForm'

const MAX_DISPLAY = 5

export default function Home({ posts }) {
  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      <div className="space-y-2 px-4 pt-6 pb-8 sm:px-6 md:space-y-5 lg:px-8">
        <h1 className="text-2xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-3xl sm:leading-9 md:text-4xl md:leading-10 lg:text-5xl lg:leading-12 xl:text-6xl xl:leading-14 dark:text-gray-100">
          Latest Posts
        </h1>
        <p className="text-base leading-6 text-gray-500 sm:text-lg sm:leading-7 dark:text-gray-400">
          {siteMetadata.description}
        </p>
      </div>
      <ul className="divide-y divide-gray-200 px-4 sm:px-6 lg:px-8 dark:divide-gray-700">
        {!posts.length && (
          <div className="py-8 text-center text-gray-500 dark:text-gray-400">No posts found.</div>
        )}
        {posts.slice(0, MAX_DISPLAY).map((post) => {
          const { slug, date, title, summary, tags } = post
          return (
            <li key={slug} className="py-8 sm:py-12">
              <article>
                <div className="space-y-4 sm:space-y-2 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0 xl:gap-x-6">
                  <dl>
                    <dt className="sr-only">Published on</dt>
                    <dd className="text-sm leading-6 font-medium text-gray-500 sm:text-base dark:text-gray-400">
                      <time dateTime={date}>{formatDate(date, siteMetadata.locale)}</time>
                    </dd>
                  </dl>
                  <div className="space-y-4 sm:space-y-5 xl:col-span-3">
                    <div className="space-y-4 sm:space-y-6">
                      <div>
                        <h2 className="text-xl leading-7 font-bold tracking-tight sm:text-2xl sm:leading-8">
                          <Link href={`/blog/${slug}`} className="text-gray-900 dark:text-gray-100">
                            {title}
                          </Link>
                        </h2>
                        <div className="mt-2 flex flex-wrap">
                          {tags.map((tag) => (
                            <Tag key={tag} text={tag} />
                          ))}
                        </div>
                      </div>
                      <div className="prose prose-sm sm:prose max-w-none text-gray-500 dark:text-gray-400">
                        {summary}
                      </div>
                    </div>
                    <div className="text-sm leading-6 font-medium sm:text-base">
                      <Link
                        href={`/blog/${slug}`}
                        className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400 touch-target inline-flex items-center"
                        aria-label={`Read more: "${title}"`}
                      >
                        Read more &rarr;
                      </Link>
                    </div>
                  </div>
                </div>
              </article>
            </li>
          )
        })}
      </ul>
      {posts.length > MAX_DISPLAY && (
        <div className="flex justify-end px-4 pt-8 text-sm leading-6 font-medium sm:px-6 sm:text-base lg:px-8">
          <Link
            href="/blog"
            className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400 touch-target inline-flex items-center"
            aria-label="All posts"
          >
            All Posts &rarr;
          </Link>
        </div>
      )}
      {siteMetadata.newsletter?.provider && (
        <div className="flex items-center justify-center px-4 pt-8 sm:px-6 lg:px-8">
          <NewsletterForm />
        </div>
      )}
    </div>
  )
}
