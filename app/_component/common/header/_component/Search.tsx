'use client'

import { useRouter } from 'next/navigation'
import SearchIcon from '@/public/search.svg'

export default function Search() {
  const router = useRouter()
  const clickEvent = () => {
    // router.push(`경로`)
  }
  return <SearchIcon />
}
