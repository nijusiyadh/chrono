'use client'

import { PreLoader } from '@/components/atoms'
import { LoadingSkeleton } from '@/components/atoms/loading-skeleton'
import { useGetProjects } from '@/hooks/api'
import { formatTimeDuration } from '@/utils/date-time'
import { Events } from '@prisma/client'
import clsx from 'clsx'
import React, { useRef } from 'react'

export const ProjectTable = () => {
  const isFirstRender = useRef(true)

  const {
    data: projects,
    isLoading: isProjectsLoading,
    isFetching
  } = useGetProjects()

  if ((isProjectsLoading || isFetching) && isFirstRender.current) {
    return <PreLoader />
  }

  isFirstRender.current = false

  const getTotalDuration = (events: Events[]) => {
    let totalDuration = 0
    events.forEach(event => {
      totalDuration += event.duration
    })

    return formatTimeDuration(totalDuration)
  }

  return (
    <div className='flex flex-col gap-2'>
      <table className='w-full table-fixed'>
        <thead className='bg-bg-secondary text-base text-text-faded'>
          <tr>
            <th className='w-full py-4 pl-16 text-left'>Project</th>
            <th className='w-full py-4 pl-6 text-left'>Hours spend</th>
          </tr>
        </thead>
        <tbody>
          {!isFetching &&
            projects?.length &&
            projects?.map((item, index) => (
              <tr
                className={clsx(
                  'w-full bg-bg-secondary text-start text-text-faded',
                  {
                    'bg-transparent': index % 2 === 0
                  }
                )}
                key={index}
              >
                <td className='py-4 pl-16 text-base'>{item.name}</td>
                <td className='py-4 pl-6 text-base'>
                  <span className='rounded-md bg-bg-secondary px-3 py-1 text-text-yellow'>
                    {getTotalDuration(item.events)}
                  </span>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      {isFetching && <LoadingSkeleton />}
      {!isFetching && !projects?.length && (
        <div className='flex w-full flex-col items-center justify-center gap-2 py-4 text-xl text-text-faded'>
          No projects found
        </div>
      )}
    </div>
  )
}
