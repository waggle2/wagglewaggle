import style from './styles/settingNav.module.scss'
import modalStyle from '../profileSetting/_components/styles/confirmChange.module.scss'
import Next from '@/public/assets/next.svg'

import { useEffect, useState } from 'react'

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
        <div className={modalStyle.modalBackground}>
          <div className={modalStyle.modal}>
            <p>정말 로그아웃 할까요?</p>
            <div className={modalStyle.buttonBox}>
              <button className={modalStyle.noButton} onClick={logout}>
                YES
              </button>
              <button
                onClick={handleConfirmModalClick}
                className={modalStyle.yesButton}
              >
                NO
              </button>
            </div>
          </div>
        </div>
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
