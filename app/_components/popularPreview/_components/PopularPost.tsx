import style from './popularPost.module.scss'

import { postProps } from '../_types/postType'
import Link from '@/node_modules/next/link'
import CatTemplate from './CatTemplate'
import DogTemplate from './DogTemplate'
import FoxTemplate from './FoxTemplate'
import BearTemplate from './BearTemplate'

export default function PopularPost({ profile, post }: postProps) {
  //TODO: 여기서 css 누적 로딩 일어나는거 같음 리팩토링에서 수정
  //The resource <URL> was preloaded using link preload but not used within a few seconds from the window's load event. Please make sure it has an appropriate `as` value and it is preloaded intentionally.
  switch (profile.animal) {
    case '고냥이':
      return (
        <CatTemplate
          profile={{
            isAnonymous: profile.isAnonymous,
            image: profile.image,
            name: profile.name,
            category: profile.category,
            tag: profile.tag,
            animal: profile.animal,
          }}
          post={{
            id: post.id,
            time: post.time,
            title: post.title,
            content: post.content,
            likes: post.likes,
            comments: post.comments,
            views: post.views,
          }}
        />
      )
    case '댕댕이':
      return (
        <DogTemplate
          profile={{
            isAnonymous: profile.isAnonymous,
            image: profile.image,
            name: profile.name,
            category: profile.category,
            tag: profile.tag,
            animal: profile.animal,
          }}
          post={{
            id: post.id,
            time: post.time,
            title: post.title,
            content: post.content,
            likes: post.likes,
            comments: post.comments,
            views: post.views,
          }}
        />
      )
    case '폭스':
      return (
        <FoxTemplate
          profile={{
            isAnonymous: profile.isAnonymous,
            image: profile.image,
            name: profile.name,
            category: profile.category,
            tag: profile.tag,
            animal: profile.animal,
          }}
          post={{
            id: post.id,
            time: post.time,
            title: post.title,
            content: post.content,
            likes: post.likes,
            comments: post.comments,
            views: post.views,
          }}
        />
      )
    case '곰돌이':
      return (
        <BearTemplate
          profile={{
            isAnonymous: profile.isAnonymous,
            image: profile.image,
            name: profile.name,
            category: profile.category,
            tag: profile.tag,
            animal: profile.animal,
          }}
          post={{
            id: post.id,
            time: post.time,
            title: post.title,
            content: post.content,
            likes: post.likes,
            comments: post.comments,
            views: post.views,
          }}
        />
      )

    default:
    // return (
    // <BearTemplate
    //   profile={{
    //     isAnonymous: profile.isAnonymous,
    //     image: [],
    //     name: 'test',
    //     category: 'test',
    //     tag: 'test',
    //     animal: '곰돌이',
    //   }}
    //   post={{
    //     id: post.id,
    //     time: post.time,
    //     title: post.title,
    //     content: 'test',
    //     likes: [],
    //     comments: 0,
    //     views: 0,
    //   }}
    // />
    // )
  }
}
