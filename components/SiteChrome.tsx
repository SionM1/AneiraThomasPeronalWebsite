'use client'

import { usePathname } from 'next/navigation'
import HamburgerMenu from '@/components/HamburgerMenu'
import Footer from '@/components/Footer'
import { SearchProvider, SearchConfig } from 'pliny/search'
import siteMetadata from '@/data/siteMetadata'

export default function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isKeystatic = pathname?.startsWith('/keystatic')

  if (isKeystatic) {
    return <>{children}</>
  }

  return (
    <>
      <HamburgerMenu />
      <SearchProvider searchConfig={siteMetadata.search as SearchConfig}>
        <div className="min-h-screen">
          <main>{children}</main>
        </div>
        <Footer />
      </SearchProvider>
    </>
  )
}
