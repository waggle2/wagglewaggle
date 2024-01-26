import { messageRooms } from '../../mockTalk'
import style from '../styles/messages.module.scss'
import MessagePreview from '../../_components/MessagePreview'

interface Props {
  roomId: number
}

export default function Messages({ roomId }: Props) {
  const messages = messageRooms[roomId]?.messages
  return (
    <div className={style.messagesDiv}>
      {messages?.map((message, index) => (
        <MessagePreview
          key={index}
          receiver={message.receiver}
          firstUser={messageRooms[roomId]?.firstUser}
          sender={message.sender}
          content={message.content}
          time={message.createdAt}
        />
      ))}
    </div>
  )
}
