'use client'

import style from './accountSetting.module.scss'
import Button from '@/app/_components/button/Button'
import Header from '@/app/_components/common/header/page'
import Back from '@/app/_components/common/header/_components/Back'
import Modal from '@/app/_components/common/modal/Modal'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AccountSetting() {
  const [logoutModal, setLogoutModal] = useState(false)
  const [withDrawModal, setWithDrawModal] = useState(false)
  const [withDrawSuccess, setWithDrawSuccess] = useState(false)
  const router = useRouter()

  const viewLogoutModal = () => {
    setLogoutModal(true)
  }

  const closeLogoutModal = () => {
    setLogoutModal(false)
  }

  const handleLogout = () => {
    router.push('/')
  }

  const viewWithDrawModal = () => {
    setWithDrawModal(true)
  }
  const closeWithDrawModal = () => {
    setWithDrawModal(false)
  }
  const viewWithDrawSuccessModal = () => {
    setWithDrawModal(() => false)
    setWithDrawSuccess(() => true)
  }
  const handleWithDraw = () => {
    router.push('/')
  }
  return (
    <>
      <Header leftSection={<Back />} title={'계정 설정'} />
      <div className={style.container}>
        <div className={style.item} onClick={viewLogoutModal}>
          로그아웃
        </div>
        <div className={style.lastItem} onClick={viewWithDrawModal}>
          회원 탈퇴
        </div>
        {logoutModal && (
          <Modal
            title={'로그아웃'}
            content={
              <div className={style.modalContent}>로그아웃 하시겠습니까?</div>
            }
            buttons={[
              <Button
                text={'취소'}
                mainColor={'grey'}
                key="no"
                action={closeLogoutModal}
              />,
              <Button
                text={'로그아웃'}
                mainColor={'green'}
                key="yes"
                action={handleLogout}
              />,
            ]}
          />
        )}
        {withDrawModal && (
          <Modal
            title={'정말 탈퇴하시겠어요?'}
            content={
              <div className={style.modalContent}>
                탈퇴 버튼 선택 시, 계정은 삭제되며 복구되지 않습니다.
              </div>
            }
            buttons={[
              <Button
                text={'취소'}
                mainColor={'grey'}
                key="no"
                action={closeWithDrawModal}
              />,
              <Button
                text={'탈퇴'}
                mainColor={'green'}
                key="yes"
                action={viewWithDrawSuccessModal}
              />,
            ]}
          />
        )}
        {withDrawSuccess && (
          <Modal
            title={'회원 탈퇴 완료'}
            content={
              <div className={style.modalContent}>계정이 삭제되었습니다.</div>
            }
            buttons={[
              <Button
                text={'확인'}
                mainColor={'green'}
                key="yes"
                action={handleWithDraw}
              />,
            ]}
          />
        )}
      </div>
    </>
  )
}
