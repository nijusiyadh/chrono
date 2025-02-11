import React from 'react'

export const LoadingSkeleton = () => {
  return (
    <div className='flex w-full max-w-6xl flex-col items-center justify-center gap-2'>
      <div className='h-14 w-full animate-pulse rounded-md bg-bg-secondary' />
      <div className='h-14 w-full animate-pulse rounded-md bg-bg-secondary' />
      <div className='h-14 w-full animate-pulse rounded-md bg-bg-secondary' />
    </div>
  )
}
