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
import useGetUserInfo from '@/app/_hooks/services/queries/userInfo'

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
  const [isPostEditable, setIsPostEditable] = useState(false)
  const [isCommentEditable, setIsCommentEditable] = useState(false)
  const { data, isLoading } = useGetUserInfo()
  useEffect(() => {
    if (!isLoading) {
      if (data.credential.nickname === nickName) {
        setIsPostEditable(true)
      } else {
        setIsPostEditable(false)
      }
    }
  }, [data])
  useEffect(() => {
    if (!isLoading) {
      if (data.id === comment.authorId) {
        setIsCommentEditable(true)
      } else {
        setIsCommentEditable(false)
      }
    }
  }, [data, comment])
  return (
    <>
      {!isLoading && (
        <div className={styles.container}>
          {isToggle &&
            (isCommentEditable ? (
              <BottomSheet
                setIsToggle={setIsToggle}
                items={[
                  <div
                    onClick={() => {
                      commentDelete(comment.commentId as number)
                      setComment({
                        comment: '',
                        commentId: null,
                        isAnonymous: false,
                        authorId: '',
                      })
                    }}
                    style={{ color: 'red' }}
                  >
                    삭제하기
                  </div>,
                  <div onClick={() => setIsEdit(true)}>수정하기</div>,
                  <div>대댓글 달기</div>,
                ]}
              />
            ) : (
              <BottomSheet
                setIsToggle={setIsToggle}
                items={[
                  <div style={{ color: 'red' }}>차단하기</div>,
                  <div style={{ color: 'red' }}>신고하기</div>,
                  <div>쪽지 보내기</div>,
                  <div>프로필 보기</div>,
                  <div>대댓글 달기</div>,
                ]} // TODO: 차단/신고/쪽지보내기/프로필보기 기능 연결 필요
              />
            ))}
          {isNavigateToggle &&
            (isPostEditable ? (
              <BottomSheet
                setIsToggle={setIsNavigateToggle}
                items={[
                  <div style={{ color: 'red' }}>삭제하기</div>,
                  <div>수정하기</div>,
                ]}
              />
            ) : (
              <BottomSheet
                setIsToggle={setIsNavigateToggle}
                items={[
                  <div style={{ color: 'red' }}>차단하기</div>,
                  <div style={{ color: 'red' }}>신고하기</div>,
                  <div>쪽지 보내기</div>,
                  <div>프로필 보기</div>,
                ]} // TODO: 차단/신고/쪽지보내기/프로필보기 기능 연결 필요
              />
            ))}
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
            userId={userId}
          />
        </div>
      )}
    </>
  )
}
