import style from '../styles/messageRooms.module.scss'
import MessagePreview from './MessagePreview'
import { messageRooms } from '../mock'
import Link from 'next/link'
export default function MessageRooms() {
  return (
    <div className={style.roomsDiv}>
      {messageRooms.map((messageRoom, index) => (
        <Link href={'msg-box/1'} key={index}>
          <MessagePreview messageRoom={messageRoom} />
        </Link>
      ))}
    </div>
  )
}
