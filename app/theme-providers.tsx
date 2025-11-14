'use client'

import { ThemeProvider } from 'next-themes'
import type { ReactNode } from 'react'

interface ThemeProvidersProps {
  children: ReactNode
}

export function ThemeProviders({ children }: ThemeProvidersProps) {
  return (
    // @ts-ignore - next-themes type issue with children prop
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} forcedTheme="light">
      {children}
    </ThemeProvider>
  )
}
