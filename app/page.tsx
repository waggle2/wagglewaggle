import style from './page.module.css'
import Footer from './_component/common/footer/page'
import Header from './_component/common/header/page'
import Image from '@/node_modules/next/image'
import logo from '../public/logo.svg'
import Search from './_component/common/header/_component/Search'
import Bell from './_component/common/header/_component/Bell'
import SwipeEvent from './_component/swipeEvent/SwipeEvent'
import NavTheme from './_component/navTheme/NavTheme'

export default function Home() {
  return (
    <main className={style.main}>
      <Header
        leftSection={<Image src={logo} alt={'로고'} width={124} height={24} />}
        rightSection={[<Search key={'search'} />, <Bell key={'bell'} />]}
      />
      <SwipeEvent />
      <NavTheme />
      <Footer />
    </main>
  )
}
