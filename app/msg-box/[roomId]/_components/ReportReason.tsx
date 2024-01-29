'use client'
import { Dispatch, SetStateAction, useState } from 'react'
import style from '../styles/reportReason.module.scss'
import RuleListItem from './RuleListItem'
import ModalRules from './ModalRules'

const RuleList = [
  '부적절한 표현',
  '스팸 & 음란물',
  '불법정보 & 개인정보',
  '기타',
]

type Props = {
  setReportStep: Dispatch<SetStateAction<number>>
}

export default function ReportReason({ setReportStep }: Props) {
  const [rulesOpen, setRulesOpen] = useState(false)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  }

  if (rulesOpen) return <ModalRules onClose={() => setRulesOpen(false)} />

  return (
    <form onSubmit={handleSubmit} className={style.form}>
      <div className={style.titleDiv}>
        <h2>신고 사유 선택</h2>
        <div className={style.ruleDiv} onClick={() => setRulesOpen(true)}>
          <span>커뮤니티 규칙</span>
        </div>
      </div>
      <div className={style.ruleListDiv}>
        {RuleList.map((rule, index) => (
          <RuleListItem content={rule} key={index} index={index} />
        ))}
      </div>

      <div className={style.submitDiv}>
        <button className={style.cancel}>취소</button>
        <button
          className={style.report}
          type="submit"
          onClick={() => setReportStep(2)}
        >
          신고 접수하기
        </button>
      </div>
    </form>
  )
}
