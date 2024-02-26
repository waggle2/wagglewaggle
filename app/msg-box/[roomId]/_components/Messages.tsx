'use client'

import style from '../styles/messages.module.scss'
import MessagePreview from '../../_components/MessagePreview'
import { useParams } from 'next/navigation'
import { useGetMessageRoom } from '@/app/_hooks/services/queries/message'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import useGetUserInfo from '@/app/_hooks/services/queries/userInfo'

type Props = {
  setHeaderTitle: Dispatch<SetStateAction<string>>
}

export default function Messages({ setHeaderTitle }: Props) {
  const params = useParams()
  const roomId = Number(params.roomId)
  const [loginUserType, setLoginUserType] = useState<
    'firstUser' | 'secondUser'
  >('firstUser')
  const { data: messageRoom, isLoading: messageLoading } =
    useGetMessageRoom(roomId)
  const { data: userData, isLoading: userLoading } = useGetUserInfo()
  //TODO: 페이지 진입시 unreadMessageCount를 0으로 만들어주는 로직이 필요함

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
    <div className={style.messagesDiv}>
      {messageRoom?.messages?.map((message, index) => (
        <MessagePreview
          key={index}
          receiver={message.receiver}
          firstUser={messageRoom.firstUser}
          secondUser={messageRoom.secondUser}
          sender={message.sender}
          content={message.content}
          time={message.createdAt}
          loginUserType={loginUserType}
        />
      ))}
    </div>
  )
}
