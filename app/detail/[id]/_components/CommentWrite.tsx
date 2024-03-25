'use client'
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'
import styles from '../styles/commentWrite.module.scss'
import Profile from '/public/assets/profile.svg'
import {
  useCommentModify,
  useCommentWrite,
} from '@/app/_hooks/services/mutations/commentWrite'

interface CommentWriteProps {
  commentId?: number
  postId: number
  isEdit: boolean
  setEditIdx?: Dispatch<SetStateAction<number | null>>
  initialContent?: string
  initialAnonymous?: boolean
}
export default function CommentWrite({
  commentId,
  postId,
  isEdit,
  setEditIdx,
  initialContent,
  initialAnonymous,
}: CommentWriteProps) {
  const [content, setContent] = useState(initialContent ? initialContent : '')
  const [isAnonymous, setIsAnonymous] = useState(
    initialAnonymous ? initialAnonymous : false,
  )
  const { mutate } = useCommentWrite(postId)
  const { mutate: commentModify } = useCommentModify(commentId as number)
  const textarea = useRef<any>()

  const handleResizeHeight = () => {
    if (textarea.current) {
      textarea.current.style.height = 'auto' //height 초기화
      textarea.current.style.height = textarea.current.scrollHeight + 'px'
    }
  }
  return (
    <div className={styles.container}>
      <textarea
        rows={1}
        onChange={(e) => {
          handleResizeHeight()
          setContent(e.target.value)
        }}
        className={styles.comment}
      />
      <div className={styles.buttonSection}>
        <div className={styles.profileSection}>
          <div className={styles.profileCircle}>
            <Profile width="26" height="23" />
          </div>
          <div className={styles.toggleBox}>
            <span>익명</span>
            <label className={styles.toggle}>
              <input
                type="checkbox"
                defaultChecked={initialAnonymous ? initialAnonymous : false}
                onClick={() => setIsAnonymous(!isAnonymous)}
              />
              <span className={styles.slider}></span>
            </label>
          </div>
        </div>
        <div
          className={styles.commentSubmit}
          onClick={() => {
            if (content === '') {
              alert('댓글을 입력해주세요.')
              return
            }
            if (isEdit && setEditIdx) {
              commentModify({
                content: content,
                isAnonymous: isAnonymous as boolean,
              })
              setEditIdx(null)
            } else {
              mutate({
                content: content,
                isAnonymous: isAnonymous as boolean,
              })
            }
            setContent('')
          }}
        >
          확인
        </div>
      </div>
    </div>
  )
}
