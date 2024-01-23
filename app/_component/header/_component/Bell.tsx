'use client'

import { useRouter } from 'next/navigation'
import { ReactNode } from 'react'
import style from './icon.module.css'

type Props = {
  children?: ReactNode
}

export default function Bell({ children }: Props) {
  const router = useRouter()
  const clickEvent = () => {
    // router.push(`경로`)
  }
  return (
    <button className={style.bell} onClick={clickEvent}>
      {children}
    </button>
  )
}
