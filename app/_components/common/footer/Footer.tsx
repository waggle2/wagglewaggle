'use client'

import { usePathname } from '@/node_modules/next/navigation'
import { useEffect, useState } from 'react'
import style from './footer.module.scss'

import GreenPuls from './_components/GreenPuls'
import Home from './_components/Home'
import Login from './_components/Login'
import Massage from './_components/Massage'
import MyPage from './_components/MyPage'
import PointShop from './_components/PointShop'

export default function Footer() {
  const pathname = usePathname()
  const [isLogin, setIsLogin] = useState<boolean>()
  useEffect(() => {
    setIsLogin(() => !!localStorage.getItem('isLogin'))
  }, [])

  return (
    <footer className={style.container}>
      <Home path={pathname} />
      <Massage path={pathname} />
      <GreenPuls />
      <PointShop path={pathname} />
      {isLogin ? <MyPage path={pathname} /> : <Login />}
    </footer>
  )
}
