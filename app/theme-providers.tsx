'use client'

import { ThemeProvider } from 'next-themes'
import siteMetadata from '@/data/siteMetadata'
import type { ReactNode } from 'react'
import { useEffect, useState } from 'react'

interface ThemeProvidersProps {
  children: ReactNode
}

export function ThemeProviders({ children }: ThemeProvidersProps) {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768) // md breakpoint
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  return (
    // @ts-ignore - next-themes type issue with children prop
    <ThemeProvider
      attribute="class"
      defaultTheme={isMobile ? 'light' : siteMetadata.theme}
      enableSystem={!isMobile}
      forcedTheme={isMobile ? 'light' : undefined}
    >
      {children}
    </ThemeProvider>
  )
}
