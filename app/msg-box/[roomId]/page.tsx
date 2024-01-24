'use client'
import { useState } from 'react'
import MessageSender from '../_components/MessageSender'
import Messages from '../_components/Messages'
import MessagesHeader from '../_components/MessagesHeader'
import style from './page.module.scss'
import ModalOption from '../_components/ModalOption'

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
