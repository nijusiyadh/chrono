'use client'

import { ProjectListType } from '@/types'
import { format } from 'date-fns'
import React, { createContext, useContext, useState } from 'react'

type GlobalContextTypes = {
  activeProject: ProjectListType | null
  activeDate: string | null
  setActiveProject: React.Dispatch<React.SetStateAction<ProjectListType | null>>
  setActiveDate: (date: Date) => void
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

  const [date, setDate] = useState<string | null>(null)

  const setActiveDate = (date: Date) => {
    const newDate = new Date(date)
    const formattedDate = format(newDate, 'yyyy-MM-dd HH:mm:ss.SSS')
    setDate(formattedDate)
  }

  return (
    <GlobalContext.Provider
      value={{
        activeProject,
        setActiveProject,
        activeDate: date,
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
