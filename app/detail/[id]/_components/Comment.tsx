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
  const isLogin =
    typeof window !== 'undefined' && window.localStorage.getItem('isLogin')
  return (
    <>
      {!isLoading && (
        <>
          <div className={styles.commentInfo}>
            <div>
              <span>댓글</span>
              <span>
                {data.reduce(
                  (sum: number, item: { replies: string[] }) =>
                    sum + item.replies.length,
                  0,
                ) + data.length}
              </span>
            </div>
          </div>
          {data.map((item: any, idx: number) => {
            return (
              <>
                <CommentInfo
                  key={idx}
                  commentId={item.id}
                  parentId={item.parentId}
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
                  isReply={false}
                />
                {item.replies &&
                  item.replies.map((reply: any) => {
                    return (
                      <CommentInfo
                        key={idx}
                        commentId={reply.id}
                        parentId={reply.parentId}
                        isAnonymous={reply.isAnonymous}
                        nickName={
                          reply.isAnonymous
                            ? `익명의 ${reply.author.profileAnimal}`
                            : reply.author.credential.nickname
                        }
                        authorId={reply.author.id}
                        content={reply.content}
                        date={formatDate(reply.updatedAt)}
                        stickers={reply.stickers}
                        userId={userId}
                        isToggle={isToggle}
                        setIsToggle={setIsToggle}
                        isSubmit={isSubmit}
                        isReply={true}
                      />
                    )
                  })}
              </>
            )
          })}
          {isLogin === 'true' && (
            <CommentWrite postId={postId} setIsSubmit={setIsSubmit} />
          )}
        </>
      )}
    </>
  )
}
