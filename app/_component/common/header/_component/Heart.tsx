'use client'

import { useRouter } from 'next/navigation'
import HeartIcon from '@/public/heart.svg'

export default function Heart() {
  const router = useRouter()
  const clickEvent = () => {
    //event
  }
  return <HeartIcon />
}
