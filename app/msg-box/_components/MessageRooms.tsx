import style from '../styles/messageRooms.module.scss'
import MessagePreview from './MessagePreview'
import { messageRooms, IMessageRooms } from '../mockTalk'
import Link from 'next/link'
import EmptyRooms from './EmptyRooms'

export default function MessageRooms() {
  console.log(messageRooms.length)
  return (
    <>
      {messageRooms?.length === 0 ? (
        <EmptyRooms />
      ) : (
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
      )}
    </>
  )
}
