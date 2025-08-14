import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About | Aneira Thomas - Contemporary Artist',
  description:
    'Learn about Aneira Thomas, a contemporary artist exploring the relationship between human emotion and nature through her evocative paintings and mixed-media works.',
}

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children
}
