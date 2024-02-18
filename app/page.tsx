import style from './page.module.scss'

import Logo from '../public/assets/logo.svg'
import Recent from '../public/assets/recent.svg'
import Lips from '../public/assets/lips.svg'
import TestAD from '@/public/assets/testAD.svg'

import Header from './_components/common/header/Header'
import Search from './_components/common/header/_components/Search'
import Bell from './_components/common/header/_components/Bell'
import SwipeEvent from './_components/swipeEvent/SwipeEvent'
import NavTheme from './_components/navTheme/NavTheme'
import PopularPreview from './_components/popularPreview/PopularPreview'
import PostPreview from './_components/postPreview/PostPreview'
import NavEvent from './_components/navEvent/NavEvent'
import AnimalPostPreview from './_components/postPreview/AnimalPostPreview'
import TopButton from './_components/button/TopButton'
import Footer from './_components/common/footer/Footer'
import Link from '@/node_modules/next/link'
import Post from './_components/postPreview/_components/Post'

export default function Home() {
  return (
    <>
      <main className={style.main}>
        <Header
          leftSection={<Logo />}
          rightSection={[<Search key={'search'} />, <Bell key={'bell'} />]}
        />
        <SwipeEvent />
        <NavTheme />
        {/* @ts-expect-error Async Server Component */}
        <PopularPreview />
        <PostPreview title={'따끈따끈 최신글'} href={''} icon={<Recent />} />
        <NavEvent href={'./'} img={<TestAD />} />
        <PostPreview title={'연애 TIP'} href={''} icon={<Lips />} />
        <AnimalPostPreview />
        <TopButton />
      </main>
      <Footer />
    </>
  )
}
