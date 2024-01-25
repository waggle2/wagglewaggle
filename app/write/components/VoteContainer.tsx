'use client'
import { Dispatch, SetStateAction } from 'react'
import Xmark from '/public/assets/xmark.svg'
import styles from '../styles/voteContainer.module.scss'
interface VoteContainerProps {
  setIsVote: Dispatch<SetStateAction<boolean>>
}
export default function VoteContainer({ setIsVote }: VoteContainerProps) {
  return (
    <div className={styles.container}>
      <div className={styles.closeButton}>
        <Xmark width="16" height="16" onClick={() => setIsVote(false)} />
      </div>
      <div className={styles.title}>투표를 받아볼까요?</div>
      <input className={styles.question} placeholder="질문 1" />
      <input className={styles.question} placeholder="질문 2" />
      <div className={`${styles.question} ${styles.dashed}`}>질문 추가</div>
    </div>
  )
}
