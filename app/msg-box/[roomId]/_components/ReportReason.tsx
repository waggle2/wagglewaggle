'use client'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import style from '../styles/reportReason.module.scss'
import RuleListItem from './RuleListItem'
import ModalRules from './ModalRules'
import Header from '@/app/_components/common/header/Header'
import Back from '@/app/_components/common/header/_components/Back'
import Inform from '@/app/_components/common/header/_components/Inform'
import Button from '@/app/_components/button/Button'
import { usePostReportMessage } from '@/app/_hooks/services/mutations/reportMessage'
import { useParams } from 'next/navigation'

const reportCategories = [
  { id: '부적절한 표현', label: '부적절한 표현' },
  { id: '심한 비방 & 욕설', label: '심한 비방 & 욕설' },
  { id: '광고성 컨텐츠', label: '광고성 컨텐츠' },
  { id: '음란성이 포함된 글', label: '음란성이 포함된 글' },
  { id: '기타', label: '기타' },
]

type Props = {
  setReportStep: Dispatch<SetStateAction<number>>
}

export default function ReportReason({ setReportStep }: Props) {
  const [rulesOpen, setRulesOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState('')
  const [content, setContent] = useState('')
  const [isPassable, setIsPassable] = useState(false)
  const reportMutation = usePostReportMessage()
  const { roomId } = useParams()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    handleMutation()
  }

  const handleMutation = () => {
    reportMutation.mutate(
      {
        reason: selectedCategory,
        content: content,
        messageRoomId: roomId as string,
      },
      {
        onSuccess: () => {
          setReportStep(2)
        },
        onError: () => {
          alert('신고에 실패했습니다.')
        },
      },
    )
  }

  useEffect(() => {
    if (selectedCategory && content) {
      setIsPassable(true)
      return
    }
    setIsPassable(false)
  }, [selectedCategory, content])

  if (rulesOpen) return <ModalRules onClose={() => setRulesOpen(false)} />

  return (
    <form onSubmit={handleSubmit} className={style.form}>
      <div className={style.innerContainer}>
        <Header
          isNoneSidePadding={true}
          leftSection={
            <span style={{ cursor: 'pointer' }}>
              <Back />
            </span>
          }
          title="신고"
          rightSection={[<Inform clickEvent={() => setRulesOpen(true)} />]}
        />
        <div className={style.titleDiv}>
          <h2>신고 사유를 알려주세요</h2>
        </div>
        <div className={style.ruleListDiv}>
          {reportCategories.map((rule, index) => (
            <RuleListItem
              rule={rule}
              key={index}
              setSelectedCategory={setSelectedCategory}
              selectedCategory={selectedCategory}
            />
          ))}
        </div>
        <textarea
          className={style.etcText}
          placeholder="신고 사유를 작성해주세요."
          maxLength={300}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
        <div className={style.submitDiv}>
          <Button
            mainColor={isPassable ? 'green' : 'grey'}
            isDisabled={!isPassable}
            text="신고하기"
            action={handleMutation}
          />
        </div>
      </div>
    </form>
  )
}
