'use client'

import { useRouter } from 'next/navigation'
import { ReactNode } from 'react'
import style from './icon.module.css'

type Props = {
  children?: ReactNode
}

export default function Close({ children }: Props) {
  const router = useRouter()
  const clickEvent = () => {
    // event
  }
  return (
    <button className={style.close} onClick={clickEvent}>
      {children}
    </button>
  )
}
