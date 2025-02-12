'use server'

import { prismaClient } from '@/lib/prisma'
import { currentUser } from '@clerk/nextjs/server'

export const addEvent = async (data: {
  projectId: number
  startTime: string
  endTime: string
  duration: number
}) => {
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

    const { updatedLog, newEvent } = await prismaClient.$transaction(
      async tx => {
        const existingLog = await tx.statusLogs.findUnique({
          where: {
            date_userId: {
              date: today,
              userId: existing.id
            }
          }
        })

        const updatedLog = await tx.statusLogs.upsert({
          where: {
            date_userId: {
              date: today,
              userId: existing.id
            }
          },
          update: {
            totalDuration: (existingLog?.totalDuration ?? 0) + data.duration
          },
          create: {
            day: new Date().getDay(),
            totalDuration: data.duration,
            date: today,
            userId: existing.id
          }
        })

        if (!existingLog) {
          const activities = await tx.activities.findMany({
            where: {
              userId: existing.id
            },
            select: {
              id: true
            }
          })

          await tx.activitiesOnLogs.createMany({
            data: activities.map(activity => ({
              statusLogId: updatedLog.id,
              activityId: activity.id
            }))
          })
        }

        const project = await tx.projects.findUnique({
          where: {
            id: data.projectId
          }
        })

        if (!project) {
          throw new Error('Project not found')
        }

        const newEvent = await tx.events.create({
          data: {
            projectId: project.id,
            startTime: new Date(data.startTime),
            duration: data.duration ?? 0,
            userId: existing.id,
            logId: updatedLog.id
          }
        })

        return { updatedLog, newEvent }
      }
    )

    return { updatedLog, newEvent }
  } catch (error) {
    console.log(error)
    throw new Error('Failed to create event', { cause: error })
  }
}

export const getEvents = async (date?: string) => {
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

    const events = await prismaClient.events.findMany({
      where: {
        date: {
          lte: endOfDay,
          gte: startOfDay
        },
        userId: existing.id
      },
      include: {
        project: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return events
  } catch (error) {
    console.log(error)
    throw new Error('Failed to get events', { cause: error })
  }
}

export const updateEvent = async (data: {
  id: number
  description: string
}) => {
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
    const updatedEvent = await prismaClient.events.update({
      where: {
        id: data.id
      },
      data: {
        description: data.description
      }
    })

    return updatedEvent
  } catch (error) {
    console.log(error)
    throw new Error('Failed to update event', { cause: error })
  }
}

export const updateEventProject = async (data: {
  id: number
  projectId: number
}) => {
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
    const updatedEvent = await prismaClient.events.update({
      where: {
        id: data.id
      },
      data: {
        projectId: data.projectId
      }
    })

    return updatedEvent
  } catch (error) {
    console.log(error)
    throw new Error('Failed to update event', { cause: error })
  }
}
