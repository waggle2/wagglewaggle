import styles from '../styles/commentInfo.module.scss'
import Profile from '/public/assets/profile.svg'
import EmpathyButton from './EmpathyButton'
import MoreMenu from '@/app/_components/common/header/_components/MoreMenu'
import { Dispatch, SetStateAction, useState } from 'react'
import { useCommentDelete } from '@/app/_hooks/services/mutations/commentDelete'

interface CommentInfoProps {
  commentId: number
  nickName: string
  date: string
  content: string
  isEditable: boolean
  idx: number
  setEditIdx: Dispatch<SetStateAction<number | null>>
}
export default function CommentInfo({
  commentId,
  nickName,
  date,
  content,
  isEditable,
  idx,
  setEditIdx,
}: CommentInfoProps) {
  const [isToggle, setIsToggle] = useState(false)
  const { mutate } = useCommentDelete(commentId)
  return (
    <div className={styles.container}>
      <div className={styles.profile}>
        <div className={styles.profileCircle}>
          <Profile width="26" height="23" />
        </div>
        <div className={styles.author}>
          <div>
            <h5>{nickName}</h5>
            <span>{date}</span>
          </div>
          {isEditable && <MoreMenu clickEvent={() => setIsToggle(!isToggle)} />}
        </div>
        {isToggle && (
          <div className={styles.dropdown}>
            <div onClick={() => setEditIdx(idx)}>댓글 수정</div>
            <div className={styles.line}></div>
            <div
              onClick={() => {
                mutate()
                setIsToggle(!isToggle)
              }}
            >
              댓글 삭제
            </div>
          </div>
        )}
      </div>
      <span>{content}</span>
      <EmpathyButton />
    </div>
  )
}
