'use client'

import { ProjectListType } from '@/types'
import React, { createContext, useContext, useState } from 'react'

type GlobalContextTypes = {
  activeProject: ProjectListType | null
  activeDate: Date | null
  setActiveProject: React.Dispatch<React.SetStateAction<ProjectListType | null>>
  setActiveDate: React.Dispatch<React.SetStateAction<Date | null>>
  description: string
  setDescription: React.Dispatch<React.SetStateAction<string>>
}

const GlobalContext = createContext<GlobalContextTypes>(
  {} as GlobalContextTypes
)

export const GlobalProvider: React.FC<React.PropsWithChildren> = ({
  children
}) => {
  const [activeProject, setActiveProject] = useState<ProjectListType | null>(
    null
  )
  const [description, setDescription] = useState<string>('')

  const [activeDate, setActiveDate] = useState<Date | null>(null)

  return (
    <GlobalContext.Provider
      value={{
        activeProject,
        setActiveProject,
        activeDate,
        setActiveDate,
        description,
        setDescription
      }}
    >
      {children}
    </GlobalContext.Provider>
  )
}

export const useGlobalContext = () => {
  const context = useContext(GlobalContext)
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider')
  }
  return context
}
