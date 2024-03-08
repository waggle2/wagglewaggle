'use client'
import DOMPurify from 'isomorphic-dompurify'
import style from './post.module.scss'
import Like from '/public/assets/like.svg'
import Comment from '/public/assets/comment.svg'
import View from '/public/assets/view.svg'
import { useRouter } from 'next/navigation'
import userVerify from '@/app/_lib/userVerify'
import api from '@/app/_api/commonApi'

type Props = {
  post: {
    id: number
    tag: string
    category: string
    time: string
    title: string
    content: string
    likes: any[]
    comments: number
    views: number
  }
}
export default function PostDetail({ post }: Props) {
  const router = useRouter()
  const handleNavigate = async () => {
    if (post.category === '19') {
      const isVerified = window.localStorage.getItem('isVerified')
      if (isVerified !== 'true') {
        if (
          confirm(
            '본인인증이 필요한 게시판입니다.\n본인인증 페이지로 이동하시겠습니까?',
          )
        ) {
          userVerify()
        }
        return
      }
    }
    router.push(`/detail/${post.id}`)
  }
  return (
    <div className={style.detailContainer} onClick={() => handleNavigate()}>
      <div className={style.contentContainer}>
        <div className={style.title}>{post.title}</div>
        {typeof window ? (
          <div
            className={style.content}
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(post.content),
            }}
          /> //js코드 실행 방지용 라이브러리 사용(해킹 방지)
        ) : (
          <div />
        )}
      </div>
      <div className={style.postInfoContainer}>
        <div className={style.postInfoWrapper}>
          <Like />
          <span className={style.likes}>
            {post.likes ? post.likes.length : 0}
          </span>
        </div>
        <div className={style.postInfoWrapper}>
          <Comment />
          <span className={style.likes}>{post.comments}</span>
        </div>
        <div className={style.postInfoWrapper}>
          <View width="15" height="14" />
          <span className={style.likes}>{post.views}</span>
        </div>
      </div>
    </div>
  )
}
