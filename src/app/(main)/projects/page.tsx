'use client'

import InputField from '@/components/atoms/input-field'
import { ProjectTable } from '@/components/organisms/project-table'
import { useOutsideClick } from '@/hooks'
import { useAddProject } from '@/hooks/api'
import { useModal } from '@/providers'
import React, { useCallback, useEffect, useState } from 'react'
import { AiOutlineLoading } from 'react-icons/ai'
import { toast } from 'sonner'

export default function Projects() {
  const { showModal, closeModal } = useModal()
  const [projectName, setProjectName] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const modalRef = useOutsideClick<HTMLDivElement>(() => {
    closeModal()
    setIsModalOpen(false)
  })

  const { mutateAsync: addProjectMutation, isPending: isAddingProject } =
    useAddProject()

  const addProject = useCallback(() => {
    if (projectName) {
      addProjectMutation(
        {
          name: projectName
        },
        {
          onSuccess: () => {
            setProjectName('')
            setIsModalOpen(false)
            closeModal()
            toast.success('Project added successfully')
          },
          onError: () => {
            toast.error('Failed to add project')
          }
        }
      )
    }
  }, [addProjectMutation, closeModal, projectName])

  useEffect(() => {
    if (isModalOpen) {
      showModal(
        <div
          ref={modalRef}
          className='flex w-full flex-col items-center justify-center rounded-lg bg-bg-primary p-6'
        >
          <h1 className='text-2xl font-semibold text-text-yellow'>
            Add Project
          </h1>
          <div className='pb-4 pt-4'>
            <InputField
              type='text'
              value={projectName}
              onChange={e => setProjectName(e.target.value)}
              placeholder='Project name'
            />
          </div>

          <div className='flex w-full flex-col items-center gap-2'>
            <button
              onClick={addProject}
              disabled={isAddingProject}
              className='flex w-full items-center justify-center text-nowrap rounded-md bg-text-yellow px-6 py-1.5 font-medium text-bg-secondary'
            >
              {isAddingProject ? (
                <AiOutlineLoading
                  size={16}
                  className='animate-spin text-bg-secondary'
                />
              ) : (
                'Add Project'
              )}
            </button>
          </div>
        </div>
      )
    }
  }, [
    addProject,
    isModalOpen,
    modalRef,
    projectName,
    showModal,
    isAddingProject
  ])

  return (
    <div className='flex flex-col gap-[72px]'>
      <div className='flex items-center justify-between'>
        <div className='flex flex-col gap-2 text-start'>
          <h1 className='text-[32px] leading-[42px] text-text-yellow'>
            Projects
          </h1>
          <p className='text-base text-text-faded'>
            Manage and track your projects effortlessly. Stay organized, monitor
            progress
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className='rounded-md bg-text-yellow px-6 py-1.5 font-medium text-bg-secondary'
        >
          Add Project
        </button>
      </div>
      <ProjectTable />
    </div>
  )
}
