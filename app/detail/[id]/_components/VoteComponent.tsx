'use client'
import { formatDate } from '@/app/_lib/formatDate'
import styles from '../styles/voteComponent.module.scss'
import dayjs from 'dayjs'
import { useState } from 'react'
import cs from 'classnames/bind'
import Check from '/public/assets/check_green.svg'

const cx = cs.bind(styles)

interface VoteComponentProps {
  title: string
  items: {
    content: string
  }[]
  endedDate: string
}
export default function VoteComponent({
  title,
  items,
  endedDate,
}: VoteComponentProps) {
  const today = dayjs()
  const [itemClick, setItemClick] = useState(false)
  const [isVoted, setIsVoted] = useState(false)
  const [selectedIdx, setSelectedIdx] = useState(0)
  return (
    <div className={styles.container}>
      <div className={styles.statusSection}>
        <span style={{ fontWeight: '600' }}>투표 진행 중</span>
        <span>
          {formatDate(today.toString())} ~ {endedDate}
        </span>
      </div>
      <div className={styles.voteContainer}>
        <div className={styles.title}>{title}</div>
        <div className={styles.subText}>1개 선택 · 234명 참여</div>
        {items.map((item, idx) => {
          return (
            <div
              className={cx('question', {
                isClicked: itemClick && selectedIdx === idx,
              })}
              key={idx}
              onClick={() => {
                setItemClick(true)
                !isVoted && setSelectedIdx(idx)
              }}
            >
              {itemClick && selectedIdx === idx && <Check />}
              <div
                className={cx('content', {
                  notSelected: selectedIdx !== idx || !itemClick,
                })}
              >
                {item.content}
                {isVoted && (
                  <div className={styles.progressBox}>
                    <div>80% / 12345표</div>
                    <div className={cx('progress')}>
                      {selectedIdx === idx ? (
                        <div className={cx('progress', { selected: true })} />
                      ) : (
                        <div
                          className={cx('progress', { notSelected: true })}
                        />
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )
        })}
        {isVoted ? (
          <div
            className={cx('voteButton', { isVoted })}
            onClick={() => {
              setIsVoted(false)
              setItemClick(false)
            }}
          >
            다시 투표하기
          </div>
        ) : (
          <div
            className={cx('voteButton', { isClicked: itemClick })}
            onClick={() => setIsVoted(true)}
          >
            투표하기
          </div>
        )}
      </div>
    </div>
  )
}
