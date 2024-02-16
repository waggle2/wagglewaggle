'use client'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import api from './commonApi'

const accessableWithLogin = [
  '/msg-box',
  '/mypage',
  '/pointshop',
  '/profile',
  '/send-msg',
  '/write',
]
const accessableWithoutLogin = ['/login', '/register']

export default function LoginCheckProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const pathname = usePathname()
  const checkIsLogin = async () => {
    try {
      const result = await api.get('/users')
      if (result.code === 200) {
        return localStorage.setItem('isLogin', 'true')
      }
    } catch (error) {
      const typeError = error as { code: number; message: string }
      if (typeError.code === 401) {
        return localStorage.setItem('isLogin', 'false')
      }
    }
  }
  const handleLoginCheck = async () => {
    const isLogin = localStorage.getItem('isLogin') === 'true'

    if (accessableWithLogin.includes(pathname) && !isLogin) {
      alert('로그인이 필요한 페이지입니다')
      return router.replace('/login')
    }
    if (accessableWithoutLogin.includes(pathname) && isLogin) {
      alert('로그아웃이 필요합니다.')
      return router.replace('/')
    }
  }
  useEffect(() => {
    checkIsLogin()
    handleLoginCheck()
  }, [pathname])

  return <>{children}</>
}
