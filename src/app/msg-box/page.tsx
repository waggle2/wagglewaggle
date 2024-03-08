import style from './styles/page.module.scss'
import Header from '../_components/common/header/Header'
import Footer from '../_components/common/footer/Footer'
import PaddingProvider from '../_components/layoutSupport/PaddingProvider'
import MessageRooms from './_components/MessageRooms'
export default function page() {
  return (
    <>
      <PaddingProvider>
        <Header isNoneSidePadding={true} leftSection={<h2>쪽지</h2>} />
      </PaddingProvider>
      <section className={style.roomsSection}>
        <MessageRooms />
      </section>
      <Footer />
    </>
  )
}
