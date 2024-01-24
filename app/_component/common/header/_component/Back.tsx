'use client'

import { useRouter } from 'next/navigation'
import { ReactNode } from 'react'
import style from './icon.module.css'

type Props = {
  children?: ReactNode
}
export default function Back({ children }: Props) {
  const router = useRouter()
  const onClickBack = () => {
    router.back()
  }
  return (
    <button className={style.back} onClick={onClickBack}>
      {children}
    </button>
  )
}
