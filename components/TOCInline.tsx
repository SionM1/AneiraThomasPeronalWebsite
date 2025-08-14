import React from 'react'

interface TOCInlineProps {
  toc: Array<{
    value: string
    url: string
    depth: number
  }>
  indentDepth?: number
  fromHeading?: number
  toHeading?: number
  asDisclosure?: boolean
  exclude?: string | string[]
}

const TOCInline: React.FC<TOCInlineProps> = ({
  toc,
  indentDepth = 3,
  fromHeading = 1,
  toHeading = 6,
  asDisclosure = false,
  exclude = '',
}) => {
  if (!toc || toc.length === 0) {
    return null
  }

  const filteredToc = toc.filter(
    (heading) =>
      heading.depth >= fromHeading && heading.depth <= toHeading && !exclude.includes(heading.value)
  )

  const tocList = (
    <ul className="mt-4">
      {filteredToc.map((heading) => (
        <li key={heading.value} className={`py-1`}>
          <a
            href={heading.url}
            className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
            style={{
              paddingLeft: `${(heading.depth - fromHeading) * 1}rem`,
            }}
          >
            {heading.value}
          </a>
        </li>
      ))}
    </ul>
  )

  return asDisclosure ? (
    <details open>
      <summary className="ml-6 pt-2 pb-2 text-xl font-bold">Table of Contents</summary>
      <div className="ml-6">{tocList}</div>
    </details>
  ) : (
    tocList
  )
}

export default TOCInline
