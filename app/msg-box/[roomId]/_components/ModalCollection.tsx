import style from '../styles/modalCollection.module.scss'
import { useState } from 'react'
import Modal from './Modal'
import ModalReport from './ModalReport'
import ModalChoice from './ModalChoice'
import ModalRules from './ModalRules'
import ModalMenu from './ModalMenu'

export default function ModalCollection({
  isMenuModalOpen,
  setMenuModalOpen,
}: {
  isMenuModalOpen: boolean
  setMenuModalOpen: (isOpen: boolean) => void
}) {
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false)
  const [isBlockModalOpen, setBlockModalOpen] = useState(false)
  const [isReportModalOpen, setReportModalOpen] = useState(false)
  const [isBlockAfterReport, setBlockAfterReport] = useState(false)
  const [isRulesModalOpen, setRulesModalOpen] = useState(false)

  const openModal = (setModalState: (state: boolean) => void) => {
    setMenuModalOpen(false)
    setDeleteModalOpen(false)
    setBlockModalOpen(false)
    setReportModalOpen(false)
    setModalState(true)
  }

  const handleDelete = () => {
    // 쪽지 삭제 로직
  }

  const handleBlock = () => {
    // 차단 로직
  }

  const handleReport = () => {
    // 신고 로직
    setBlockAfterReport(true)
    openModal(setBlockModalOpen)
  }
  return (
    <>
      <Modal
        modalType="main"
        isOpen={isMenuModalOpen}
        onClose={() => setMenuModalOpen(false)}
      >
        <ModalMenu
          onBlock={() => openModal(setBlockModalOpen)}
          onReport={() => openModal(setReportModalOpen)}
          onDelete={() => openModal(setDeleteModalOpen)}
          onClose={() => setMenuModalOpen(false)}
        />
      </Modal>

      <Modal
        modalType="delete"
        isOpen={isDeleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
      >
        <ModalChoice
          title="쪽지 내용 전체 삭제할까요?"
          description="삭제시 다시는 복구할 수 없습니다."
          actionButtonName="삭제하기"
          onClose={() => setDeleteModalOpen(false)}
        />
      </Modal>

      <Modal
        modalType="block"
        isOpen={isBlockModalOpen}
        onClose={() => setBlockModalOpen(false)}
      >
        {isBlockAfterReport ? (
          <ModalChoice
            title="신고 접수가 완료 되었습니다."
            nextTitle="상대방을 차단할까요?"
            description="차단 시 다시는 상대방과 쪽지를 주고 받을 수 없습니다."
            actionButtonName="차단하기"
            onClose={() => setBlockModalOpen(false)}
          />
        ) : (
          <ModalChoice
            title="이 사용자를 차단하시겠습니까?"
            description="차단 시 다시는 상대방과 쪽지를 주고 받을 수 없습니다."
            actionButtonName="차단하기"
            onClose={() => setBlockModalOpen(false)}
          />
        )}
      </Modal>
      <Modal
        modalType="report"
        isOpen={isReportModalOpen}
        onClose={() => setReportModalOpen(false)}
      >
        <ModalReport
          onAction={handleReport}
          onOpenSecondModal={() => setRulesModalOpen(true)}
        />
      </Modal>

      <Modal
        modalType="rules"
        isOpen={isRulesModalOpen}
        onClose={() => setRulesModalOpen(false)}
      >
        <ModalRules onClose={() => setRulesModalOpen(false)} />
      </Modal>
    </>
  )
}
