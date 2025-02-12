'use client'

import React from 'react'
import { motion } from 'motion/react'

export const PreLoader = () => {
  return (
    <div className='fixed inset-0 z-50 flex h-screen w-full flex-col items-center justify-center gap-2 bg-bg-primary'>
      <div className='flex h-full flex-col items-center justify-center gap-2'>
        <div className='relative h-2 w-full overflow-hidden rounded-md bg-bg-secondary'>
          <motion.div
            initial={{
              left: '0%'
            }}
            animate={{
              left: '80%'
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: 'reverse',
              type: 'spring',
              stiffness: 50,
              damping: 20
            }}
            className='absolute bottom-0 left-0 top-0 z-20 w-[40px] rounded-md bg-text-yellow'
          />
        </div>
        <p className='text-center text-base text-text-white'>
          Fetching your data...
        </p>
      </div>
    </div>
  )
}
