import style from './popularPost.module.scss'

import { postProps } from '../_types/postType'
import Link from '@/node_modules/next/link'
import CatTemplate from './CatTemplate'
import DogTemplate from './DogTemplate'
import FoxTemplate from './FoxTemplate'
import BearTemplate from './BearTemplate'

export default function PopularPost({ profile, post }: postProps) {
  switch (profile.animal) {
    case '고냥이':
      return (
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
      )
    case '댕댕이':
      return (
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
      )
    case '폭스':
      return (
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
      )
    case '곰돌이':
      return (
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
      )

    default:
      return (
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
      )
  }
}
