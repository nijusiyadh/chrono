'use client'

import { ResetIcon } from '@/assets/images'
import { useAddEvent } from '@/hooks/api'
import { formatTotalDuration } from '@/utils/date-time'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { useStopwatch } from 'react-timer-hook'
import { format } from 'date-fns'
import { toast } from 'sonner'
import { CiPause1, CiPlay1 } from 'react-icons/ci'
import { useGetLog } from '@/hooks/api'
import { AiOutlineLoading } from 'react-icons/ai'
import { useGlobalContext } from '@/providers'
import clsx from 'clsx'

export const Timer = () => {
  const { activeDate, activeProject } = useGlobalContext()
  const { mutateAsync: addEvent, isPending: isAddingEvent } = useAddEvent()
  const [startTime, setStartTime] = useState<Date | null>(null)
  const [isToday, setIsToday] = useState(true)

  const {
    data: logs,
    isLoading: isLoadingLogs,
    refetch: refetchLogs,
    isFetching: isFetchingLogs
  } = useGetLog(activeDate ?? undefined)

  useEffect(() => {
    if (activeDate) {
      refetchLogs()
    }
  }, [activeDate, refetchLogs])

  useEffect(() => {
    if (activeDate) {
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      const activeDateNew = new Date(activeDate)
      activeDateNew.setHours(0, 0, 0, 0)

      if (activeDateNew.getTime() === today.getTime()) {
        setIsToday(true)
      } else {
        setIsToday(false)
      }
    }
  }, [activeDate])

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

  const handleResetButtonClick = () => {
    reset(new Date(0), false)
  }

  const handlePlayButtonClick = async () => {
    if (!isRunning) {
      setStartTime(null)
      start()
      setStartTime(new Date())
    } else {
      pause()
      if (!activeProject) {
        return toast.error('Please select a project')
      }
      await addEvent(
        {
          projectId: activeProject?.id,
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
            handleResetButtonClick()
            setStartTime(null)
          },
          onError: () => {
            toast.error('Failed to add event')
          }
        }
      )
    }
  }

  return (
    <div className='flex flex-col items-center justify-center gap-11'>
      <div className='flex flex-col'>
        <span
          className={clsx(
            'flex items-center justify-center text-center text-[80px] font-normal leading-[105px]',
            {
              'text-text-yellow': isToday,
              'text-text-faded': !isToday
            }
          )}
        >
          {hours < 10 ? `0${hours}` : hours}:
          {minutes < 10 ? `0${minutes}` : minutes}:
          <span className='font-light'>
            {seconds < 10 ? `0${seconds}` : seconds}
          </span>
        </span>
        <span className='flex items-center justify-center gap-2 text-center text-xl text-text-faded'>
          Total time tracked:{' '}
          {isLoadingLogs || isFetchingLogs ? (
            <span>
              <AiOutlineLoading className='size-5 animate-spin text-text-white' />
            </span>
          ) : (
            <span>
              {formatTotalDuration(logs?.[0]?.totalDuration ?? 0) ?? 0}
            </span>
          )}
        </span>
      </div>
      <div className='flex items-start justify-center gap-5'>
        <button
          disabled={isAddingEvent || !isToday}
          onClick={handlePlayButtonClick}
          className={clsx(
            'relative flex aspect-square w-14 items-center justify-center rounded-full border-2',
            {
              'border-text-yellow': isToday,
              'border-text-faded': !isToday
            }
          )}
        >
          {isRunning ? (
            <CiPause1
              className={clsx(
                'absolute left-1/2 top-1/2 size-6 -translate-x-1/2 -translate-y-1/2',
                {
                  'text-text-yellow': isToday,
                  'text-text-faded': !isToday
                }
              )}
            />
          ) : (
            <CiPlay1
              className={clsx(
                'absolute left-[53%] top-1/2 size-6 -translate-x-1/2 -translate-y-1/2',
                {
                  'text-text-yellow': isToday,
                  'text-text-faded': !isToday
                }
              )}
            />
          )}
        </button>
        <button onClick={handleResetButtonClick} className='aspect-square w-14'>
          <Image src={ResetIcon} width={24} height={24} alt='reset button' />
        </button>
      </div>
    </div>
  )
}
