'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function SendMsg() {
  const router = useRouter()
  useEffect(() => {
    router.replace('/msg-box/1')
  }, [])
}
