import style from './styles/page.module.scss'
import MessageRooms from './_components/MessageRooms'
import Header from '../_components/common/header/Header'
import Footer from '../_components/common/footer/Footer'
import PaddingProvider from '../_components/layoutSupport/PaddingProvider'
export default function page() {
  return (
    <>
      <section className={style.roomsSection}>
        <MessageRooms />
      </section>
    </>
  )
}
