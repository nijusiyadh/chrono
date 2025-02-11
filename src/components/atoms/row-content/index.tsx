'use client'
import { useOutsideClick } from '@/hooks'
import { EventResponse } from '@/hooks/api/useGetEvents'
import { useUpdateEvent } from '@/hooks/api/useUpdateEvent'
import { formatTimeDuration } from '@/utils/date-time'
import clsx from 'clsx'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

export const RowContent = ({
  data,
  variant
}: {
  variant: 'primary' | 'secondary'
  data: EventResponse
}) => {
  const [isEditable, setIsEditable] = useState(false)
  const { register, getValues, resetField, handleSubmit } = useForm({
    defaultValues: {
      description: data.description ?? ''
    }
  })

  const { mutateAsync: updateEvent, isPending: isUpdating } = useUpdateEvent()

  const handleUpdateEvent = async () => {
    const { description } = getValues()
    await updateEvent(
      {
        id: data.id,
        description
      },
      {
        onSuccess: () => {
          setIsEditable(false)
          resetField('description')
          toast.success('Event updated successfully')
        },
        onError: () => {
          toast.error('Failed to update event')
        }
      }
    )
  }

  const inputRef = useOutsideClick<HTMLDivElement>(() => handleUpdateEvent())

  return (
    <tr
      key={data.id}
      className={clsx('w-full bg-bg-secondary text-start text-text-white', {
        'bg-transparent': variant === 'primary'
      })}
    >
      <td className='py-4 pl-16 text-base'>{data.project.name}</td>
      <td className='py-4 pl-6 text-base'>
        <button
          className='min-h-6 w-full max-w-[170px] rounded-md text-start'
          onDoubleClick={() => setIsEditable(true)}
        >
          {isEditable ? (
            <div
              ref={inputRef}
              className='flex w-full items-center justify-start gap-2'
            >
              <form onSubmit={handleSubmit(handleUpdateEvent)}>
                <input
                  autoFocus
                  disabled={isUpdating}
                  maxLength={20}
                  className='h-6 rounded-md bg-transparent text-start focus:outline-none'
                  type='text'
                  {...register('description')}
                />
              </form>
            </div>
          ) : (
            <span className=''>
              {data.description ? (
                <span className='flex overflow-hidden text-ellipsis'>
                  {data.description}
                </span>
              ) : (
                <span className='text-xs text-text-faded'>Add Description</span>
              )}
            </span>
          )}
        </button>
      </td>
      <td className='py-4 pl-6 text-base'>
        {data.startTime.toLocaleTimeString()}
      </td>
      <td className='py-4 pl-6 text-base'>
        {data.endTime.toLocaleTimeString()}
      </td>
      <td className='py-4 pl-6 pr-10 text-base text-text-yellow'>
        <span className='rounded-md bg-bg-secondary px-3 py-1'>
          {formatTimeDuration(data.duration)}
        </span>
      </td>
    </tr>
  )
}
