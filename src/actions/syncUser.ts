'use server'

import { prismaClient } from '@/lib/prisma'
import { currentUser } from '@clerk/nextjs/server'

export const syncUser = async () => {
  const user = await currentUser()

  if (!user || !user.emailAddresses) {
    return null
  }

  const existingUser = await prismaClient.users.findUnique({
    where: {
      email: user.emailAddresses[0].emailAddress
    }
  })

  if (!existingUser) {
    await prismaClient.users.create({
      data: {
        email: user.emailAddresses[0].emailAddress,
        username:
          user.username ?? user.emailAddresses[0].emailAddress.split('@')[0],
        uId: user.id
      }
    })
  }
}
