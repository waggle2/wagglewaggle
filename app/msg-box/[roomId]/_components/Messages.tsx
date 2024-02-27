'use client'

import style from '../styles/messages.module.scss'
import MessagePreview from '../../_components/MessagePreview'
import { IMessageRooms } from '@/app/_types/messageTypes'

type Props = {
  loginUserType: 'firstUser' | 'secondUser'
  messageRoom: IMessageRooms
  userId: string
}

export default function Messages({
  loginUserType,
  messageRoom,
  userId,
}: Props) {
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
          type="content"
          userId={userId}
        />
      ))}
    </div>
  )
}
