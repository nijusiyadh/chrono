import { getLogs } from '@/actions/logs'
import { useOutsideClick } from '@/hooks'
import { useAddActivityRecord } from '@/hooks/api/useAddActivityRecord'
import { formatTotalDuration } from '@/utils/date-time'
import { ActivityRecords } from '@prisma/client'
import clsx from 'clsx'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

type LogsType = Awaited<ReturnType<typeof getLogs>>

export const LogListTableBody = ({ logData }: { logData: LogsType }) => {
  return (
    <>
      {logData.map((log, index) => (
        <tr
          key={log.id}
          className={clsx('w-full bg-bg-secondary text-start text-text-white', {
            'bg-transparent': index % 2 === 0
          })}
        >
          <td className='text-nowrap py-4 pl-16 text-base'>
            {log.date.toDateString()}
          </td>
          <td className='py-4 pl-6 text-base'>{log.day}</td>
          <td className='py-4 pl-6 text-base'>
            {formatTotalDuration(log.totalDuration)}
          </td>
          {log.activities.length ?
            log.activities.map(item => (
              <td
                key={item.activity.id}
                className={clsx('py-4 pl-6 text-base')}
              >
                <ValueFields
                  activityRecord={item.activity.activityRecords}
                  activityId={item.activity.id}
                  logId={log.id}
                />
              </td>
            )) : null}
        </tr>
      ))}
    </>
  )
}

const ValueFields = ({
  activityRecord,
  activityId,
  logId
}: {
  activityRecord: ActivityRecords[]
  logId: number
  activityId: number
}) => {
  const [isEditable, setIsEditable] = useState(false)
  const { register, handleSubmit, resetField, getValues } = useForm({
    defaultValues: {
      value: activityRecord?.[0]?.value ?? ''
    }
  })
  const { mutateAsync: addActivityRecord, isPending } = useAddActivityRecord()

  const handleAddActivityValue = async () => {
    const data = getValues()
    await addActivityRecord(
      {
        activityId,
        logId,
        value: data.value
      },
      {
        onSuccess: () => {
          toast.success('Activity record added successfully')
          resetField('value')
          setIsEditable(false)
        },
        onError: () => {
          toast.error('Failed to add activity record')
          setIsEditable(false)
        }
      }
    )
  }

  const inputRef = useOutsideClick<HTMLDivElement>(() =>
    handleAddActivityValue()
  )

  return (
    <button
      className='min-h-6 w-full max-w-[170px] rounded-md text-start'
      onDoubleClick={() => setIsEditable(true)}
    >
      {isEditable ? (
        <div
          ref={inputRef}
          className='flex w-full items-center justify-start gap-2'
        >
          <form onSubmit={handleSubmit(handleAddActivityValue)}>
            <input
              autoFocus
              disabled={isPending}
              maxLength={20}
              className='h-6 rounded-md bg-transparent text-start focus:outline-none'
              type='number'
              {...register('value')}
            />
          </form>
        </div>
      ) : (
        <span>{activityRecord?.[0] ? activityRecord?.[0].value : '0'}</span>
      )}
    </button>
  )
}
