'use client'
import { useState } from 'react'
import style from './styles/page.module.scss'
import ModalOption from './_components/ModalOption'
import MessagesHeader from './_components/MessagesHeader'
import Messages from './_components/Messages'
import MessageSender from './_components/MessageSender'

export default function page() {
  const [isMenuModalOpen, setMenuModalOpen] = useState(false)

  return (
    <div className={style.wrapper}>
      <MessagesHeader
        isMenuModalOpen={isMenuModalOpen}
        setMenuModalOpen={setMenuModalOpen}
      />
      <div className={style.messagesDiv}>
        <Messages />
      </div>
      <MessageSender />
      <ModalOption
        isMenuModalOpen={isMenuModalOpen}
        setMenuModalOpen={setMenuModalOpen}
      />
    </div>
  )
}
