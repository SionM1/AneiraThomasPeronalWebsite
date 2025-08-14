'use client'

import { ThemeProvider } from 'next-themes'
import siteMetadata from '@/data/siteMetadata'
import type { ReactNode } from 'react'

interface ThemeProvidersProps {
  children: ReactNode
}

export function ThemeProviders({ children }: ThemeProvidersProps) {
  return (
    // @ts-ignore - next-themes type issue with children prop
    <ThemeProvider attribute="class" defaultTheme={siteMetadata.theme} enableSystem>
      {children}
    </ThemeProvider>
  )
}
