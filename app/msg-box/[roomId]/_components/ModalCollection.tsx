'use client'

import { Dispatch, SetStateAction, useState } from 'react'
import Modal from './Modal'
import ReportReason from './ReportReason'
import ModalMenu from './ModalMenu'
import DarkBgProvider from './DarkBgProvider'
import ConfirmBox from './ConfirmBox'
import { useDeleteMessagesRoom } from '@/app/_hooks/services/mutations/message'
import { useParams, useRouter } from 'next/navigation'
import { dateAndTime } from '@/app/_lib/formatDate'
import { usePostBlockUser } from '@/app/_hooks/services/mutations/blockUser'
import { IMessageRooms } from '@/app/_types/messageTypes'

type Props = {
  isMenuModalOpen: boolean
  setMenuModalOpen: Dispatch<SetStateAction<boolean>>
  loginUserType: 'firstUser' | 'secondUser'
  messageRoom: IMessageRooms
}

export default function ModalCollection({
  isMenuModalOpen,
  setMenuModalOpen,
  loginUserType,
  messageRoom,
}: Props) {
  const [reportStep, setReportStep] = useState(0)
  const [blockStep, setBlockStep] = useState(0)
  const [deleteStep, setDeleteStep] = useState(0)
  const params = useParams()
  const roomId = Number(params.roomId)
  const router = useRouter()

  const blockMutation = usePostBlockUser()

  const deleteMutation = useDeleteMessagesRoom()

  const handleDelete = () => {
    deleteMutation.mutate(roomId, {
      onSuccess: () => {
        router.replace('/msg-box')
      },
    })
  }
  const checkPartnerObject = () => {
    if (loginUserType === 'firstUser') return messageRoom.secondUser
    if (loginUserType === 'secondUser') return messageRoom.firstUser
  }

  const handleBlock = () => {
    const partnerId = checkPartnerObject()?.id as string
    blockMutation.mutate(partnerId, {
      onSuccess: () => {
        setBlockStep(2)
        return
      },
      onError: (error) => {
        if (error.code === 400) {
          handleModalInit()
          setTimeout(() => alert('이미 차단된 사용자입니다.'), 100)
          return
        }
        if (error.code === 404) {
          handleModalInit()
          setTimeout(() => alert('사용자를 찾을 수 없습니다.'), 100)

          return
        }
        handleModalInit()
        setTimeout(() => alert('서버문제로 인해 차단에 실패하였습니다.'), 100)
        return
      },
    })
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
  if (reportStep === 2) {
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
  }

  if (blockStep === 1) {
    return (
      <DarkBgProvider>
        <ConfirmBox
          title="차단하기"
          description="상대방을 차단할까요?"
          description2="차단시 다시는 상대방과 쪽지를 주고 받을 수 없어요."
          buttonType="choice"
          changeState={() => handleStep('Block', 2)}
          closeModal={handleModalInit}
          actionFunction={handleBlock}
        />
      </DarkBgProvider>
    )
  }
  if (blockStep === 2) {
    return (
      <DarkBgProvider>
        <ConfirmBox
          title="차단 완료"
          description="상대방을 차단했습니다."
          description2={`차단 일시 ${dateAndTime(new Date())}`}
          buttonType="single"
          closeModal={handleModalInit}
        />
      </DarkBgProvider>
    )
  }
  if (deleteStep === 1) {
    handleDelete()
    handleModalInit()
    return (
      <DarkBgProvider>
        <ConfirmBox
          title="삭제 완료"
          description={`${checkPartnerObject()?.nickname ?? ''}님과의 대화가 모두 삭제되었습니다.`}
          buttonType="single"
          closeModal={handleModalInit}
        />
      </DarkBgProvider>
    )
  }

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
