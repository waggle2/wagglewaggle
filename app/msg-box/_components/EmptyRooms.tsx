import style from '../styles/emptyRooms.module.scss'
import Chat from '/public/assets/chat.svg'
export default function EmptyRooms() {
  return (
    <div className={style.container}>
      <span>
        <Chat />
      </span>
      <span className={style.bigger}>
        아직 친구와 주고받은
        <br /> 쪽지가 없네요!
      </span>
      <span className={style.smaller}>용기내어 쪽지를 보내봐요</span>
    </div>
  )
}
