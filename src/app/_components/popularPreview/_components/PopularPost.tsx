import style from './popularPost.module.scss'
import DOMPurify from 'isomorphic-dompurify'
import cs from 'classnames/bind'
const cx = cs.bind(style)

import { postProps } from '../_types/postType'
import Link from '@/node_modules/next/link'

import View from '@/public/assets/view.svg'
import Comment from '@/public/assets/comment.svg'
import CatCover from '@/public/assets/catCover.svg'
import BearCover from '@/public/assets/bearCover.svg'
import FoxCover from '@/public/assets/foxCover.svg'
import DogCover from '@/public/assets/dogCover.svg'

export default function PopularPost({ profile, post }: postProps) {
  return (
    <Link
      className={cx(`${profile.animal}`, 'container')}
      href={`/detail/${post.id}`}
    >
      <div className={style.categoryWrapper}>
        <span className={cx(`${profile.animal}`, 'category')}>
          {profile.category}
        </span>
        <span className={cx(`${profile.animal}`, 'tag')}>{profile.tag}</span>
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
          <div className={style.name}>
            {profile.name ? profile.name : '탈퇴한 회원'}
          </div>
          <div className={style.time}>2024-12-01</div>
          <div className={style.infoWrapper}>
            <span className={style.info}>
              <View width="15" height="14" />
              {post.views}
            </span>
            <span className={style.info}>
              <Comment />
              {post.comments}
            </span>
          </div>
        </div>
      </div>
      {profile.animal === '고냥이' && <CatCover className={style.bgAnimal} />}
      {profile.animal === '곰돌이' && <BearCover className={style.bgAnimal} />}
      {profile.animal === '댕댕이' && <DogCover className={style.bgAnimal} />}
      {profile.animal === '폭스' && <FoxCover className={style.bgAnimal} />}
    </Link>
  )
}
