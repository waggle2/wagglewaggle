import DOMPurify from 'isomorphic-dompurify'

import style from './popularPost.module.scss'

import View from '@/public/assets/view.svg'
import Comment from '@/public/assets/comment.svg'
import DogCover from '@/public/assets/dogCover.svg'
import { postProps } from '../_types/postType'
import Link from '@/node_modules/next/link'

export default function DogTemplate({ profile, post }: postProps) {
  return (
    <Link className={style.dogContainer} href={`/detail/${post.id}`}>
      <div className={style.categoryWrapper}>
        <span className={style.dogCategory}>{profile.category}</span>
        <span className={style.dogTag}>{profile.tag}</span>
      </div>
      <div className={style.postWrapper}>
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
      <DogCover className={style.bgAnimal} />
    </Link>
  )
}
