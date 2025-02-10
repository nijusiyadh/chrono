import { SignUp } from '@clerk/nextjs'
import React from 'react'

export default function SignUpPage() {
  return (
    <div className='flex min-h-screen flex-col items-center justify-center px-6 py-12'>
      <SignUp />
    </div>
  )
}
