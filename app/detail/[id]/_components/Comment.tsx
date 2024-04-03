'use client'
import styles from '../styles/comment.module.scss'
import CommentInfo from './CommentInfo'
import CommentWrite from './CommentWrite'
import useGetComments from '@/app/_hooks/services/queries/comments'
import { Dispatch, SetStateAction, useState } from 'react'
import { formatDate } from '@/app/_lib/formatDate'
interface CommentProps {
  postId: number
  isToggle: boolean
  setIsToggle: Dispatch<SetStateAction<boolean>>
  userId: string
}
export default function Comment({
  postId,
  isToggle,
  setIsToggle,
  userId,
}: CommentProps) {
  const { data, isLoading } = useGetComments(postId)
  const [isSubmit, setIsSubmit] = useState(false)
  return (
    <>
      {!isLoading && (
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
                isAnonymous={item.isAnonymous}
                nickName={
                  item.isAnonymous
                    ? `익명의 ${item.author.profileAnimal}`
                    : item.author.credential.nickname
                }
                authorId={item.author.id}
                content={item.content}
                date={formatDate(item.updatedAt)}
                stickers={item.stickers}
                userId={userId}
                isToggle={isToggle}
                setIsToggle={setIsToggle}
                isSubmit={isSubmit}
              />
            )
          })}
          <CommentWrite postId={postId} setIsSubmit={setIsSubmit} />
        </>
      )}
    </>
  )
}
