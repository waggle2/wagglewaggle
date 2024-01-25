import style from './styles/page.module.scss'
import MessageRooms from './_components/MessageRooms'
export default function page() {
  return (
    <div>
      <h2 className={style.title}>쪽지</h2>
      <div className={style.roomsDiv}>
        <MessageRooms />
      </div>
    </div>
  )
}
