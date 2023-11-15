'use client'

import { SignInIcon } from '../icons';
import { signIn } from "next-auth/react";

export default function SignUpButtonWrapper({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <button 
    onClick={() => signIn()}
    className="flex items-center justify-between rounded-md bg-black bg-opacity-20 w-20 px-1 py-2 mr-8 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
      <SignInIcon className='mr-1'/>
      {children}
    </button>
  )
}
