'use client'

import { useRouter } from 'next/navigation'
import CloseIcon from '/public/assets/close.svg'

interface Props {
  clickEvent?: () => void
}

export default function Close({ clickEvent }: Props) {
  const router = useRouter()

  return (
    <span onClick={clickEvent}>
      <CloseIcon />
    </span>
  )
}
