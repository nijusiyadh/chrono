'use client'

import { syncUser } from '@/actions/syncUser'
import { useUser } from '@clerk/nextjs'
import { useEffect } from 'react'

export const ProfileSync = () => {
  const { user } = useUser()

  useEffect(() => {
    if (user) {
      syncUser()
    }
  }, [user])

  return null
}
