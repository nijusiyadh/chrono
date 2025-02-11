'use client'

import { RowContent } from '@/components/atoms'
import { LoadingSkeleton } from '@/components/atoms/loading-skeleton'
import { useGetEvents } from '@/hooks/api/useGetEvents'
import { useGlobalContext } from '@/providers'
import clsx from 'clsx'
import React, { useEffect } from 'react'

const tableHeadings = [
  'Project',
  'Description',
  'Start Time',
  'End Time',
  'Duration'
]
export const TimeChart = () => {
  const { activeDate } = useGlobalContext()
  const {
    data: events,
    isLoading,
    refetch,
    isFetching
  } = useGetEvents(activeDate ?? undefined)

  useEffect(() => {
    if (activeDate) {
      refetch()
    }
  }, [activeDate, refetch])

  return (
    <div className='flex w-full max-w-6xl flex-col gap-2'>
      <table className='w-full table-fixed'>
        <thead className='w-full bg-bg-secondary text-text-faded'>
          <tr>
            {tableHeadings.map((item, index) => (
              <th
                key={index}
                className={clsx(
                  'py-4 pl-6 text-start text-base',
                  { '!pl-16': index === 0 },
                  { 'pr-10': index === tableHeadings.length - 1 }
                )}
              >
                {item}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {!isLoading && !isFetching && (
            <>
              {events &&
                events.map((item, index) => (
                  <RowContent
                    key={index}
                    variant={(index + 1) % 2 === 0 ? 'secondary' : 'primary'}
                    data={item}
                  />
                ))}
            </>
          )}
        </tbody>
      </table>
      {(isLoading || isFetching) && <LoadingSkeleton />}
      {!events?.length && !isLoading && (
        <div className='flex w-full flex-col items-center justify-center gap-2 py-4 text-xl text-text-faded'>
          No events found
        </div>
      )}
    </div>
  )
}
