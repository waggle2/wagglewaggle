'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function Profile() {
  const router = useRouter()
  useEffect(() => {
    router.back()
  }, [])
}
