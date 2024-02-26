'use client'
import Sort from '/public/assets/sort.svg'
import styles from '../styles/comment.module.scss'
import CommentInfo from './CommentInfo'
import CommentWrite from './CommentWrite'
import useGetComments from '@/app/_hooks/services/queries/comments'
import formatDate from '@/app/_lib/formatDate'
import useGetUserInfo from '@/app/_hooks/services/queries/userInfo'
import { useState } from 'react'
interface CommentProps {
  postId: number
}
export default function Comment({ postId }: CommentProps) {
  const { data, isLoading } = useGetComments(postId)
  const { data: userInfo, isLoading: isUserLoading } = useGetUserInfo()
  const [editIdx, setEditIdx] = useState<number | null>(null)
  return (
    <>
      {!isLoading && !isUserLoading && (
        <>
          <div className={styles.commentInfo}>
            <div>
              <span>댓글</span>
              <span>{data.length}</span>
            </div>
            <div>
              <Sort width="14" height="14" />
              <span>최신순</span>
            </div>
          </div>
          <CommentWrite postId={postId} isEdit={false} />
          {data.map((item: any, idx: number) => {
            return (
              <>
                <div className={styles.line} />
                {idx === editIdx ? (
                  <CommentWrite
                    commentId={item.id}
                    postId={postId}
                    isEdit={idx === editIdx}
                    setEditIdx={setEditIdx}
                    initialContent={item.content}
                    initialAnonymous={item.isAnonymous}
                  />
                ) : (
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
                  />
                )}
              </>
            )
          })}
        </>
      )}
    </>
  )
}
