'use client'

import { useGlobalContext, useModal } from '@/providers'
import React, { useEffect, useState } from 'react'
import { ProjectButton } from '../project-button'
import { useOutsideClick } from '@/hooks'
import { useRouter } from 'next/navigation'
import { ROUTES } from '@/constants'
import { useGetProjects } from '@/hooks/api'
import { Projects } from '@prisma/client'
import { AiOutlineLoading } from 'react-icons/ai'

export const ProjectSelector = () => {
  const [selectedProject, setSelectedProject] = useState<Projects | null>(null)
  const { showModal, closeModal } = useModal()
  const { setActiveProject } = useGlobalContext()
  const modalRef = useOutsideClick<HTMLDivElement>(() => closeModal())

  const { data: projects, isLoading } = useGetProjects()

  useEffect(() => {
    if (projects && projects.length > 0) {
      setSelectedProject(projects[0])
      setActiveProject(projects[0])
    }
  }, [projects, setActiveProject, setSelectedProject])

  const router = useRouter()

  const handleProjectSelectionClick = () => {
    showModal(
      <SelectorBody
        onClick={project => {
          setSelectedProject(project)
          setActiveProject(project)
          closeModal()
        }}
        onManageClick={() => {
          closeModal()
          router.push(ROUTES.projects)
        }}
        ref={modalRef}
        projects={projects ?? []}
      />
    )
  }

  return (
    <div className='flex items-center justify-center gap-2 rounded-lg bg-bg-secondary px-5 py-2'>
      <span className='text-base text-text-faded'>Project:</span>
      {isLoading ? (
        <div className='flex h-full items-center justify-center'>
          <AiOutlineLoading
            size={18}
            className='animate-spin text-text-white'
          />
        </div>
      ) : (
        <button
          onClick={handleProjectSelectionClick}
          className='rounded bg-bg-primary px-3 py-1 text-text-white'
        >
          {selectedProject ? selectedProject.name : 'Select Project'}
        </button>
      )}
    </div>
  )
}

const SelectorBody = ({
  onClick,
  ref,
  onManageClick,
  projects
}: {
  projects: Projects[]
  ref: React.Ref<HTMLDivElement>
  onClick: (project: Projects) => void
  onManageClick: () => void
}) => {
  return (
    <div
      ref={ref}
      className='flex w-[294px] flex-col gap-6 rounded-2xl bg-bg-secondary p-6'
    >
      <div className='flex w-full flex-col gap-2'>
        {projects.map(project => (
          <ProjectButton
            variant='secondary'
            buttonText={project.name}
            key={project.id}
            onClick={() => onClick(project)}
          />
        ))}
      </div>
      <ProjectButton
        variant='primary'
        buttonText='Manage'
        onClick={onManageClick}
      />
    </div>
  )
}
