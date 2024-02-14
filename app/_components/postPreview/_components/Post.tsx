import { ReactNode } from 'react'

import style from './post.module.scss'

import Like from '@/public/assets/like.svg'
import Comment from '@/public/assets/comment.svg'
import View from '@/public/assets/view.svg'
import FoxDefault from '@/public/assets/fox_default.svg'
import BearDefault from '@/public/assets/bear_default.svg'
import DogDefault from '@/public/assets/dog_default.svg'
import CatDefault from '@/public/assets/cat_default.svg'

import Link from '@/node_modules/next/link'
import formatDate from '@/app/_lib/formatDate'

type Props = {
  profile: {
    image?: ReactNode
    name: string
    animal?: string
    isAnonymous: boolean
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
  let defaultProfile
  switch (profile.animal) {
    case '개':
      defaultProfile = <DogDefault />
      break
    case '고양이':
      defaultProfile = <CatDefault />
      break
    case '여우':
      defaultProfile = <FoxDefault />
      break
    case '곰':
      defaultProfile = <BearDefault />
      break
    default:
  }

  return (
    <div className={style.container}>
      <div className={style.profileContainer}>
        <Link
          href={`http://localhost:3000/profile/1`}
          scroll={false}
          className={style.profileWrapper}
        >
          {profile.image ? profile.image : defaultProfile}

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
      <Link href={''}>
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
    </div>
  )
}
