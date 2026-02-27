import type { Metadata } from 'next'
import HomeClient from './HomeClient'

export const metadata: Metadata = {
  title: 'Immuny - AI-Powered Immune Health',
  description: 'Track and optimize your immune health with personalized AI insights.',
}

export default function Page() {
  return <HomeClient />
}
