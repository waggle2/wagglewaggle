'use client'
import RecoilProvider from '@/app/_recoil/RecoilProvider'
import { ReactNode } from 'react'

export default function layout({ children }: { children: ReactNode }) {
  return <RecoilProvider>{children}</RecoilProvider>
}
