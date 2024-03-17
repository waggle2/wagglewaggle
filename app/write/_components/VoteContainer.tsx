'use client'
import { Dispatch, SetStateAction } from 'react'
import styles from '../styles/voteContainer.module.scss'
import { useRecoilState } from 'recoil'
import { voteState } from '@/app/_recoil/atoms/voteState'
import dayjs from 'dayjs'
import { formatDate } from '@/app/_lib/formatDate'

interface VoteContainerProps {
  setIsVoteClick: Dispatch<SetStateAction<boolean>>
}
export default function VoteContainer({ setIsVoteClick }: VoteContainerProps) {
  const [voteItems, setVoteItems] = useRecoilState(voteState)
  const today = dayjs()
  return (
    <div className={styles.container} onClick={() => setIsVoteClick(true)}>
      <div className={styles.statusSection}>
        <span style={{ fontWeight: '600' }}>투표 진행 중</span>
        <span>
          {formatDate(today.toString())} ~ {voteItems.endedDate}
        </span>
      </div>
      <div className={styles.voteContainer}>
        <div className={styles.title}>{voteItems.title}</div>
        <div className={styles.subText}>1개 선택</div>
        {voteItems.items.map((item, idx) => {
          return (
            <div className={styles.question} key={idx}>
              {item.content}
            </div>
          )
        })}
      </div>
    </div>
  )
}
