'use client'
import { ReactNode } from 'react'

import style from './modal.module.scss'

type props = {
  title: string
  content: ReactNode
  buttons: ReactNode[]
}

export default function Modal({ title, content, buttons }: props) {
  return (
    <div className={style.modalBackground}>
      <div className={style.modal}>
        <p className={style.title}>{title}</p>
        {content}
        <div className={style.buttonBox}>{buttons.map((button) => button)}</div>
      </div>
    </div>
  )
}
