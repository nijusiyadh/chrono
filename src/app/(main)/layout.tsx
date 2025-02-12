import { Header } from '@/components/organisms'
import React from 'react'

export default function MainLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <div className='flex w-full flex-col gap-10'>
      <Header showTimer={false} />
      <div className='px-28'>{children}</div>
    </div>
  )
}
