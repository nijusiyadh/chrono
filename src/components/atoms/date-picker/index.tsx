'use client'

import { useOutsideClick } from '@/hooks'
import React, { useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { PiCalendarDotsBold } from 'react-icons/pi'

interface CustomDatePickerProps {
  buttonText: string
  selectedDate: Date | null
  onChange: (date: Date | null) => void
}

export const CustomDatePicker = ({
  selectedDate,
  onChange,
  buttonText
}: CustomDatePickerProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const pickerRef = useOutsideClick<HTMLDivElement>(() => setIsOpen(false))

  return (
    <div ref={pickerRef} className='relative'>
      <button
        type='button'
        className='border-bg-gray-light flex items-center gap-1.5 rounded border px-4 py-2'
        onClick={() => setIsOpen(!isOpen)}
      >
        <PiCalendarDotsBold className='text-bg-gray-light' size={18} />
        <span className='text-bg-gray-light font-medium'>
          {selectedDate ? selectedDate.toDateString() : buttonText}
        </span>
      </button>

      {isOpen && (
        <div className='absolute left-1/2 top-12 z-50 -translate-x-1/2'>
          <DatePicker
            selected={selectedDate}
            onChange={date => {
              onChange(date)
              setIsOpen(false) // Close picker after selecting
            }}
            inline
          />
        </div>
      )}
    </div>
  )
}
