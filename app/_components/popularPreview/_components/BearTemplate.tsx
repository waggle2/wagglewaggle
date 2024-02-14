import style from './popularPost.module.scss'

import View from '@/public/assets/view.svg'
import Comment from '@/public/assets/comment.svg'
import BearCover from '@/public/assets/bearCover.svg'

type Props = {
  profile: {
    image: string
    name: string
    category: string
    tag: string
    animal: string
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

export default function BearTemplate({ profile, post }: Props) {
  return (
    <div className={style.bearContainer}>
      <div className={style.categoryWrapper}>
        <span className={style.bearCategory}>{profile.category}</span>
        <span className={style.bearTag}>{profile.tag}</span>
      </div>
      <div className={style.postWrapper}>
        <div className={style.title}>{post.title}</div>
        <div className={style.content}>{post.content}</div>
      </div>
      <div className={style.postInfoContainer}>
        <div className={style.infoContainer}>
          <div className={style.name}>{profile.name}</div>
          <div className={style.time}>2024-12-01</div>
          <div className={style.infoWrapper}>
            <div className={style.info}>
              <View width="15" height="14" />
              {post.views}
            </div>
            <div className={style.info}>
              <Comment />
              {post.comments}
            </div>
          </div>
        </div>
      </div>
      <BearCover className={style.bgAnimal} />
    </div>
  )
}
