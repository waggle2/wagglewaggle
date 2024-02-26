import DOMPurify from 'isomorphic-dompurify'

import style from './post.module.scss'

import Like from '@/public/assets/like.svg'
import Comment from '@/public/assets/comment.svg'
import View from '@/public/assets/view.svg'

import Link from '@/node_modules/next/link'
import formatDate from '@/app/_lib/formatDate'
import Profile from './Profile'

type Props = {
  profile: {
    image?: any[]
    name: string
    animal: string
    isAnonymous: boolean
  }
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

export default function Post({ profile, post }: Props) {
  return (
    <div className={style.container}>
      <div className={style.profileContainer}>
        <Link
          href={`http://localhost:3000/profile/${post.id}`} //TODO: ID참조 어떻게 할건지
          scroll={false}
          className={style.profileWrapper}
        >
          <Profile isAnonymous={profile.isAnonymous} animal={profile?.animal} />

          <div className={style.profileInfoWrapper}>
            <div className={style.name}>
              {profile.isAnonymous ? '익명의' + profile.animal : profile.name}
            </div>
            <div
              className={style.category}
            >{`${post.category} · ${post.tag}`}</div>
          </div>
        </Link>
        <div className={style.time}>{formatDate(post.time)}</div>
      </div>
      <Link href={`/detail/${post.id}`}>
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
      </Link>
    </div>
  )
}
