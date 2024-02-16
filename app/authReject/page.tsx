'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function AuthReject() {
  const router = useRouter()
  useEffect(() => {
    alert('인증토큰이 만료되었습니다.')
    router.replace('/')
  }, [])
}
