import style from './popularPost.module.scss'

import View from '@/public/assets/view.svg'
import Comment from '@/public/assets/comment.svg'
import FoxCover from '@/public/assets/foxCover.svg'
import { postProps } from '../_types/postType'
import Link from '@/node_modules/next/link'

export default function FoxTemplate({ profile, post }: postProps) {
  return (
    <Link className={style.foxContainer} href={`/detail/${post.id}`}>
      <div className={style.categoryWrapper}>
        <span className={style.foxCategory}>{profile.category}</span>
        <span className={style.foxTag}>{profile.tag}</span>
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
      <FoxCover className={style.bgAnimal} />
    </Link>
  )
}
