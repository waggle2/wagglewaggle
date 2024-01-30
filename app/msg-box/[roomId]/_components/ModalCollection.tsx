'use client'

import { useState } from 'react'
import Modal from './Modal'
import ReportReason from './ReportReason'
import ModalMenu from './ModalMenu'
import DarkBgProvider from './DarkBgProvider'
import ConfirmBox from './ConfirmBox'

export default function ModalCollection({
  isMenuModalOpen,
  setMenuModalOpen,
}: {
  isMenuModalOpen: boolean
  setMenuModalOpen: (isOpen: boolean) => void
}) {
  const [reportStep, setReportStep] = useState(0)
  const [blockStep, setBlockStep] = useState(0)
  const [deleteStep, setDeleteStep] = useState(0)

  const getCurrentDateTime = () => {
    const now = new Date()

    const year = now.getFullYear()
    const month = String(now.getMonth() + 1).padStart(2, '0') // 월은 0부터 시작하므로 1을 더해줍니다.
    const day = String(now.getDate()).padStart(2, '0')

    const hours = String(now.getHours()).padStart(2, '0')
    const minutes = String(now.getMinutes()).padStart(2, '0')

    return `${year}-${month}-${day} ${hours}:${minutes}`
  }

  const handleDelete = () => {
    // 쪽지 삭제 로직
  }

  const handleBlock = () => {
    // 차단 로직
  }

  const handleReport = () => {
    // 신고 로직
  }

  const handleModalInit = () => {
    setBlockStep(0)
    setReportStep(0)
    setDeleteStep(0)
    setMenuModalOpen(false)
  }

  const handleStep = (type: 'Block' | 'Report' | 'Delete', step: number) => {
    handleModalInit()
    if (type === 'Block') setBlockStep(step)
    if (type === 'Report') setReportStep(step)
    if (type === 'Delete') setDeleteStep(step)
  }
  if (reportStep === 1) return <ReportReason setReportStep={setReportStep} />
  if (reportStep === 2)
    return (
      <DarkBgProvider>
        <ConfirmBox
          title="신고 완료"
          description="신고 접수가 완료되었습니다. 상대방을 차단할까요?"
          description2="차단시 다시는 상대방과 쪽지를 주고 받을 수 없어요."
          buttonType="choice"
          changeState={() => handleStep('Block', 2)}
          closeModal={handleModalInit}
        />
      </DarkBgProvider>
    )

  if (blockStep === 1)
    return (
      <DarkBgProvider>
        <ConfirmBox
          title="차단하기"
          description="상대방을 차단할까요?"
          description2="차단시 다시는 상대방과 쪽지를 주고 받을 수 없어요."
          buttonType="choice"
          changeState={() => handleStep('Block', 2)}
          closeModal={handleModalInit}
        />
      </DarkBgProvider>
    )

  if (blockStep === 2)
    return (
      <DarkBgProvider>
        <ConfirmBox
          title="차단 완료"
          description="상대방을 차단했습니다."
          description2={`차단 일시 ${getCurrentDateTime()}`}
          buttonType="single"
          closeModal={handleModalInit}
        />
      </DarkBgProvider>
    )
  if (deleteStep === 1)
    return (
      <DarkBgProvider>
        <ConfirmBox
          title="삭제 완료"
          description="은하수님과의 대화가 모두 삭제되었습니다."
          buttonType="single"
          closeModal={handleModalInit}
        />
      </DarkBgProvider>
    )

  return (
    <div>
      <Modal isOpen={isMenuModalOpen} onClose={() => setMenuModalOpen(false)}>
        <ModalMenu
          onBlock={() => setBlockStep(1)}
          onReport={() => setReportStep(1)}
          onDelete={() => setDeleteStep(1)}
          onClose={() => setMenuModalOpen(false)}
        />
      </Modal>
    </div>
  )
}
