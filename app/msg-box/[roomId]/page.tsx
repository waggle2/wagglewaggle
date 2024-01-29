'use client'
import { useState } from 'react'
import style from './styles/page.module.scss'
import ModalCollection from './_components/ModalCollection'
import MessagesHeader from './_components/MessagesHeader'
import Messages from './_components/Messages'
import MessageSender from './_components/MessageSender'

interface Props {
  params: { roomId: number }
}

export default function page({ params }: Props) {
  const [isMenuModalOpen, setMenuModalOpen] = useState(false)

  return (
    <div className={style.wrapper}>
      <MessagesHeader
        isMenuModalOpen={isMenuModalOpen}
        setMenuModalOpen={setMenuModalOpen}
      />
      <div className={style.mainSection}>
        <Messages roomId={params.roomId} />
      </div>
      <MessageSender />
      <ModalCollection
        isMenuModalOpen={isMenuModalOpen}
        setMenuModalOpen={setMenuModalOpen}
      />
    </div>
  )
}
