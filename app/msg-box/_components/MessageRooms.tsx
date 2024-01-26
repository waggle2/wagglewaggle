import style from '../styles/messageRooms.module.scss'
import MessagePreview from './MessagePreview'
import { messageRooms, IMessageRooms } from '../mockTalk'
import Link from 'next/link'

export default function MessageRooms() {
  return (
    <div className={style.roomsDiv}>
      {messageRooms.map((messageRoom: IMessageRooms, index) => (
        <Link href={`msg-box/${index}`} key={index}>
          <MessagePreview
            sender={messageRooms[index]?.messages.at(-1)?.sender}
            content={messageRooms[index]?.messages.at(-1)?.content}
            time={messageRooms[index]?.messages.at(-1)?.createdAt}
          />
        </Link>
      ))}
    </div>
  )
}
