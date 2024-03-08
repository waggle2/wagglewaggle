'use client'
import { useEffect, useRef, useState } from 'react'
import style from './styles/page.module.scss'
import ModalCollection from './_components/ModalCollection'
import Messages from './_components/Messages'
import MessageSender from './_components/MessageSender'
import Header from '@/app/_components/common/header/Header'
import Back from '@/app/_components/common/header/_components/Back'
import MoreMenu from '@/app/_components/common/header/_components/MoreMenu'
import PaddingProvider from '@/app/_components/layoutSupport/PaddingProvider'
import { useParams } from 'next/navigation'
import { useGetMessageRoom } from '@/app/_hooks/services/queries/message'
import useGetUserInfo from '@/app/_hooks/services/queries/userInfo'
import { IMessageRooms } from '@/app/_types/messageTypes'

export default function page() {
  const [isMenuModalOpen, setMenuModalOpen] = useState(false)
  const [headerTitle, setHeaderTitle] = useState('')
  const params = useParams()
  const roomId = Number(params.roomId)
  const scrollRef = useRef<HTMLDivElement>(null)
  const [loginUserType, setLoginUserType] = useState<
    'firstUser' | 'secondUser'
  >('firstUser')

  const { data: messageRoom, isLoading: messageLoading } =
    useGetMessageRoom(roomId)
  const { data: userData, isLoading: userLoading } = useGetUserInfo()

  const scrollToBottom = () => {
    const SMOOTH_SCROLL_MAX_HEIGHT = 1500
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior:
          scrollRef.current.scrollHeight < SMOOTH_SCROLL_MAX_HEIGHT
            ? 'smooth'
            : 'instant',
      })
    }
  }

  useEffect(() => {
    if (!messageRoom || !userData) return
    if (userData.id === messageRoom?.firstUser.id) {
      setLoginUserType('firstUser')
      setHeaderTitle(messageRoom.secondUser.nickname)
    }
    if (userData.id === messageRoom?.secondUser.id) {
      setLoginUserType('secondUser')
      setHeaderTitle(messageRoom.firstUser.nickname)
    }
    scrollToBottom()
  }, [messageRoom, userData])

  if (messageLoading) return <div>로딩중</div>
  if (userLoading) return <div>로딩중</div>

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
      <div className={style.mainSection} ref={scrollRef}>
        <Messages
          loginUserType={loginUserType}
          messageRoom={messageRoom as IMessageRooms}
          userId={userData.id}
        />
      </div>
      <MessageSender
        loginUserType={loginUserType}
        messageRoom={messageRoom as IMessageRooms}
      />
      <ModalCollection
        isMenuModalOpen={isMenuModalOpen}
        setMenuModalOpen={setMenuModalOpen}
        loginUserType={loginUserType}
        messageRoom={messageRoom as IMessageRooms}
      />
    </div>
  )
}
