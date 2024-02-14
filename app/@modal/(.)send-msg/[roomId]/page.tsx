'use client'

import { redirect } from '@/node_modules/next/navigation'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function SendMsg() {
  const router = useRouter()
  useEffect(() => {
    router.replace('/msg-box/1')
  }, [])
}
