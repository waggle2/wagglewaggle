import style from './popularPreview.module.css'

import Link from '@/node_modules/next/link'
import Popular from '@/public/popular.svg'
import Next from '@/public/next.svg'
import PopularPost from './_component/PopularPost'

export default function PopularPreview() {
  return (
    <section className={style.container}>
      <div className={style.titleContainer}>
        <div className={style.titleWrapper}>
          {<Popular />}
          <label className={style.title}>{'바글바글 인기글'}</label>
        </div>
        <Link href={''}>
          <Next />
        </Link>
      </div>
      <div className={style.postContainer}>
        <PopularPost
          profile={{
            image: '',
            name: '익명의 곰',
            category: '수다수다',
            tag: '19',
          }}
          post={{
            time: '',
            title: '아 정말 못참겠다',
            content:
              '남친이 자꾸 짜증나게 구는데 어떻게 해야 돼? 그냥 헤어질까 싶기도 한데 그러기엔 좀 아까웡 어쩌구 ...',
            likes: 24,
            comments: 24,
            views: 24,
          }}
        />
        <PopularPost
          profile={{
            image: '',
            name: '익명의 곰',
            category: '수다수다',
            tag: '19',
          }}
          post={{
            time: '',
            title: '아 정말 못참겠다',
            content:
              '남친이 자꾸 짜증나게 구는데 어떻게 해야 돼? 그냥 헤어질까 싶기도 한데 그러기엔 좀 아까웡 어쩌구 ...',
            likes: 24,
            comments: 24,
            views: 24,
          }}
        />
        <PopularPost
          profile={{
            image: '',
            name: '익명의 곰',
            category: '수다수다',
            tag: '19',
          }}
          post={{
            time: '',
            title: '아 정말 못참겠다',
            content:
              '남친이 자꾸 짜증나게 구는데 어떻게 해야 돼? 그냥 헤어질까 싶기도 한데 그러기엔 좀 아까웡 어쩌구 ...',
            likes: 24,
            comments: 24,
            views: 24,
          }}
        />
        <PopularPost
          profile={{
            image: '',
            name: '익명의 곰',
            category: '수다수다',
            tag: '19',
          }}
          post={{
            time: '',
            title: '아 정말 못참겠다',
            content:
              '남친이 자꾸 짜증나게 구는데 어떻게 해야 돼? 그냥 헤어질까 싶기도 한데 그러기엔 좀 아까웡 어쩌구 ...',
            likes: 24,
            comments: 24,
            views: 24,
          }}
        />
        <PopularPost
          profile={{
            image: '',
            name: '익명의 곰',
            category: '수다수다',
            tag: '19',
          }}
          post={{
            time: '',
            title: '아 정말 못참겠다',
            content:
              '남친이 자꾸 짜증나게 구는데 어떻게 해야 돼? 그냥 헤어질까 싶기도 한데 그러기엔 좀 아까웡 어쩌구 ...',
            likes: 24,
            comments: 24,
            views: 24,
          }}
        />
      </div>
    </section>
  )
}
