'use client'

import { useRouter } from 'next/navigation'
import MoreMenuIcon from '@/public/assets/more-menu.svg'

interface Props {
  clickEvent?: () => void
}

export default function MoreMenu({ clickEvent }: Props) {
  const router = useRouter()

  return (
    <span onClick={clickEvent}>
      <MoreMenuIcon />
    </span>
  )
}
