'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

interface AdminBarProps {
  editHref: string
  editLabel: string
}

export default function AdminBar({ editHref, editLabel }: AdminBarProps) {
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    setIsAdmin(document.cookie.includes('keystatic-gh-access-token'))
  }, [])

  if (!isAdmin) return null

  return (
    <div className="fixed right-4 bottom-4 z-[200] flex items-center gap-2 rounded-full bg-[#DED308] px-4 py-2 shadow-xl">
      <svg className="h-4 w-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
        />
      </svg>
      <Link href={editHref} className="text-sm font-semibold text-white hover:underline">
        {editLabel}
      </Link>
      <span className="text-white/60">|</span>
      <Link href="/keystatic" className="text-sm font-medium text-white hover:underline">
        Admin
      </Link>
    </div>
  )
}
