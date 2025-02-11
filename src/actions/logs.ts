'use server'

import { prismaClient } from '@/lib/prisma'
import { currentUser } from '@clerk/nextjs/server'

export const getTodayLogs = async () => {
  const user = await currentUser()

  const existing = await prismaClient.users.findFirst({
    where: {
      uId: user?.id
    }
  })

  if (!existing) {
    throw new Error('Unauthorized')
  }

  try {
    const today = new Date()
    today.setUTCHours(0, 0, 0, 0)

    const logs = await prismaClient.statusLogs.findMany({
      where: {
        date: today,
        userId: existing.id
      }
    })

    return logs
  } catch (error) {
    console.log(error)
    throw new Error('Failed to get logs', { cause: error })
  }
}
