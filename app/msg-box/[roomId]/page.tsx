'use client'
import { useState } from 'react'
import style from './styles/page.module.scss'
import ModalCollection from './_components/ModalCollection'
import Messages from './_components/Messages'
import MessageSender from './_components/MessageSender'
import Header from '@/app/_components/common/header/Header'
import Back from '@/app/_components/common/header/_components/Back'
import MoreMenu from '@/app/_components/common/header/_components/MoreMenu'
import PaddingProvider from '@/app/_components/layoutSupport/PaddingProvider'
import { useParams } from 'next/navigation'

export default function page() {
  const [isMenuModalOpen, setMenuModalOpen] = useState(false)
  const [headerTitle, setHeaderTitle] = useState('')
  return (
    <div className={style.wrapper}>
      <PaddingProvider>
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
          title={headerTitle}
        />
      </PaddingProvider>
      <div className={style.mainSection}>
        <Messages setHeaderTitle={setHeaderTitle} />
      </div>
      <MessageSender />
      <ModalCollection
        isMenuModalOpen={isMenuModalOpen}
        setMenuModalOpen={setMenuModalOpen}
      />
    </div>
  )
}
