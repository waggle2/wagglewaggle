'use client'
import { Dispatch, SetStateAction, useState } from 'react'
import Xmark from '/public/assets/xmark.svg'
import styles from '../styles/voteContainer.module.scss'
interface VoteContainerProps {
  setIsVote: Dispatch<SetStateAction<boolean>>
}
export default function VoteContainer({ setIsVote }: VoteContainerProps) {
  const [question, setQuestion] = useState<string[]>(['', ''])
  const handleAddQuestion = () => {
    const newQuestion = [...question]
    newQuestion.push('')
    setQuestion(newQuestion)
  }
  const handleChangeQustion = (idx: number, value: string) => {
    const newQuestion = [...question]
    newQuestion[idx] = value
    setQuestion(newQuestion)
  }
  return (
    <div className={styles.container}>
      <div className={styles.closeButton}>
        <Xmark width="16" height="16" onClick={() => setIsVote(false)} />
      </div>
      <div className={styles.title}>투표를 받아볼까요?</div>
      {question.map((item, idx) => {
        return (
          <input
            className={styles.question}
            placeholder={`질문 ${idx + 1}`}
            onChange={(e) => handleChangeQustion(idx, e.target.value)}
          />
        )
      })}
      <div
        className={`${styles.question} ${styles.dashed}`}
        onClick={() => handleAddQuestion()}
      >
        질문 추가
      </div>
    </div>
  )
}
