import style from './guideline.module.scss'
import Check from '/public/assets/check_green.svg'
import React, { ChangeEvent, useState } from 'react'
import Button from '@/app/_components/button/Button'
import api from '@/app/_api/commonApi'
import Modal from '@/app/_components/common/modal/Modal'
import { useRouter } from 'next/navigation'

type props = {
  reasons: string[]
  selected: number
  onClick: (index: number) => void
  otherReason: string
  setOtherReason: (e: ChangeEvent<HTMLTextAreaElement>) => void
  handleBack: () => void
}
export default function Reason({
  reasons,
  selected,
  onClick,
  otherReason,
  setOtherReason,
  handleBack,
}: props) {
  const [confirm, setConfirm] = useState('')
  const [warning, setWarning] = useState(false)
  const [modalView, setModalView] = useState(false)

  const router = useRouter()

  const handleConfirmChange = (e: ChangeEvent<HTMLInputElement>) => {
    setConfirm(() => e.target.value)
  }
  const handleSuccess = () => {
    router.replace('/')
  }

  const handleWithDrawal = async () => {
    const reason =
      selected === 3
        ? { reason: reasons[selected], otherReasons: otherReason }
        : { reason: reasons[selected] }
    if (confirm !== '와글와글을 탈퇴하겠습니다.') {
      setWarning(() => true)
    } else {
      setWarning(() => false)
      try {
        console.log(reason)
        const res = await api.delete('/users', { data: reason })
        console.log(res)
        setModalView(() => true)
      } catch (e) {
        console.log(e, 'error deleting')
      }
    }
  }
  return (
    <>
      <div className={style.boldText}>
        함께한 친구들과
        <br />
        작별인사 하는 중...
      </div>
      <div className={style.normalText}>
        와글와글 친구들을 떠나는
        <br />
        이유를 알고싶어요.
      </div>
      <div className={style.reasonWrapper}>
        {reasons?.map((reasons, index) => {
          if (selected === index) {
            return (
              <div className={style.selectedReason} key={index}>
                <span>{reasons}</span>
                <Check />
              </div>
            )
          } else {
            return (
              <div
                className={style.reason}
                key={index}
                onClick={() => {
                  onClick(index)
                }}
              >
                {reasons}
              </div>
            )
          }
        })}
        {selected === 3 && (
          <textarea
            className={style.otherReason}
            placeholder="떠나는 이유를 알려주세요."
            defaultValue={otherReason}
            onChange={setOtherReason}
          />
        )}
      </div>
      <div className={style.textWrapper}>
        <div>확인문구 입력</div>
        <input
          placeholder="와글와글을 탈퇴하겠습니다."
          defaultValue={confirm}
          onChange={handleConfirmChange}
        />
        {warning && (
          <div className={style.warning}>·&nbsp; 확인문구를 입력해주세요.</div>
        )}
      </div>
      <div className={style.buttonWrapper}>
        <Button text={'취소'} mainColor={'grey'} action={handleBack} />
        <Button
          text={'계속하기'}
          mainColor={'green'}
          action={handleWithDrawal}
        />
      </div>
      {modalView && (
        <Modal
          title={<div className={style.title}>탈퇴 완료</div>}
          content={
            <div className={style.content}>
              지금까지 와글와글과 함께 해주셔서 감사합니다.
              <br />
              다음에 또 만나요!
            </div>
          }
          buttons={[
            <Button
              text={'확인'}
              mainColor={'green'}
              action={handleSuccess}
              key="success"
            />,
          ]}
        />
      )}
    </>
  )
}
