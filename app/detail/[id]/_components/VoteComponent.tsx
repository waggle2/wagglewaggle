'use client'
import styles from '../styles/voteComponent.module.scss'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import cs from 'classnames/bind'
import Check from '/public/assets/check_green.svg'
import {
  useAddUserVotes,
  useModifyUserVotes,
} from '@/app/_hooks/services/mutations/votes'
import useGetVotes from '@/app/_hooks/services/queries/votes'

const cx = cs.bind(styles)

interface VoteComponentProps {
  postId: number
  userId: string
}
export default function VoteComponent({ postId, userId }: VoteComponentProps) {
  const [itemClick, setItemClick] = useState(false)
  const [isVoted, setIsVoted] = useState(false)
  const [selectedIdx, setSelectedIdx] = useState(0)
  const [voteItemIdx, setVoteItemIdx] = useState('')
  const [isAlreadyVoted, setIsAlreadyVoted] = useState(false)
  const { data, isLoading } = useGetVotes(postId)
  const { mutate } = useAddUserVotes()
  const { mutate: modifyUserVotes } = useModifyUserVotes()
  const calculatePercent = (length: number) => {
    return Math.floor((length / data.participantCount) * 100)
  }
  useEffect(() => {
    if (data) {
      data.pollItems.forEach((item: any, idx: number) => {
        if (item.userIds.includes(userId)) {
          setIsAlreadyVoted(true)
          setSelectedIdx(idx)
          setIsVoted(true)
          setItemClick(true)
        }
      })
    }
  }, [data])
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
                  {(itemClick || isVoted) && selectedIdx === idx && <Check />}
                  <div
                    className={cx('content', {
                      notSelected: selectedIdx !== idx || !itemClick,
                    })}
                  >
                    {item.content}
                    {isVoted && (
                      <div className={styles.progressBox}>
                        <div>
                          {calculatePercent(item.userIds.length)}% /{' '}
                          {item.userIds.length}표
                        </div>
                        <div className={cx('progress')}>
                          <div
                            style={{
                              width: `${calculatePercent(item.userIds.length)}%`,
                            }}
                            className={cx(
                              'progress',
                              selectedIdx === idx
                                ? { selected: true }
                                : { notSelected: true },
                              calculatePercent(item.userIds.length) === 100
                                ? { isFull: true }
                                : { isFull: false },
                            )}
                          />
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
                if (itemClick) {
                  if (isAlreadyVoted || isVoted) {
                    modifyUserVotes(voteItemIdx)
                  } else {
                    mutate(voteItemIdx)
                  }
                  setIsVoted(true)
                }
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
