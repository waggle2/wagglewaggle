'use client'
import styles from '../styles/comment.module.scss'
import CommentInfo from './CommentInfo'
import CommentWrite from './CommentWrite'
import useGetComments from '@/app/_hooks/services/queries/comments'
import useGetUserInfo from '@/app/_hooks/services/queries/userInfo'
import { Dispatch, SetStateAction, useState } from 'react'
import { formatDate } from '@/app/_lib/formatDate'
import BottomSheet from './BottomSheet'
interface CommentProps {
  postId: number
  isToggle: boolean
  setIsToggle: Dispatch<SetStateAction<boolean>>
}
export default function Comment({
  postId,
  isToggle,
  setIsToggle,
}: CommentProps) {
  const { data, isLoading } = useGetComments(postId)
  const { data: userInfo, isLoading: isUserLoading } = useGetUserInfo()
  const [editIdx, setEditIdx] = useState<number | null>(null)
  const [isSubmit, setIsSubmit] = useState(false)
  return (
    <>
      {!isLoading && !isUserLoading && (
        <>
          <div className={styles.commentInfo}>
            <div>
              <span>댓글</span>
              <span>{data.length}</span>
            </div>
          </div>
          {data.map((item: any, idx: number) => {
            return (
              <CommentInfo
                commentId={item.id}
                nickName={
                  item.isAnonymous
                    ? `익명의 ${item.author.profileAnimal}`
                    : item.author.credential.nickname
                }
                content={item.content}
                date={formatDate(item.updatedAt)}
                isEditable={
                  userInfo.credential.nickname ===
                  item.author.credential.nickname
                }
                idx={idx}
                setEditIdx={setEditIdx}
                stickers={item.stickers}
                userId={userInfo.id}
                isToggle={isToggle}
                setIsToggle={setIsToggle}
                isSubmit={isSubmit}
              />
            )
          })}
          <CommentWrite
            postId={postId}
            isEdit={false}
            setIsSubmit={setIsSubmit}
          />
        </>
      )}
    </>
  )
}
