'use client'

import React, { createContext, useContext, useState } from 'react'
import { IoCloseOutline } from 'react-icons/io5'

type ModalContextProps = {
  showModal: (body: React.ReactNode) => void
  closeModal: () => void
}

const ModalContext = createContext<ModalContextProps | null>(null)

export const ModalProvider: React.FC<React.PropsWithChildren> = ({
  children
}) => {
  const [modalBody, setModalBody] = useState<React.ReactNode | null>(null)

  const closeModal = () => {
    setModalBody(null)
  }

  const showModal = (body: React.ReactNode) => {
    setModalBody(body)
  }
  return (
    <ModalContext.Provider value={{ closeModal, showModal }}>
      {modalBody ? (
        <div className='fixed inset-0 z-50 flex h-full w-full items-center justify-center bg-black/50 text-white'>
          <div className='flex flex-col items-center justify-center gap-8'>
            {modalBody}
            <div>
              <button
                onClick={closeModal}
                className='bg-text-yellow flex h-11 w-11 items-center justify-center rounded-full'
              >
                <IoCloseOutline size={24} className='text-bg-primary' />
              </button>
            </div>
          </div>
        </div>
      ) : null}
      {children}
    </ModalContext.Provider>
  )
}

export const useModal = () => {
  const context = useContext(ModalContext)
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider')
  }
  return context
}
