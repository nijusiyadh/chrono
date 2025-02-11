'use server'

import { prismaClient } from '@/lib/prisma'
import { currentUser } from '@clerk/nextjs/server'

export const getActivities = async () => {
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
    const activities = await prismaClient.activities.findMany({
      where: {
        userId: existing.id
      }
    })

    return activities
  } catch (error) {
    console.log(error)
    throw new Error('Failed to get activities', { cause: error })
  }
}

export const addActivity = async (data: { name: string }) => {
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
    const newActivity = await prismaClient.$transaction(async tx => {
      const newActivity = await tx.activities.create({
        data: {
          name: data.name,
          userId: existing.id
        }
      })

      const userLogs = await tx.statusLogs.findMany({
        where: {
          userId: existing.id
        },
        select: {
          id: true
        }
      })

      await tx.activitiesOnLogs.createMany({
        data: userLogs.map(log => ({
          statusLogId: log.id,
          activityId: newActivity.id
        }))
      })

      return newActivity
    })

    return newActivity
  } catch (error) {
    console.log(error)
    throw new Error('Failed to add activity', { cause: error })
  }
}

export const addActivityRecord = async (
  activityId: number,
  logId: number,
  value: string
) => {
  if (!activityId) {
    throw new Error('Activity id is required')
  }

  if (!value) {
    throw new Error('Value is required')
  }

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
    const newActivityRecord = await prismaClient.activityRecords.upsert({
      where: {
        logId_activityId: {
          logId,
          activityId
        }
      },
      update: {
        value
      },
      create: {
        activityId,
        value,
        userId: existing.id,
        logId
      }
    })

    return newActivityRecord
  } catch (error) {
    console.log(error)
    throw new Error('Failed to add activity record', { cause: error })
  }
}
