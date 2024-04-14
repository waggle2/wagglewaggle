'use client'
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'
import styles from '../styles/commentWrite.module.scss'
import Profile from '/public/assets/profile.svg'
import {
  useCommentModify,
  useCommentWrite,
  useReplyWrite,
} from '@/app/_hooks/services/mutations/commentWrite'
import { useRecoilState } from 'recoil'
import {
  commentEditState,
  commentState,
  isReplyState,
} from '@/app/_recoil/atoms/commentState'
import cs from 'classnames/bind'
const cx = cs.bind(styles)

interface CommentWriteProps {
  postId: number
  setIsSubmit: Dispatch<SetStateAction<boolean>>
}
export default function CommentWrite({
  postId,
  setIsSubmit,
}: CommentWriteProps) {
  const [comment, setComment] = useRecoilState(commentState)
  const [isEdit, setIsEdit] = useRecoilState(commentEditState)
  const [isReply, setIsReply] = useRecoilState(isReplyState)
  const [content, setContent] = useState('')
  const [isAnonymous, setIsAnonymous] = useState(false)
  const [commentId, setCommentId] = useState<number | null>(null)
  const { mutate } = useCommentWrite(postId)
  const { mutate: commentModify } = useCommentModify()
  const { mutate: replyWrite } = useReplyWrite()
  const textarea = useRef<any>()
  useEffect(() => {
    if (isEdit) {
      setContent(comment.comment)
      setIsAnonymous(comment.isAnonymous)
      setCommentId(comment.commentId)
    } else if (isReply) {
      if (comment.parentId) {
        setCommentId(comment.parentId)
      } else {
        setCommentId(comment.commentId)
      }
      setContent('')
      setIsAnonymous(false)
    }
  }, [isEdit, comment, isReply])
  const handleResizeHeight = () => {
    if (textarea.current) {
      textarea.current.style.height = 'auto' //height 초기화
      textarea.current.style.height = textarea.current.scrollHeight + 'px'
    }
  }
  return (
    <div className={styles.container}>
      {isReply && <div className={styles.status}>대댓글 작성 중</div>}
      {isEdit && <div className={styles.status}>댓글 수정 중</div>}
      <textarea
        rows={1}
        value={content}
        onChange={(e) => {
          handleResizeHeight()
          setContent(e.target.value)
        }}
        className={styles.comment}
      />
      <div className={styles.profileWrapper}>
        <div className={styles.profileSection}>
          <div className={styles.profileCircle}>
            <Profile width="26" height="23" />
          </div>
          <div className={styles.toggleBox}>
            <span>익명</span>
            <label className={styles.toggle}>
              <input
                type="checkbox"
                checked={isAnonymous}
                onClick={() => setIsAnonymous(!isAnonymous)}
              />
              <span className={styles.slider}></span>
            </label>
          </div>
        </div>
        <div className={styles.buttonSection}>
          {(isEdit || isReply) && (
            <div
              className={cx('button', { isCancle: true })}
              onClick={() => {
                setComment({
                  comment: '',
                  commentId: null,
                  parentId: null,
                  isAnonymous: false,
                  authorId: '',
                })
                if (isReply) {
                  setIsReply(false)
                }
                setIsEdit(false)
                setIsAnonymous(false)
                setContent('')
              }}
            >
              취소
            </div>
          )}
          <div
            className={cx('button', { isActive: content.length > 0 })}
            onClick={() => {
              if (content !== '') {
                if (isEdit) {
                  commentModify({
                    commentId: commentId as number,
                    content: content,
                    isAnonymous: isAnonymous as boolean,
                  })
                  setIsEdit(false)
                } else if (isReply) {
                  replyWrite({
                    commentId: commentId as number,
                    content: content,
                    isAnonymous: isAnonymous,
                  })
                } else {
                  mutate({
                    content: content,
                    isAnonymous: isAnonymous as boolean,
                  })
                }
                setContent('')
                setIsSubmit(true)
                setIsAnonymous(false)
                setComment({
                  comment: '',
                  commentId: null,
                  parentId: null,
                  isAnonymous: false,
                  authorId: '',
                })
                if (isReply) {
                  setIsReply(false)
                }
              }
            }}
          >
            확인
          </div>
        </div>
      </div>
    </div>
  )
}
