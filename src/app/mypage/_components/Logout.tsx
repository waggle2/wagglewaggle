import style from './styles/settingNav.module.scss'
import Next from '/public/assets/next.svg'

import { useEffect, useState } from 'react'
import Modal from '@/app/_components/common/modal/Modal'
import Button from '@/app/_components/button/Button'

export default function Logout() {
  const [confirmModal, setConfirmModal] = useState(false)

  useEffect(() => {
    // 모달이 열려 있을 때 스크롤 방지
    if (confirmModal === true) {
      document.body.style.overflow = 'hidden'
    }

    // 컴포넌트가 언마운트 될 때 스크롤을 다시 활성화
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [confirmModal])

  const handleConfirmModalClick = () => {
    setConfirmModal(!confirmModal)
  }
  const logout = () => {}
  return (
    <>
      {confirmModal && (
        <Modal
          title={'로그아웃'}
          content={<div className={style.exCode}>로그아웃을 진행할까요?</div>}
          buttons={[
            <Button
              text={'취소'}
              mainColor={'grey'}
              action={handleConfirmModalClick}
            />,
            <Button text={'로그아웃'} mainColor={'green'} action={logout} />,
          ]}
        />
      )}
      <div className={style.container}>
        <div className={style.title}>로그아웃</div>
        <div className={style.navWrapper}>
          <Next onClick={handleConfirmModalClick} />
        </div>
      </div>
    </>
  )
}
