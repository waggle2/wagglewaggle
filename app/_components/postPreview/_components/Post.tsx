import style from './post.module.scss'
import Link from '@/node_modules/next/link'
import { formatDate } from '@/app/_lib/formatDate'
import Profile from './Profile'
import PostDetail from './PostDetail'
import { profileItems } from '../_types/responseType'

type Props = {
  profile: {
    image?: profileItems
    name: string
    animal: string
    isAnonymous: boolean
    isWithDraw: boolean
    id: string
  }
  post: {
    id: number
    tag: string
    category: string
    time: string
    title: string
    content: string
    likes: any[]
    comments: number
    views: number
  }
}

export default function Post({ profile, post }: Props) {
  return (
    <div className={style.container}>
      <div className={style.profileContainer}>
        <Link
          href={{
            pathname: `http://localhost:3000/profile/${profile.id}`,
            // query: { userId: `${profile.id}` },
          }}
          scroll={false}
          className={style.profileWrapper}
        >
          <Profile
            isAnonymous={profile.isAnonymous}
            isWithDraw={profile.isWithDraw}
            animal={profile?.animal}
            image={profile?.image}
          />

          <div className={style.profileInfoWrapper}>
            <div className={style.name}>
              {profile.name
                ? profile.isAnonymous
                  ? '익명의' + profile.animal
                  : profile.name
                : '탈퇴한 사용자'}
            </div>
            <div
              className={style.category}
            >{`${post.category} · ${post.tag}`}</div>
          </div>
        </Link>
        <div className={style.time}>{formatDate(post.time)}</div>
      </div>
      <PostDetail post={post} />
    </div>
  )
}
