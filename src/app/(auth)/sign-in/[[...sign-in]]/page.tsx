import React from 'react'
import { SignIn } from '@clerk/nextjs'

export default function SignInPage() {
  return (
    <div className='flex min-h-screen flex-col items-center justify-center px-6 py-12'>
      <SignIn />
    </div>
  )
}
