import { ReactNode } from 'react'

import style from './post.module.scss'

import Like from '@/public/assets/like.svg'
import Comment from '@/public/assets/comment.svg'
import View from '@/public/assets/view.svg'
import TestProfile from '@/public/assets/profile.svg'
import Link from '@/node_modules/next/link'
import formatDate from '@/app/_lib/formatDate'

type Props = {
  profile: {
    image?: ReactNode
    name: string
    animal?: string
  }
  post: {
    id: number
    tag: string
    category: string
    time: string
    title: string
    content: string
    likes: number
    comments: number
    views: number
  }
}

export default function Post({ profile, post }: Props) {
  return (
    <Link className={style.container} href={''}>
      <div className={style.profileContainer}>
        <div className={style.profileWrapper}>
          <div className={style.profileImageWrapper}>
            {profile.image ? (
              profile.image
            ) : (
              <TestProfile width={'100%'} height={'100%'} />
            )}
          </div>
          <div className={style.profileInfoWrapper}>
            <div className={style.name}>{profile.name}</div>
            <div
              className={style.category}
            >{`${post.category} · ${post.tag}`}</div>
          </div>
        </div>
        <div className={style.time}>{formatDate(post.time)}</div>
      </div>
      <div className={style.contentContainer}>
        <div className={style.title}>{post.title}</div>
        <div className={style.content}>{post.content}</div>
      </div>
      <div className={style.postInfoContainer}>
        <div className={style.postInfoWrapper}>
          <Like />
          <span className={style.likes}>{post.likes}</span>
        </div>
        <div className={style.postInfoWrapper}>
          <Comment />
          <span className={style.likes}>{post.likes}</span>
        </div>
        <div className={style.postInfoWrapper}>
          <View width="15" height="14" />
          <span className={style.likes}>{post.likes}</span>
        </div>
      </div>
    </Link>
  )
}
