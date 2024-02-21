'use client'
import { Dispatch, SetStateAction, useState } from 'react'
import style from '../styles/reportReason.module.scss'
import RuleListItem from './RuleListItem'
import ModalRules from './ModalRules'
import Header from '@/app/_components/common/header/Header'
import Back from '@/app/_components/common/header/_components/Back'
import Inform from '@/app/_components/common/header/_components/Inform'
import Button from '@/app/_components/button/Button'

const reportCategories = [
  { id: 'inappropriate', label: '부적절한 표현' },
  { id: 'abuse', label: '심한 비방 & 욕설' },
  { id: 'spam', label: '광고성 컨텐츠' },
  { id: 'pornography', label: '음란성이 포함된 글' },
  { id: 'others', label: '기타' },
]

type Props = {
  setReportStep: Dispatch<SetStateAction<number>>
}

export default function ReportReason({ setReportStep }: Props) {
  const [rulesOpen, setRulesOpen] = useState(false)
  const [checkedEtc, setCheckedEtc] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState('')

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  }

  if (rulesOpen) return <ModalRules onClose={() => setRulesOpen(false)} />

  return (
    <form onSubmit={handleSubmit} className={style.form}>
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

      {selectedCategory === 'others' && (
        <textarea
          className={style.etcText}
          placeholder="신고 사유를 작성해주세요."
          maxLength={300}
        ></textarea>
      )}

      <div className={style.submitDiv}>
        {selectedCategory ? (
          <Button
            mainColor="green"
            text="신고하기"
            action={() => setReportStep(2)}
          />
        ) : (
          <Button mainColor="grey" text="신고하기" />
        )}
      </div>
    </form>
  )
}
