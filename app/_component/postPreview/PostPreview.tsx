import style from './postPreview.module.css'

import Link from '@/node_modules/next/link'
import Image from '@/node_modules/next/image'

import Post from './_component/Post'

import nextIcon from '@/public/next.svg'
import testProfile from '@/public/profile.svg'

type Props = {
  title: string
  href: string
  icon: string
}

export default function PostPreview({ title, href, icon }: Props) {
  return (
    <section className={style.container}>
      <div className={style.titleContainer}>
        <div className={style.titleWrapper}>
          <Image src={icon} alt={'nav button'} />
          <label className={style.title}>{title}</label>
        </div>
        <Link href={href}>
          <Image src={nextIcon} alt={'nav button'} />
        </Link>
      </div>
      <div className={style.postContainer}>
        <Post
          profile={{
            image: testProfile,
            name: '익명의 누군가',
            category: '수다수다',
            tag: '19',
          }}
          post={{
            title: '14살 연하랑 썸타본사람? 나 좀 공감해줘',
            content: `아 길거리에서 번호 땄는데 14살 연하야 ㅋ
              서로 연락 자주해서 썸타고 있는거 같긴 한데,, 이게 맞는걸까?`,
            likes: 24,
            comments: 24,
            views: 24,
            time: '1분전',
          }}
        />
        <Post
          profile={{
            image: testProfile,
            name: '익명의 누군가',
            category: '수다수다',
            tag: '19',
          }}
          post={{
            title: '14살 연하랑 썸타본사람? 나 좀 공감해줘',
            content: `아 길거리에서 번호 땄는데 14살 연하야 ㅋ
            서로 연락 자주해서 썸타고 있는거 같긴 한데,, 이게 맞는걸까?`,
            likes: 24,
            comments: 24,
            views: 24,
            time: '1분전',
          }}
        />
      </div>
    </section>
  )
}
