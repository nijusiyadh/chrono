'use client'
import { useOutsideClick } from '@/hooks'
import {
  EventResponse,
  useGetProjects,
  useUpdateEventProject
} from '@/hooks/api'
import { useUpdateEvent } from '@/hooks/api'
import { formatTimeDuration } from '@/utils/date-time'
import clsx from 'clsx'
import { format } from 'date-fns'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { AiOutlineLoading } from 'react-icons/ai'
import { toast } from 'sonner'

export const RowContent = ({
  data,
  variant
}: {
  variant: 'primary' | 'secondary'
  data: EventResponse
}) => {
  const [isEditable, setIsEditable] = useState(false)
  const [isProjectEditable, setIsProjectEditable] = useState(false)
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(
    null
  )
  const { register, getValues, resetField, handleSubmit } = useForm({
    defaultValues: {
      description: data.description ?? ''
    }
  })
  const { data: projects, isLoading: isProjectsLoading } = useGetProjects()

  const { mutateAsync: updateEvent, isPending: isUpdating } = useUpdateEvent()

  const { mutateAsync: updateEventProject, isPending: isUpdatingProject } =
    useUpdateEventProject()

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
  const selectRef = useOutsideClick<HTMLDivElement>(() =>
    setIsProjectEditable(false)
  )

  useEffect(() => {
    if (selectedProjectId) {
      updateEventProject(
        {
          id: data.id,
          projectId: selectedProjectId
        },
        {
          onSuccess: () => {
            toast.success('Event updated successfully')
            setIsProjectEditable(false)
          },
          onError: () => {
            toast.error('Failed to update event')
          }
        }
      )
    }
  }, [selectedProjectId, updateEventProject, data.id])

  return (
    <tr
      key={data.id}
      className={clsx('w-full bg-bg-secondary text-start text-text-white', {
        'bg-transparent': variant === 'primary'
      })}
    >
      <td className='py-4 pl-16 text-base'>
        {isProjectEditable ? (
          <div>
            {isProjectsLoading ? (
              <div className='flex w-full items-center justify-start gap-2'>
                <AiOutlineLoading
                  size={18}
                  className='animate-spin text-text-white'
                />
              </div>
            ) : (
              <div ref={selectRef} className='rounded-md bg-bg-secondary px-2'>
                <select
                  name='project'
                  id='project'
                  disabled={isUpdatingProject}
                  className='w-full rounded-md border-2 border-none border-text-faded bg-bg-secondary text-text-white focus:outline-none'
                  onChange={e => setSelectedProjectId(Number(e.target.value))}
                  defaultValue={data.projectId}
                >
                  {projects?.map(project => (
                    <option key={project.id} value={project.id}>
                      {project.name}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>
        ) : (
          <button
            className='cursor-pointer'
            onDoubleClick={() => setIsProjectEditable(true)}
          >
            {data.project.name}
          </button>
        )}
      </td>
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
        {format(data.startTime, 'HH:mm:ss')}
      </td>
      <td className='py-4 pl-6 text-base'>
        {format(data.endTime, 'HH:mm:ss')}
      </td>
      <td className='py-4 pl-6 pr-10 text-base text-text-yellow'>
        <span className='rounded-md bg-bg-secondary px-3 py-1'>
          {formatTimeDuration(data.duration)}
        </span>
      </td>
    </tr>
  )
}
