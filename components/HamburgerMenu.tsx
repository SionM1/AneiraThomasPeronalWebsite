'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import Link from './Link'
import headerNavLinks from '@/data/headerNavLinks'

const BRAND_YELLOW = '#DED308'
const PANEL_WIDTH = 'min(320px, 75vw)' // Responsive: smaller on mobile but still usable
const MIDDLE_FADE_LEAD_MS = 80 // middle bar disappears ~80 ms sooner

// match the original demo
const BAR_MS = 500
const PANEL_MS = 500
const EASE = 'cubic-bezier(0.77, 0.2, 0.05, 1.0)'

export default function HamburgerMenu() {
  const [open, setOpen] = useState(false) // single source of truth
  const [animating, setAnimating] = useState(false) // keeps bars black during close
  const pathname = usePathname()

  useEffect(() => {
    setOpen(false)
    setAnimating(false)
  }, [pathname])

  const toggle = () => {
    setAnimating(true)
    setOpen((v) => !v)
  }

  const onDrawerTransitionEnd = () => setAnimating(false)

  const barColor = open || animating ? '#000' : BRAND_YELLOW

  return (
    <>
      {/* click catcher */}
      <div
        className={`fixed inset-0 z-[900] ${open ? '' : 'pointer-events-none'}`}
        style={{ backgroundColor: 'transparent' }}
        onClick={toggle}
        onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && toggle()}
        role="button"
        tabIndex={open ? 0 : -1}
        aria-label="Close menu"
      />

      {/* right drawer */}
      <nav
        aria-hidden={!open}
        className="fixed top-0 right-0 z-[920] h-screen w-3/4 sm:w-2/3 md:w-1/2 lg:w-96"
        style={{
          backgroundColor: BRAND_YELLOW,
          transform: open ? 'translate3d(0,0,0)' : 'translate3d(100%,0,0)',
          transition: `transform ${PANEL_MS}ms ${EASE}`,
          willChange: 'transform',
        }}
        onTransitionEnd={onDrawerTransitionEnd}
      >
        <ul className="mt-24 space-y-3 pr-6 pl-12 md:pl-16 lg:pl-20">
          {headerNavLinks.map((link) => (
            <li key={link.title}>
              <Link
                href={link.href}
                onClick={toggle}
                className="block py-3 text-xl"
                style={{ color: '#000', fontFamily: 'Menlo', fontWeight: 'bold' }}
              >
                {link.title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* button */}
      <button
        aria-label="Toggle menu"
        aria-expanded={open}
        onClick={toggle}
        className="fixed top-6 right-6 z-[980] h-8 w-10"
      >
        {/* top bar */}
        <span
          className="absolute top-0 right-0 left-0 h-[3px] rounded-full"
          style={{
            backgroundColor: barColor,
            transformOrigin: '50% 50%',
            transform: open ? 'translateY(10px) rotate(45deg)' : 'translateY(0) rotate(0deg)',
            transition: `transform ${BAR_MS}ms ${EASE}, background-color ${BAR_MS}ms ${EASE}`,
            willChange: 'transform',
          }}
        />
        {/* middle bar */}
        <span
          className="absolute top-[10px] right-0 left-0 h-[3px] rounded-full"
          style={{
            backgroundColor: barColor,
            opacity: open ? 0 : 1,
            transition: `opacity ${Math.max(0, BAR_MS - MIDDLE_FADE_LEAD_MS)}ms ${EASE}, background-color ${BAR_MS}ms ${EASE}`,
            willChange: 'opacity',
          }}
        />
        {/* bottom bar */}
        <span
          className="absolute top-[20px] right-0 left-0 h-[3px] rounded-full"
          style={{
            backgroundColor: barColor,
            transformOrigin: '50% 50%',
            transform: open ? 'translateY(-10px) rotate(-45deg)' : 'translateY(0) rotate(0deg)',
            transition: `transform ${BAR_MS}ms ${EASE}, background-color ${BAR_MS}ms ${EASE}`,
            willChange: 'transform',
          }}
        />
      </button>
    </>
  )
}
