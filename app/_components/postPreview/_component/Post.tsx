import style from './post.module.scss'
import Image from '@/node_modules/next/image'

import Like from '@/public/assets/like.svg'
import Comment from '@/public/assets/comment.svg'
import View from '@/public/assets/view.svg'
import { ReactNode } from 'react'

type Props = {
  profile: {
    image: ReactNode
    name: string
    category: string
    tag: string
  }
  post: {
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
    <div className={style.container}>
      <div className={style.profileContainer}>
        <div className={style.profileWrapper}>
          <div className={style.profileImageWrapper}>{profile.image}</div>
          <div className={style.profileInfoWrapper}>
            <div className={style.name}>{profile.name}</div>
            <div
              className={style.category}
            >{`${profile.category} · ${profile.tag}`}</div>
          </div>
        </div>
        <div className={style.time}>{post.time}</div>
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
          <View />
          <span className={style.likes}>{post.likes}</span>
        </div>
      </div>
    </div>
  )
}
