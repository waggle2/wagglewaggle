import style from './styles/page.module.scss'
import MessageRooms from './_components/MessageRooms'
import Header from '../_components/common/header/page'
export default function page() {
  return (
    <div>
      <Header isNoneSidePadding={true} leftSection={<h2>타이틀</h2>} />
      <div className={style.roomsDiv}>
        <MessageRooms />
      </div>
    </div>
  )
}
