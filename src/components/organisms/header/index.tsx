'use client'

import { CalenderIcon } from '@/assets/images'
import { ChronoLogo } from '@/assets/svgs'
import { NavArrowButton } from '@/components/atoms'
import { CalendarModal } from '@/components/molecules'
import { ROUTES } from '@/constants'
import { HEADER_DATE_FORMAT } from '@/constants/date'
import { useOutsideClick } from '@/hooks'
import { useGlobalContext, useModal } from '@/providers'
import { toUTCFormat } from '@/utils/date-time'
import { SignedIn, UserButton } from '@clerk/clerk-react'
import { format } from 'date-fns'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

type ValuePiece = Date | null

type Value = ValuePiece | [ValuePiece, ValuePiece]

export const Header = () => {
  const { setActiveDate } = useGlobalContext()
  const [date, setDate] = useState<Value>(new Date())
  const modalRef = useOutsideClick<HTMLDivElement>(() => closeModal())

  const [showDate, setShowDate] = useState<string>('')

  useEffect(() => {
    const formattedDate = format(
      date instanceof Date
        ? date
        : Array.isArray(date) && date[0] instanceof Date
          ? date[0]
          : new Date(),
      HEADER_DATE_FORMAT
    )

    setShowDate(formattedDate as string)

    const newDate = new Date(toUTCFormat(date))
    setActiveDate(newDate)
  }, [date, setActiveDate])

  const { showModal, closeModal } = useModal()

  const handleDateChange = (date: Value) => {
    setDate(date)
    closeModal()
  }

  const incrementDate = () => {
    setDate(prevDate => {
      const newDate = new Date(
        prevDate instanceof Date
          ? prevDate
          : Array.isArray(prevDate) && prevDate[0] instanceof Date
            ? prevDate[0]
            : new Date()
      )
      newDate.setDate(newDate.getDate() + 1)
      return newDate
    })
  }

  const decrementDate = () => {
    setDate(prevDate => {
      const newDate = new Date(
        prevDate instanceof Date
          ? prevDate
          : Array.isArray(prevDate) && prevDate[0] instanceof Date
            ? prevDate[0]
            : new Date()
      )
      newDate.setDate(newDate.getDate() - 1)
      return newDate
    })
  }

  const handleDateButtonClick = () => {
    showModal(
      <div ref={modalRef}>
        <CalendarModal value={date} onChange={handleDateChange} />
      </div>
    )
  }

  return (
    <div className='sticky top-0 z-30 flex w-full items-center justify-between bg-bg-primary px-28 py-8'>
      <div className='flex items-start justify-center gap-14'>
        <Link href={ROUTES.home}>
          <Image src={ChronoLogo} width={83} height={30} alt='ChronoLogo' />
        </Link>
        <div className='flex gap-9 text-center text-base text-text-white'>
          <Link href={ROUTES.daily_logs}>Daily Log</Link>
          <Link href={ROUTES.analytics}>Analytics</Link>
          <Link href={ROUTES.projects}>Projects</Link>
        </div>
      </div>

      <SignedIn>
        <div className='flex items-center justify-center gap-6'>
          <div className='flex items-center justify-center gap-8 rounded bg-bg-secondary px-4 py-2 text-text-white'>
            <span>{showDate}</span>
            <button onClick={handleDateButtonClick}>
              <Image
                src={CalenderIcon}
                width={18}
                height={19.5}
                alt='calender icon'
              />
            </button>
          </div>
          <div className='flex gap-3'>
            <NavArrowButton onClick={decrementDate} direction='left' />
            <NavArrowButton onClick={incrementDate} direction='right' />
          </div>
          <UserButton />
        </div>
      </SignedIn>
    </div>
  )
}
