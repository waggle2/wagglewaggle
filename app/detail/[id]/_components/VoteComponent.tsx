'use client'
import styles from '../styles/voteComponent.module.scss'
import dayjs from 'dayjs'
import { useState } from 'react'
import cs from 'classnames/bind'
import Check from '/public/assets/check_green.svg'
import useGetVotes from '@/app/_hooks/services/queries/votes'

const cx = cs.bind(styles)

interface VoteComponentProps {
  postId: number
}
export default function VoteComponent({ postId }: VoteComponentProps) {
  const [itemClick, setItemClick] = useState(false)
  const [isVoted, setIsVoted] = useState(false)
  const [selectedIdx, setSelectedIdx] = useState(0)
  const [voteItemIdx, setVoteItemIdx] = useState('')
  const { data, isLoading } = useGetVotes(postId)
  return (
    <>
      {!isLoading && data && (
        <>
          <div className={styles.subText}>
            1개 선택 · {data.participantCount}명 참여
          </div>
          {data.pollItems.map(
            (
              item: {
                id: string
                content: string
                userIds: string[]
              },
              idx: number,
            ) => {
              return (
                <div
                  className={cx('question', {
                    isClicked: itemClick && selectedIdx === idx,
                  })}
                  key={idx}
                  onClick={() => {
                    setItemClick(true)
                    if (!isVoted) {
                      setSelectedIdx(idx)
                      setVoteItemIdx(item.id)
                    }
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
                        <div>80% / {item.userIds.length}표</div>
                        <div className={cx('progress')}>
                          {selectedIdx === idx ? (
                            <div
                              className={cx('progress', { selected: true })}
                            />
                          ) : (
                            <div
                              className={cx('progress', {
                                notSelected: true,
                              })}
                            />
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )
            },
          )}
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
              onClick={() => {
                setIsVoted(true)
              }}
            >
              투표하기
            </div>
          )}
        </>
      )}
    </>
  )
}
