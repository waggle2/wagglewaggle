import style from './styles/page.module.scss'
import MessageRooms from './_components/MessageRooms'
import Header from '../_components/common/header/page'
import Footer from '../_components/common/footer/page'
import PaddingProvider from '../_components/layoutSupport/PaddingProvider'
export default function page() {
  return (
    <div className={style.container}>
      <PaddingProvider>
        <Header isNoneSidePadding={true} leftSection={<h2>쪽지</h2>} />
        <div className={style.roomsDiv}>
          <MessageRooms />
        </div>
      </PaddingProvider>
      <Footer />
    </div>
  )
}
