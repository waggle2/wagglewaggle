'use client'
import { useState } from 'react'
import styles from '../styles/commentWrite.module.scss'
import Profile from '/public/assets/profile.svg'
import { useCommentWrite } from '@/app/_hooks/services/mutations/commentWrite'

interface CommentWriteProps {
  postId: number
}
export default function CommentWrite({ postId }: CommentWriteProps) {
  const [content, setContent] = useState('')
  const [isAnonymous, setIsAnonymous] = useState(false)
  const { mutate } = useCommentWrite(postId)
  return (
    <div className={styles.container}>
      <div className={styles.profileSection}>
        <div className={styles.profileCircle}>
          <Profile width="26" height="23" />
        </div>
        <div className={styles.toggleBox}>
          <span>익명</span>
          <label className={styles.toggle}>
            <input
              type="checkbox"
              onClick={() => setIsAnonymous(!isAnonymous)}
            />
            <span className={styles.slider}></span>
          </label>
        </div>
      </div>
      <div className={styles.commentWrapper}>
        <textarea
          value={content}
          className={styles.comment}
          onChange={(e) => setContent(e.target.value)}
        />
        <div
          className={styles.commentSubmit}
          onClick={() => {
            mutate({
              content: content,
              isAnonymous: isAnonymous,
            })
            setContent('')
          }}
        >
          확인
        </div>
      </div>
    </div>
  )
}
