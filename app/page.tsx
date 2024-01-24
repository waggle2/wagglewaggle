import style from './page.module.css'

import Image from '@/node_modules/next/image'
import logo from '../public/logo.svg'
import recent from '../public/recent.svg'
import lips from '../public/lips.svg'
import town from '../public/town.svg'

import Footer from './_component/common/footer/page'
import Header from './_component/common/header/page'
import Search from './_component/common/header/_component/Search'
import Bell from './_component/common/header/_component/Bell'
import SwipeEvent from './_component/swipeEvent/SwipeEvent'
import NavTheme from './_component/navTheme/NavTheme'
import PostPreview from './_component/postPreview/PostPreview'

export default function Home() {
  return (
    <main className={style.main}>
      <Header
        leftSection={<Image src={logo} alt={'로고'} width={124} height={24} />}
        rightSection={[<Search key={'search'} />, <Bell key={'bell'} />]}
      />
      <SwipeEvent />
      <NavTheme />
      <PostPreview title={'따끈따끈 최신글'} href={''} icon={recent} />
      <PostPreview title={'연애 TIP'} href={''} icon={lips} />
      <PostPreview title={'고냥이 마을 이야기'} href={''} icon={town} />
      <Footer />
    </main>
  )
}
