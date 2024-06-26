import styles from '../styles/commentInfo.module.scss'
import Profile from '/public/assets/profile.svg'
import EmpathyButton from './EmpathyButton'
import MoreMenu from '@/app/_components/common/header/_components/MoreMenu'
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'
import { useRecoilState } from 'recoil'
import { commentState } from '@/app/_recoil/atoms/commentState'
import cs from 'classnames/bind'
const cx = cs.bind(styles)

interface CommentInfoProps {
  commentId: number
  parentId: number | null
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
  isReply: boolean
}
export default function CommentInfo({
  commentId,
  parentId,
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
  isReply,
}: CommentInfoProps) {
  const [comment, setComment] = useRecoilState(commentState)
  const scrollRef = useRef<HTMLDivElement>(null)
  const isLogin =
    typeof window !== 'undefined' && window.localStorage.getItem('isLogin')
  useEffect(() => {
    if (scrollRef.current && isSubmit) {
      scrollRef.current.scrollIntoView({
        behavior: 'smooth',
      })
    }
  }, [isSubmit])
  return (
    <>
      <div className={cx('container', { isReply: isReply })} ref={scrollRef}>
        <div className={styles.profile}>
          <div className={styles.profileCircle}>
            <Profile width="26" height="23" />
          </div>
          <div className={styles.author}>
            <div>
              <h5>{nickName}</h5>
              <span>{date}</span>
            </div>
            {isLogin === 'true' && (
              <MoreMenu
                clickEvent={() => {
                  setIsToggle(!isToggle)
                  setComment({
                    commentId: commentId,
                    parentId: parentId,
                    comment: content,
                    isAnonymous: isAnonymous,
                    authorId: authorId,
                  })
                }}
              />
            )}
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
