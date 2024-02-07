'use client'

import { usePathname } from '@/node_modules/next/navigation'
import style from './footer.module.scss'

import GreenPuls from './_components/GreenPuls'
import Home from './_components/Home'
import Massage from './_components/Massage'
import MyPage from './_components/MyPage'
import PointShop from './_components/PointShop'

export default function Footer() {
  const pathname = usePathname()

  // console.log(pathname, 'name')
  return (
    <footer className={style.container}>
      <Home path={pathname} />
      <Massage path={pathname} />
      <GreenPuls />
      <PointShop path={pathname} />
      <MyPage path={pathname} />
    </footer>
  )
}
