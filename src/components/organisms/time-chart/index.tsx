'use client'

import { RowContent } from '@/components/atoms/row-content'
import { useGetEvents } from '@/hooks/api/useGetEvents'
import clsx from 'clsx'
import React from 'react'
import { SyncLoader } from 'react-spinners'

const tableHeadings = [
  'Project',
  'Description',
  'Start Time',
  'End Time',
  'Duration'
]
export const TimeChart = () => {
  const { data: events, isLoading } = useGetEvents()

  if (isLoading) {
    return (
      <div className='flex w-full max-w-6xl items-center justify-center gap-2'>
        <SyncLoader size={20} color='white' />
      </div>
    )
  }

  return (
    <div className='w-full max-w-6xl'>
      <table className='w-full'>
        <thead className='bg-bg-secondary text-text-faded w-full'>
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
          {events ? (
            events.map((item, index) => (
              <RowContent
                key={index}
                variant={(index + 1) % 2 === 0 ? 'secondary' : 'primary'}
                data={item}
              />
            ))
          ) : (
            <div>No events found</div>
          )}
        </tbody>
      </table>
    </div>
  )
}
