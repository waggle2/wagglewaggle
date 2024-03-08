'use client'

import { useRouter } from 'next/navigation'
import BackIcon from '/public/assets/back.svg'

type Props = {
  handleBack?: () => void
}

export default function Back({ handleBack }: Props) {
  const router = useRouter()
  const onClickBack = () => {
    if (handleBack) return handleBack()
    router.back()
  }
  return <BackIcon onClick={onClickBack} />
}
