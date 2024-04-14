import { ReactNode } from 'react'

import style from './modal.module.scss'

type props = {
  title: ReactNode
  content: ReactNode
  buttons: ReactNode[]
}

export default function Modal({ title, content, buttons }: props) {
  return (
    <div className={style.modalBackground}>
      <div className={style.modal}>
        <div className={style.title}>{title}</div>
        {content}
        <div className={style.buttonBox}>{buttons.map((button) => button)}</div>
      </div>
    </div>
  )
}
