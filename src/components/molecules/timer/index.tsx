'use client'

import { ResetIcon } from '@/assets/images'
import { useAddEvent } from '@/hooks/api/useAddEvent'
import { toUTCFormat } from '@/utils/date-time'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { useStopwatch } from 'react-timer-hook'
import { format } from 'date-fns'
import { toast } from 'react-toastify'
import { CiPause1, CiPlay1 } from 'react-icons/ci'

export const Timer = () => {
  const { mutateAsync: addEvent, isPending } = useAddEvent()
  const [startTime, setStartTime] = useState<Date | null>(null)
  const [endTime, setEndTime] = useState<Date | null>(null)

  const {
    seconds,
    minutes,
    hours,
    isRunning,
    start,
    pause,
    totalSeconds,
    reset
  } = useStopwatch({ autoStart: false })

  const handlePlayButtonClick = async () => {
    if (!isRunning) {
      setStartTime(null)
      setEndTime(null)
      start()
      setStartTime(new Date())
    } else {
      pause()
      setEndTime(new Date())
      console.log(totalSeconds)
      await addEvent(
        {
          projectId: 2,
          startTime: format(
            new Date(startTime ?? ''),
            'yyyy-MM-dd HH:mm:ss.SSS'
          ),
          endTime: format(new Date(), 'yyyy-MM-dd HH:mm:ss.SSS'),
          duration: totalSeconds
        },
        {
          onSuccess: () => {
            toast.success('Event added successfully')
            setStartTime(null)
            setEndTime(null)
            reset()
            pause()
          },
          onError: () => {
            toast.error('Failed to add event')
          }
        }
      )
    }
  }

  useEffect(() => {
    console.log('start time', toUTCFormat(startTime))
    console.log('end time', toUTCFormat(endTime))
  }, [startTime, endTime])

  const handleResetButtonClick = () => {
    reset()
    pause()
  }

  return (
    <div className='flex flex-col items-center justify-center gap-11'>
      <div className='flex flex-col'>
        <span className='text-text-yellow flex items-center justify-center text-center text-[80px] font-normal leading-[105px]'>
          {hours < 10 ? `0${hours}` : hours}:
          {minutes < 10 ? `0${minutes}` : minutes}:
          <span className='font-light'>
            {seconds < 10 ? `0${seconds}` : seconds}
          </span>
        </span>
        <span className='text-text-faded text-center text-xl'>
          Total time tracked: 3hr 45m 52s
        </span>
      </div>
      <div className='flex items-start justify-center gap-5'>
        <button
          disabled={isPending}
          onClick={handlePlayButtonClick}
          className='border-text-yellow relative flex aspect-square w-14 items-center justify-center rounded-full border-2'
        >
          {isRunning ? (
            <CiPause1 className='text-text-yellow absolute left-1/2 top-1/2 size-6 -translate-x-1/2 -translate-y-1/2' />
          ) : (
            <CiPlay1 className='text-text-yellow absolute left-[53%] top-1/2 size-6 -translate-x-1/2 -translate-y-1/2' />
          )}
        </button>
        <button onClick={handleResetButtonClick} className='aspect-square w-14'>
          <Image src={ResetIcon} width={24} height={24} alt='reset button' />
        </button>
      </div>
    </div>
  )
}
