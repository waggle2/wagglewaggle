'use client'

import { useRouter } from 'next/navigation'
import CloseIcon from '@/public/close.svg'

export default function Close() {
  const router = useRouter()
  const clickEvent = () => {
    // event
  }
  return <CloseIcon />
}
