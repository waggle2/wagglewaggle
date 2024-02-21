'use client'
import { useEffect, useState } from 'react'
import style from './styles/page.module.scss'
import ModalCollection from './_components/ModalCollection'
import Messages from './_components/Messages'
import MessageSender from './_components/MessageSender'
import Header from '@/app/_components/common/header/Header'
import Back from '@/app/_components/common/header/_components/Back'
import MoreMenu from '@/app/_components/common/header/_components/MoreMenu'
import { Span } from 'next/dist/trace'

interface Props {
  params: { roomId: number }
}

export default function page({ params }: Props) {
  const [isMenuModalOpen, setMenuModalOpen] = useState(false)

  return (
    <div className={style.wrapper}>
      <Header
        leftSection={
          <span style={{ cursor: 'pointer' }}>
            <Back />
          </span>
        }
        isNoneSidePadding={true}
        rightSection={[
          <MoreMenu
            clickEvent={() => {
              setMenuModalOpen(!isMenuModalOpen)
            }}
          />,
        ]}
        title="은하수반짝카와이"
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
