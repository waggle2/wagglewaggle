'use client'

import { useRouter } from 'next/navigation'
import HeartIcon from '@/public/assets/heart.svg'

export default function Heart() {
  const router = useRouter()
  const clickEvent = () => {
    //event
  }
  return <HeartIcon width="24" height="24" />
}
