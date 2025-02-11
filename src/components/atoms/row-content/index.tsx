'use client'
import { useOutsideClick } from '@/hooks'
import { EventResponse } from '@/hooks/api/useGetEvents'
import { useUpdateEvent } from '@/hooks/api/useUpdateEvent'
import { formatTimeDuration } from '@/utils/date-time'
import clsx from 'clsx'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { toast } from 'react-toastify'

export const RowContent = ({
  data,
  variant
}: {
  variant: 'primary' | 'secondary'
  data: EventResponse
}) => {
  const [isEditable, setIsEditable] = useState(false)
  const { register, getValues, reset } = useForm({
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
          reset()
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
      className={clsx('bg-bg-secondary text-text-white w-full text-start', {
        'bg-transparent': variant === 'primary'
      })}
    >
      <td className='py-4 pl-16 text-base'>{data.project.name}</td>
      <td className='py-4 pl-6 text-base'>
        <button
          className='min-h-6 w-full rounded-md text-start'
          onDoubleClick={() => setIsEditable(true)}
        >
          {isEditable ? (
            <div
              ref={inputRef}
              className='flex w-full items-center justify-start gap-2'
            >
              <input
                placeholder='Description'
                contentEditable={isUpdating ? false : true}
                className='rounded-md bg-transparent px-2 py-2 text-start text-white focus:outline-none'
                type='text'
                {...register('description')}
              />
            </div>
          ) : (
            <span>
              {data.description ? (
                <span>{data.description}</span>
              ) : (
                <span className='text-text-faded text-xs'>
                  Double click to edit
                </span>
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
      <td className='text-text-yellow py-4 pl-6 pr-10 text-base'>
        <span className='bg-bg-secondary rounded-md px-3 py-1'>
          {formatTimeDuration(data.duration)}
        </span>
      </td>
    </tr>
  )
}
