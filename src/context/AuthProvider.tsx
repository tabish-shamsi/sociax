"use client"

import { CustomLayoutProps } from '@/types/CustomLayoutProps'
import { SessionProvider } from 'next-auth/react'

export default function AuthProvider({children}: CustomLayoutProps) {
  return (
    <SessionProvider>
        {children}
    </SessionProvider>
  )
}
