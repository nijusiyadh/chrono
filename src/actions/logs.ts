'use server'

import { prismaClient } from '@/lib/prisma'
import { currentUser } from '@clerk/nextjs/server'

export const getTodayLogs = async (date?: string) => {
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

    const startOfDay = new Date(date ?? today)
    startOfDay.setHours(0, 0, 0, 0) // 00:00:00

    const endOfDay = new Date(date ?? today)
    endOfDay.setHours(23, 59, 59, 999)

    const logs = await prismaClient.statusLogs.findMany({
      where: {
        date: {
          lte: endOfDay,
          gte: startOfDay
        },
        userId: existing.id
      }
    })

    return logs
  } catch (error) {
    console.log(error)
    throw new Error('Failed to get logs', { cause: error })
  }
}

export const getLogs = async () => {
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
    const logs = await prismaClient.statusLogs.findMany({
      where: {
        userId: existing.id
      },
      include: {
        activityRecords: {
          include: {
            activity: true
          }
        },
        activities: {
          include: {
            activity: {
              include: {
                activityRecords: true
              }
            }
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return logs
  } catch (error) {
    console.log(error)
    throw new Error('Failed to get logs', { cause: error })
  }
}

export const getLogsByDates = async (startDate: string, endDate: string) => {
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
    const startOfDay = new Date(startDate)
    startOfDay.setHours(0, 0, 0, 0)

    const endOfDay = new Date(endDate)
    endOfDay.setHours(23, 59, 59, 999)

    const logs = await prismaClient.statusLogs.findMany({
      where: {
        date: {
          gte: startOfDay,
          lte: endOfDay
        },
        userId: existing.id
      },
      include: {
        activityRecords: {
          include: {
            activity: true
          }
        },
        activities: {
          include: {
            activity: {
              include: {
                activityRecords: true
              }
            }
          }
        }
      },
      orderBy: {
        createdAt: 'asc'
      }
    })

    return logs
  } catch (error) {
    console.log(error)
    throw new Error('Failed to get logs', { cause: error })
  }
}
