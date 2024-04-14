'use client'

import { useRouter } from 'next/navigation'
import HeartIcon from '@/public/assets/heart.svg'
import FilledHeartIcon from '@/public/assets/heartFilled.svg'

interface HeartProps {
  isClicked: boolean
  clickEvent: () => void
}
export default function Heart({ isClicked, clickEvent }: HeartProps) {
  const router = useRouter()
  return (
    <>
      {isClicked ? (
        <FilledHeartIcon onClick={clickEvent} />
      ) : (
        <HeartIcon width="24" height="24" onClick={clickEvent} />
      )}
    </>
  )
}
