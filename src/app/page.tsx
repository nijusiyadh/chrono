'use client'
import { PreLoader } from '@/components/atoms'
import { Header, TimerHero } from '@/components/organisms'
import { Suspense } from 'react'

export default function Home() {
  return (
    <div>
      <Header />
      <Suspense fallback={<PreLoader />}>
        <TimerHero />
      </Suspense>
    </div>
  )
}
