'use client'
import { useEffect, useState } from 'react'
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
  const [loginUserType, setLoginUserType] = useState<
    'firstUser' | 'secondUser'
  >('firstUser')
  const { data: messageRoom, isLoading: messageLoading } =
    useGetMessageRoom(roomId)
  const { data: userData, isLoading: userLoading } = useGetUserInfo()
  //TODO: 페이지 진입시 unreadMessageCount를 0으로 만들어주는 로직이 필요함
  //TODO: 페이지 진입시 하단에 있는 쪽지 포커싱
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
      <div className={style.mainSection}>
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
      />
    </div>
  )
}
