'use client'
import style from '../styles/modalReport.module.scss'
import RuleListItem from './RuleListItem'

const RuleList = [
  '부적절한 표현',
  '스팸 & 음란물',
  '불법정보 & 개인정보',
  '기타',
]

type ModalReportProps = {
  onAction: () => void
  onOpenSecondModal: () => void
}

export default function ModalReport({
  onAction,
  onOpenSecondModal,
}: ModalReportProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onAction()
  }
  return (
    <form onSubmit={handleSubmit}>
      <div className={style.titleDiv}>
        <h2>신고 사유 선택</h2>
        <div className={style.ruleDiv} onClick={onOpenSecondModal}>
          <span>커뮤니티 규칙</span>
        </div>
      </div>
      <div className={style.ruleListDiv}>
        {RuleList.map((rule, index) => (
          <RuleListItem content={rule} key={index} />
        ))}
      </div>
      <div className={style.etcDiv}>
        <label htmlFor="etcText" className={style.etcLabel}>
          <input
            type="text"
            id="etcText"
            placeholder="신고 사유를 작성해주세요."
          />
        </label>
      </div>
      <div className={style.submitDiv}>
        <button>신고접수하기</button>
      </div>
    </form>
  )
}
