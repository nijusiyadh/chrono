import { TimerOptionSelector } from '@/components/molecules'
import React from 'react'
import { TimeChart } from '../time-chart'

export const TimerOptions = () => {
  return (
    <div className='flex w-full flex-col items-center justify-center gap-8 pb-20'>
      <TimerOptionSelector />
      <TimeChart />
    </div>
  )
}
