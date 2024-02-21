import style from './popularPost.module.scss'

import View from '@/public/assets/view.svg'
import Comment from '@/public/assets/comment.svg'
import CatCover from '@/public/assets/catCover.svg'
import Link from '@/node_modules/next/link'
import { postProps } from '../_types/postType'

export default function CatTemplate({ profile, post }: postProps) {
  return (
    <div>
      <Link className={style.catContainer} href={`/detail/${post.id}`}>
        <div className={style.categoryWrapper}>
          <span className={style.catCategory}>{profile.category}</span>
          <span className={style.catTag}>{profile.tag}</span>
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
        <CatCover className={style.bgAnimal} />
      </Link>
    </div>
  )
}
