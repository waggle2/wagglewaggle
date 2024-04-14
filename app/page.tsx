import style from './page.module.scss'

import dynamic from 'next/dynamic'

import Logo from '../public/assets/logo.svg'
import Recent from '../public/assets/recent.svg'
import Lips from '../public/assets/lips.svg'
import TestAD from '@/public/assets/testAD.svg'

import Header from './_components/common/header/Header'
import Search from './_components/common/header/_components/Search'
import Bell from './_components/common/header/_components/Bell'
import SwipeEvent from './_components/swipeEvent/SwipeEvent'

import NavTheme from './_components/navTheme/NavTheme'
import NavEvent from './_components/navEvent/NavEvent'
import TopButton from './_components/button/TopButton'
import Footer from './_components/common/footer/Footer'

import PostPreview from './_components/postPreview/PostPreview'
import PopularPreview from './_components/popularPreview/PopularPreview'

export default function Home() {
  const LazyPostPreview = dynamic(
    async () => await import('./_components/postPreview/PostPreview'),
    { ssr: false },
  )
  const LazyAnimalPost = dynamic(
    async () => await import('./_components/postPreview/AnimalPostPreview'),
    { ssr: false },
  )
  return (
    <>
      <main className={style.main}>
        <Header
          leftSection={<Logo />}
          rightSection={[<Search key={'search'} />, <Bell key={'bell'} />]}
        />
        <SwipeEvent />
        <NavTheme />
        <PopularPreview />
        <PostPreview
          title={'따끈따끈 최신글'}
          href={{
            pathname: '/bulletin-board',
            query: {
              title: '따끈따끈 최신글',
            },
          }}
          icon={<Recent />}
        />
        <LazyPostPreview
          title={'연애 TIP'}
          href={{
            pathname: '/bulletin-board',
            query: {
              category: '연애',
              title: '연애',
            },
          }}
          icon={<Lips />}
        />
        <NavEvent href={'./'} img={<TestAD />} />
        <LazyAnimalPost />
        <TopButton />
      </main>
      <Footer />
    </>
  )
}
