'use client'

import { useRouter } from 'next/navigation'

import Button from '@/app/_components/button/Button'
import Modal from '@/app/_components/common/modal/Modal'
import api from '@/app/_api/commonApi'

export default function Logout() {
  const router = useRouter()
  const handleClose = () => {
    router.back()
  }
  const handleLogout = async () => {
    try {
      const res = await api.post('/authentication/logout', {})
      console.log(res, 'logout')
      router.replace('/')
    } catch (err) {
      console.log(err, 'logout error')
    }
  }
  return (
    <Modal
      title={'로그아웃'}
      content={'로그아웃 하시겠습니까?'}
      buttons={[
        <Button
          text={'취소'}
          mainColor={'grey'}
          action={handleClose}
          key={'cancel'}
        />,
        <Button
          text={'로그아웃'}
          mainColor={'green'}
          action={handleLogout}
          key={'logout'}
        />,
      ]}
    />
  )
}
