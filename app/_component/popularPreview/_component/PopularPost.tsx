import Image from '@/node_modules/next/image'

import style from './popularPost.module.css'

import view from '@/public/view.svg'
import comment from '@/public/comment.svg'

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

export default function PopularPost({ profile, post }: Props) {
  return (
    <div className={style.container}>
      <div className={style.categoryWrapper}>
        <span className={style.category}>{profile.category}</span>
        <span className={style.category}>{profile.tag}</span>
      </div>
      <div className={style.postWrapper}>
        <div className={style.title}>{post.title}</div>
        <div className={style.content}>{post.content}</div>
      </div>
      <div className={style.postInfoContainer}>
        <div className={style.infoContainer}>
          <div className={style.name}>{profile.name}</div>
          <div className={style.infoWrapper}>
            <div className={style.info}>
              <Image src={view} alt={'view count'} />
              {post.views}
            </div>
            <div className={style.info}>
              <Image src={comment} alt={'comment count'} />
              {post.comments}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
