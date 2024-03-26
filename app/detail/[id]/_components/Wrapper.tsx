'use client'
import { formatDate } from '@/app/_lib/formatDate'
import Content from './Content'
import Navigation from './Navigation'
import Comment from './Comment'
import styles from '../styles/wrapper.module.scss'
import { useEffect, useRef, useState } from 'react'
import BottomSheet from './BottomSheet'
import {
  commentEditState,
  commentState,
} from '@/app/_recoil/atoms/commentState'
import { useRecoilState } from 'recoil'
import { useCommentDelete } from '@/app/_hooks/services/mutations/commentDelete'

interface WrapperProps {
  postId: number
  title: string
  nickName: string
  content: string
  tag: string
  category: string
  date: string
  views: number
  vote: {
    title: string
    createdAt: string
    endedAt: string
    pollItems: {
      content: string
      id: string
      userIds: string[]
    }[]
  } | null
  userId: string
}
export default function Wrapper({
  postId,
  title,
  nickName,
  content,
  tag,
  category,
  date,
  vote,
  views,
  userId,
}: WrapperProps) {
  const [isToggle, setIsToggle] = useState(false)
  const [isNavigateToggle, setIsNavigateToggle] = useState(false)
  const [isEdit, setIsEdit] = useRecoilState(commentEditState)
  const [comment, setComment] = useRecoilState(commentState)
  const { mutate: commentDelete } = useCommentDelete()
  return (
    <>
      {isToggle && (
        <BottomSheet
          setIsToggle={setIsToggle}
          items={[
            <div onClick={() => setIsEdit(true)}>수정하기</div>,
            <div
              onClick={() => {
                commentDelete(comment.commentId as number)
                setComment({ comment: '', commentId: null, isAnonymous: false })
              }}
              style={{ color: 'red' }}
            >
              삭제하기
            </div>,
          ]}
        />
      )}
      {isNavigateToggle && (
        <BottomSheet
          setIsToggle={setIsToggle}
          items={[<div>수정하기</div>, <div>삭제하기</div>]}
        />
      )}
      <div className={styles.container}>
        <Navigation
          postId={postId}
          authorNickname={nickName}
          isToggle={isNavigateToggle}
          setIsToggle={setIsNavigateToggle}
        />
        <Content
          postId={postId}
          title={title}
          nickName={nickName}
          content={content}
          tag={tag}
          category={category}
          date={formatDate(date)}
          views={views}
          vote={vote}
          userId={userId}
        />
        <div className={styles.boldLine}></div>
        <Comment
          postId={postId}
          isToggle={isToggle}
          setIsToggle={setIsToggle}
        />
      </div>
    </>
  )
}
