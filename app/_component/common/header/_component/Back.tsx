'use client'

import { useRouter } from 'next/navigation'
import BackIcon from '@/public/back.svg'

export default function Back() {
  const router = useRouter()
  const onClickBack = () => {
    router.back()
  }
  return <BackIcon />
}
