'use client'
import Sort from '/public/assets/sort.svg'
import styles from '../styles/comment.module.scss'
import CommentInfo from './CommentInfo'
import CommentWrite from './CommentWrite'
import useGetComments from '@/app/_hooks/services/queries/comments'
import formatDate from '@/app/_lib/formatDate'
interface CommentProps {
  postId: number
}
export default function Comment({ postId }: CommentProps) {
  const { data, isLoading } = useGetComments(postId)
  return (
    <>
      {!isLoading && (
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
          <CommentWrite postId={postId} />
          {data.map((item: any) => {
            return (
              <>
                <div className={styles.line} />
                <CommentInfo
                  nickName={
                    item.isAnonymous
                      ? `익명의 ${item.author.profileAnimal}`
                      : item.author.credential.nickname
                  }
                  content={item.content}
                  date={formatDate(item.updatedAt)}
                />
              </>
            )
          })}
        </>
      )}
    </>
  )
}
