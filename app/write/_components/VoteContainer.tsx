'use client'
import { Dispatch, SetStateAction, useState } from 'react'
import Xmark from '/public/assets/xmark.svg'
import styles from '../styles/voteContainer.module.scss'
import { useRouter } from 'next/navigation'
import { useRecoilState } from 'recoil'
import { voteState } from '@/app/_recoil/atoms/voteState'

interface VoteContainerProps {
  setIsVoteClick: Dispatch<SetStateAction<boolean>>
}
export default function VoteContainer({ setIsVoteClick }: VoteContainerProps) {
  const [voteItems, setVoteItems] = useRecoilState(voteState)
  return (
    <div className={styles.container} onClick={() => setIsVoteClick(true)}>
      <div className={styles.statusSection}>
        <span style={{ fontWeight: '600' }}>투표 진행 중</span>
        <span>2024-12-03 ~ 2024-12-05</span>
      </div>
      <div className={styles.voteContainer}>
        <div className={styles.title}>{voteItems.title}</div>
        <div className={styles.subText}>1개 선택</div>
        {voteItems.items.map((item, idx) => {
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
