'use client'

import React, { useEffect, useState } from 'react'
import { Button, CustomDatePicker } from '@/components/atoms'
import clsx from 'clsx'
import { FaPlus } from 'react-icons/fa'
import { useGetActivities } from '@/hooks/api/useGetActivities'
import { LoadingSkeleton } from '@/components/atoms/loading-skeleton'
import { useForm } from 'react-hook-form'
import { useAddActivity } from '@/hooks/api/useAddActivity'
import { toast } from 'sonner'
import { useGetDailyLogs } from '@/hooks/api/useGetDailyLogs'
import { LogListTableBody } from '../log-list-table-body'
import { format } from 'date-fns'

export const LogList = () => {
  const [fromDate, setFromDate] = useState<Date | null>(null)
  const [toDate, setToDate] = useState<Date | null>(null)
  const [newActivity, setNewActivity] = useState<boolean>(false)
  const { mutateAsync: addActivity, isPending: isAddingActivity } =
    useAddActivity()

  const {
    data: logData,
    isLoading: isLogsLoading,
    isFetching: isFetchingLogs,
    refetch: refetchLogs
  } = useGetDailyLogs({
    startDate: fromDate
      ? format(fromDate, 'yyyy-MM-dd HH:mm:ss.SSS')
      : undefined,
    endDate: toDate ? format(toDate, 'yyyy-MM-dd HH:mm:ss.SSS') : undefined
  })

  const { register, handleSubmit, resetField } = useForm({
    defaultValues: {
      activity: ''
    }
  })

  const handleUpdateActivity = async (data: { activity: string }) => {
    await addActivity(
      { name: data.activity },
      {
        onSuccess: () => {
          setNewActivity(false)
          toast.success('Activity added successfully')
          resetField('activity')
        },
        onError: () => {
          toast.error('Failed to add activity')
        }
      }
    )
  }

  const { data: activities, isLoading: isLoadingActivities } =
    useGetActivities()

  useEffect(() => {
    refetchLogs()
  }, [refetchLogs, fromDate, toDate])

  const handleClearFilters = () => {
    setFromDate(null)
    setToDate(null)
  }

  return (
    <div className='flex flex-col gap-6'>
      <div className='flex w-full items-center justify-end gap-4'>
        <Button
          onClick={handleClearFilters}
          className='!w-fit rounded-md px-6 py-2 text-white'
        >
          All
        </Button>
        <CustomDatePicker
          buttonText='From Date'
          selectedDate={fromDate}
          onChange={setFromDate}
        />
        <CustomDatePicker
          buttonText='To Date'
          selectedDate={toDate}
          onChange={setToDate}
        />
      </div>

      <div className='flex gap-4'>
        <table className='w-full table-auto'>
          <thead className='w-full bg-bg-secondary text-text-faded'>
            <tr>
              <th className={'py-4 pl-16 text-start text-base'}>Date</th>
              <th className={'py-4 pl-6 text-start text-base'}>Day</th>
              <th className={'py-4 pl-6 text-start text-base'}>Focus</th>
              {activities &&
                activities?.length > 0 &&
                activities.map((item, index) => (
                  <th
                    key={item.id}
                    className={clsx('py-4 pl-6 text-start text-base', {
                      '!pr-16': index === activities?.length - 1
                    })}
                  >
                    {item.name}
                  </th>
                ))}
              {newActivity && (
                <th className={'py-4 pl-6 text-start text-base'}>
                  <form onSubmit={handleSubmit(handleUpdateActivity)}>
                    <input
                      type='text'
                      className='w-[160px] rounded-md bg-bg-secondary text-text-faded focus:outline-none'
                      {...register('activity')}
                      disabled={isAddingActivity}
                      autoFocus
                    />
                  </form>
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {!(isLoadingActivities || isLogsLoading || isFetchingLogs) &&
            logData &&
            logData.length > 0 ? (
              <LogListTableBody logData={logData} />
            ) : null}
          </tbody>
        </table>
        {activities && activities?.length < 8 && (
          <button
            onClick={() => setNewActivity(true)}
            className='flex h-full items-center justify-end pt-4'
          >
            <FaPlus size={24} className='text-text-faded' />
          </button>
        )}
      </div>
      {(isLoadingActivities || isLogsLoading || isFetchingLogs) && (
        <LoadingSkeleton />
      )}
      {!(isLoadingActivities || isLogsLoading || isFetchingLogs) &&
        logData?.length === 0 &&
        !isLogsLoading && (
          <div className='flex w-full flex-col items-center justify-center gap-2 py-4 text-xl text-text-faded'>
            No logs found
          </div>
        )}
    </div>
  )
}
