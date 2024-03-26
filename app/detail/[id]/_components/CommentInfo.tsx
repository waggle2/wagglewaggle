import styles from '../styles/commentInfo.module.scss'
import Profile from '/public/assets/profile.svg'
import EmpathyButton from './EmpathyButton'
import MoreMenu from '@/app/_components/common/header/_components/MoreMenu'
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'
import { useCommentDelete } from '@/app/_hooks/services/mutations/commentDelete'
import BottomSheet from './BottomSheet'
import { useRecoilState } from 'recoil'
import { commentState } from '@/app/_recoil/atoms/commentState'

interface CommentInfoProps {
  commentId: number
  isAnonymous: boolean
  nickName: string
  authorId: string
  date: string
  content: string
  stickers: {
    id: number
    animal: string
    userId: string
  }[]
  userId: string
  isToggle: boolean
  setIsToggle: Dispatch<SetStateAction<boolean>>
  isSubmit: boolean
}
export default function CommentInfo({
  commentId,
  isAnonymous,
  nickName,
  authorId,
  date,
  content,
  stickers,
  userId,
  isToggle,
  setIsToggle,
  isSubmit,
}: CommentInfoProps) {
  const [comment, setComment] = useRecoilState(commentState)
  const scrollRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (scrollRef.current && isSubmit) {
      scrollRef.current.scrollIntoView({
        behavior: 'smooth',
      })
    }
  }, [isSubmit])
  return (
    <>
      <div className={styles.container} ref={scrollRef}>
        <div className={styles.profile}>
          <div className={styles.profileCircle}>
            <Profile width="26" height="23" />
          </div>
          <div className={styles.author}>
            <div>
              <h5>{nickName}</h5>
              <span>{date}</span>
            </div>
            <MoreMenu
              clickEvent={() => {
                setIsToggle(!isToggle)
                setComment({
                  commentId: commentId,
                  comment: content,
                  isAnonymous: isAnonymous,
                  authorId: authorId,
                })
              }}
            />
          </div>
        </div>
        <span>{content}</span>
        <EmpathyButton
          commentId={commentId}
          stickers={stickers}
          userId={userId}
        />
      </div>
    </>
  )
}
