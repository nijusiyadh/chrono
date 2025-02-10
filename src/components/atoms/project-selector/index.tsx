'use client'

import { useGlobalContext, useModal } from '@/providers'
import React, { useState } from 'react'
import { ProjectButton } from '../project-button'
import { ProjectListType } from '@/types'
import { useOutsideClick } from '@/hooks'

const projects: ProjectListType[] = [
  {
    id: 1,
    name: 'Vonnue'
  },
  {
    id: 2,
    name: 'Emotist'
  }
]

export const ProjectSelector = () => {
  const [selectedProject, setSelectedProject] = useState<ProjectListType>(
    projects[0]
  )
  const { showModal, closeModal } = useModal()
  const { setActiveProject } = useGlobalContext()
  const modalRef = useOutsideClick<HTMLDivElement>(() => closeModal())

  const handleProjectSelectionClick = () => {
    showModal(
      <SelectorBody
        onClick={project => {
          setSelectedProject(project)
          setActiveProject(project)
          closeModal()
        }}
        onManageClick={() => {}}
        ref={modalRef}
      />
    )
  }

  return (
    <div className='bg-bg-secondary flex items-center justify-center gap-2 rounded-lg px-5 py-2'>
      <span className='text-text-faded text-base'>Project:</span>
      <button
        onClick={handleProjectSelectionClick}
        className='bg-bg-primary text-text-white rounded px-3 py-1'
      >
        {selectedProject.name}
      </button>
    </div>
  )
}

const SelectorBody = ({
  onClick,
  ref,
  onManageClick
}: {
  ref: React.Ref<HTMLDivElement>
  onClick: (project: ProjectListType) => void
  onManageClick: () => void
}) => {
  return (
    <div
      ref={ref}
      className='bg-bg-secondary flex w-[294px] flex-col gap-6 rounded-2xl p-6'
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
