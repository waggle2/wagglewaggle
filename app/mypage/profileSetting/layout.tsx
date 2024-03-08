'use client'

import { ReactNode } from 'react'
import style from '@/app/pointshop/_styles/pointShop.module.scss'
import RecoilProvider from '@/app/_recoil/RecoilProvider'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

type Props = { children: ReactNode; modal: ReactNode }

// QueryClient 인스턴스 생성
export const queryClient = new QueryClient()

export default function PointShopLayout({ children, modal }: Props) {
  return (
    <QueryClientProvider client={queryClient}>
      <RecoilProvider>
        {children}
        {modal}
      </RecoilProvider>
    </QueryClientProvider>
  )
}
