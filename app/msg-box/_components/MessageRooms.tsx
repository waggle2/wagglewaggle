import style from './styles/messageRooms.module.scss'
import MessagePreview from './MessagePreview'
import { messageRooms } from '../mock'
import Link from 'next/link'
export default function MessageRooms() {
  return (
    <>
      <h2 className={style.title}>쪽지함</h2>
      {messageRooms.map((messageRoom, index) => (
        <Link href={'msg-box/1'} key={index}>
          <MessagePreview messageRoom={messageRoom} />
        </Link>
      ))}
    </>
  )
}
