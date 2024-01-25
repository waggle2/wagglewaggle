import style from './page.module.css'

import Image from '@/node_modules/next/image'
import Logo from '../public/logo.svg'
import Recent from '../public/recent.svg'
import Lips from '../public/lips.svg'
import Town from '../public/town.svg'

import Footer from './_component/common/footer/page'
import Header from './_component/common/header/page'
import Search from './_component/common/header/_component/Search'
import Bell from './_component/common/header/_component/Bell'
import SwipeEvent from './_component/swipeEvent/SwipeEvent'
import NavTheme from './_component/navTheme/NavTheme'
import PopularPreview from './_component/popularPreview/PopularPreview'
import PostPreview from './_component/postPreview/PostPreview'

export default function Home() {
  return (
    <main className={style.main}>
      <Header
        leftSection={<Logo />}
        rightSection={[<Search key={'search'} />, <Bell key={'bell'} />]}
      />
      <SwipeEvent />
      <NavTheme />
      <PopularPreview />
      <PostPreview title={'따끈따끈 최신글'} href={''} icon={<Recent />} />
      <PostPreview title={'연애 TIP'} href={''} icon={<Lips />} />
      <PostPreview title={'고냥이 마을 이야기'} href={''} icon={<Town />} />
      <Footer />
    </main>
  )
}
