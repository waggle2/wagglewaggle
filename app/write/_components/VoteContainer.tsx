'use client'
import { Dispatch, SetStateAction, useState } from 'react'
import Xmark from '/public/assets/xmark.svg'
import styles from '../styles/voteContainer.module.scss'
import { useRouter } from 'next/navigation'

interface VoteContainerProps {
  setIsVoteClick: Dispatch<SetStateAction<boolean>>
}
export default function VoteContainer({ setIsVoteClick }: VoteContainerProps) {
  const [question, setQuestion] = useState<string[]>(['질문 1', '질문 2'])
  const router = useRouter()
  return (
    <div className={styles.container} onClick={() => setIsVoteClick(true)}>
      <div className={styles.statusSection}>
        <span style={{ fontWeight: '600' }}>투표 진행 중</span>
        <span>2024-12-03 ~ 2024-12-05</span>
      </div>
      <div className={styles.voteContainer}>
        <div className={styles.title}>투표를 받아볼까요?</div>
        <div className={styles.subText}>1개 선택</div>
        {question.map((item, idx) => {
          return (
            <div className={styles.question} key={idx}>
              {item}
            </div>
          )
        })}
      </div>
    </div>
  )
}
