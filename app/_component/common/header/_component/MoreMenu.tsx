'use client'

import { useRouter } from 'next/navigation'
import { ReactNode } from 'react'
import style from './icon.module.css'

type Props = {
  children?: ReactNode
}

export default function MoreMenu({ children }: Props) {
  const router = useRouter()
  const clickEvent = () => {
    //event
  }
  return (
    <button className={style.moreMenu} onClick={clickEvent}>
      {children}
    </button>
  )
}
