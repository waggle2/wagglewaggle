'use client'

import { useRouter } from 'next/navigation'
import MoreMenuIcon from '@/public/moreMenu.svg'

export default function MoreMenu() {
  const router = useRouter()
  const clickEvent = () => {
    //event
  }
  return <MoreMenuIcon />
}
