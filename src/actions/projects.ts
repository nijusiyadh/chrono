'use server'

import { prismaClient } from '@/lib/prisma'
import { currentUser } from '@clerk/nextjs/server'

export const getProjects = async () => {
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
    const projects = await prismaClient.projects.findMany({
      where: {
        userId: existing.id
      }
    })

    return projects
  } catch (error) {
    console.log(error)
    throw new Error('Failed to get projects', { cause: error })
  }
}
