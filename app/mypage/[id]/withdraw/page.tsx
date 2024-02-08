'use client'

import modalStyle from '../profileSetting/_components/styles/confirmChange.module.scss'

import Header from '@/app/_components/common/header/page'
import Back from '@/app/_components/common/header/_components/Back'

import { useEffect, useState } from 'react'
import LastStep from './_components/LastStep'
import FirstStep from './_components/FirstStep'

export default function Withdraw() {
  const [password, setPassword] = useState('')
  const [nextStep, setNextStep] = useState(false)
  const [viewPassword, setViewPassword] = useState(true)
  const [viewModal, SetViewModal] = useState(false)

  useEffect(() => {
    // 모달이 열려 있을 때 스크롤 방지
    if (viewModal === true) {
      document.body.style.overflow = 'hidden'
    }

    // 컴포넌트가 언마운트 될 때 스크롤을 다시 활성화
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [viewModal])

  const handleNextStep = () => {
    setNextStep(() => true)
  }
  const handleViewPassword = () => {
    setViewPassword((prev) => !prev)
  }
  const viewWithDrawModal = () => {
    SetViewModal((prev) => !prev)
  }

  return (
    <>
      {viewModal && (
        <div className={modalStyle.modalBackground}>
          <div className={modalStyle.modal}>
            <p>
              와글와글과 함꼐해주셔서 감사합니다 <br />
              우리 다음에 또 만나요!
            </p>
            <div className={modalStyle.buttonBox}>
              <button
                onClick={viewWithDrawModal}
                className={modalStyle.oKButton}
              >
                확인
              </button>
            </div>
          </div>
        </div>
      )}
      <Header leftSection={<Back />} title={'회원 탈퇴'} />
      {nextStep ? (
        <LastStep
          password={password}
          setPassword={setPassword}
          viewPassword={viewPassword}
          handleViewPassword={handleViewPassword}
          viewWithDrawModal={viewWithDrawModal}
        />
      ) : (
        <FirstStep handleNextStep={handleNextStep} />
      )}
    </>
  )
}
