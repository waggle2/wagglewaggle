import style from './page.module.css'

import Image from '@/node_modules/next/image'
import Logo from '../public/assets/logo.svg'
import Recent from '../public/assets/recent.svg'
import Lips from '../public/assets/lips.svg'
import Town from '../public/assets/town.svg'

import Footer from './_components/common/footer/page'
import Header from './_components/common/header/page'
import Search from './_components/common/header/_component/Search'
import Bell from './_components/common/header/_component/Bell'
import SwipeEvent from './_components/swipeEvent/SwipeEvent'
import NavTheme from './_components/navTheme/NavTheme'
import PopularPreview from './_components/popularPreview/PopularPreview'
import PostPreview from './_components/postPreview/PostPreview'

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
