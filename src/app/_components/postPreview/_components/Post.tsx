import style from './post.module.scss'
import Link from '@/node_modules/next/link'
import { formatDate } from '@/app/_lib/formatDate'
import Profile from './Profile'
import PostDetail from './PostDetail'

type Props = {
  profile: {
    image?: any[]
    name: string
    animal: string
    isAnonymous: boolean
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
          <Profile isAnonymous={profile.isAnonymous} animal={profile?.animal} />

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
      <PostDetail post={post} />
    </div>
  )
}
