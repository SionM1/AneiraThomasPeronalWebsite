'use client'

import React, { useState } from 'react'

interface BlogNewsletterFormProps {
  title?: string
  subtitle?: string
}

const BlogNewsletterForm: React.FC<BlogNewsletterFormProps> = ({
  title = 'Subscribe to the newsletter',
  subtitle = 'Get notified about new posts and updates',
}) => {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')

    // For now, just simulate a successful subscription
    setTimeout(() => {
      setStatus('success')
      setEmail('')
    }, 1000)
  }

  return (
    <div className="rounded-lg border border-gray-200 bg-gray-50 p-6 dark:border-gray-700 dark:bg-gray-800">
      <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
      <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">{subtitle}</p>

      {status === 'success' ? (
        <div className="text-center">
          <p className="text-green-600 dark:text-green-400">✅ Thank you for subscribing!</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            className="focus:border-primary-500 focus:ring-primary-500 rounded border border-gray-300 px-3 py-2 focus:ring-1 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
          />
          <button
            type="submit"
            disabled={status === 'loading'}
            className="bg-primary-600 hover:bg-primary-700 rounded px-4 py-2 text-white disabled:opacity-50"
          >
            {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
          </button>
        </form>
      )}
    </div>
  )
}

export default BlogNewsletterForm
