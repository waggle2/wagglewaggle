import style from './post.module.css'
import Image from '@/node_modules/next/image'

import like from '@/public/like.svg'
import comment from '@/public/comment.svg'
import view from '@/public/view.svg'

type Props = {
  profile: {
    image: string
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
          <div className={style.profileImageWrapper}>
            <Image src={profile.image} alt={'profile image'} />
          </div>
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
          <Image src={like} alt={'likes'} />
          <span className={style.likes}>{post.likes}</span>
        </div>
        <div className={style.postInfoWrapper}>
          <Image src={comment} alt={'comments'} />
          <span className={style.likes}>{post.likes}</span>
        </div>
        <div className={style.postInfoWrapper}>
          <Image src={view} alt={'views'} />
          <span className={style.likes}>{post.likes}</span>
        </div>
      </div>
    </div>
  )
}
