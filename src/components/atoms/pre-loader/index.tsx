'use client'

import React from 'react'
import { motion } from 'motion/react'

export const PreLoader = () => {
  return (
    <div className='flex h-screen w-full flex-col items-center justify-center gap-2'>
      <div className='flex h-full flex-col items-center justify-center gap-2'>
        <div className='relative h-2 w-full overflow-hidden rounded-md bg-bg-secondary'>
          <motion.div
            initial={{
              width: '0%'
            }}
            animate={{
              width: '100%'
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatType: 'loop',
              ease: 'easeInOut'
            }}
            className='absolute bottom-0 left-0 top-0 z-20 w-[40%] rounded-md bg-text-yellow'
          />
        </div>
        <p className='text-center text-base text-text-white'>
          Fetching your data...
        </p>
      </div>
    </div>
  )
}
