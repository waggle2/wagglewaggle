import style from './popularPreview.module.scss'

import Link from '@/node_modules/next/link'
import Popular from '@/public/assets/popular.svg'
import Next from '@/public/assets/next.svg'

import CatTemplate from './_components/CatTemplate'
import DogTemplate from './_components/DogTemplate'
import FoxTemplate from './_components/FoxTemplate'
import BearTemplate from './_components/BearTemplate'

import api from '@/app/_api/commonApi'

export default async function PopularPreview() {
  // const data = await api.get('/hot-posts')
  // console.log(data, 'data!')
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
        <CatTemplate
          profile={{
            image: '',
            name: '익명의 곰',
            category: '수다수다',
            tag: '19',
            animal: '',
          }}
          post={{
            id: 1,
            time: '2024-12-01',
            title: '아 정말 못참겠디',
            content:
              '남친이 자꾸 짜증나게 구는데 어떻게 해야 돼? 그냥 헤어질까 싶기도',
            likes: 0,
            comments: 0,
            views: 0,
          }}
        />
        <DogTemplate
          profile={{
            image: '',
            name: '익명의 곰',
            category: '수다수다',
            tag: '19',
            animal: '',
          }}
          post={{
            id: 1,
            time: '2024-12-01',
            title: '아 정말 못참겠디',
            content:
              '남친이 자꾸 짜증나게 구는데 어떻게 해야 돼? 그냥 헤어질까 싶기도',
            likes: 0,
            comments: 0,
            views: 0,
          }}
        />
        <FoxTemplate
          profile={{
            image: '',
            name: '익명의 곰',
            category: '수다수다',
            tag: '19',
            animal: '',
          }}
          post={{
            id: 1,
            time: '2024-12-01',
            title: '아 정말 못참겠디',
            content:
              '남친이 자꾸 짜증나게 구는데 어떻게 해야 돼? 그냥 헤어질까 싶기도',
            likes: 0,
            comments: 0,
            views: 0,
          }}
        />
        <BearTemplate
          profile={{
            image: '',
            name: '익명의 곰',
            category: '수다수다',
            tag: '19',
            animal: '',
          }}
          post={{
            id: 1,
            time: '2024-12-01',
            title: '아 정말 못참겠디',
            content:
              '남친이 자꾸 짜증나게 구는데 어떻게 해야 돼? 그냥 헤어질까 싶기도',
            likes: 0,
            comments: 0,
            views: 0,
          }}
        />
      </div>
    </section>
  )
}
