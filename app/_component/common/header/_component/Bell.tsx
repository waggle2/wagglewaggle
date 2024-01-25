'use client'

import { useRouter } from 'next/navigation'
import BellIcon from '@/public/assets/bell.svg'

export default function Bell() {
  const router = useRouter()
  const clickEvent = () => {
    // router.push(`경로`)
  }
  return <BellIcon />
}
