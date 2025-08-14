import React from 'react'

interface PreProps {
  children: React.ReactNode
  className?: string
}

const Pre: React.FC<PreProps> = ({ children, ...props }) => {
  return (
    <pre {...props} className="overflow-x-auto rounded-md bg-gray-800 p-4 text-sm text-gray-100">
      {children}
    </pre>
  )
}

export default Pre
