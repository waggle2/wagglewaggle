import style from './postPreview.module.scss'

import Link from '@/node_modules/next/link'

import Next from '@/public/assets/next.svg'
import { ReactNode } from 'react'

import { postData } from './_types/responseType'
import api from '@/app/_api/commonApi'
import Post from './_components/Post'

type Props = {
  title: string
  href:
    | string
    | { pathname: string; query?: { category?: string; title: string } }
  icon?: ReactNode
}

export default async function PostPreview({ title, href, icon }: Props) {
  const fetchData = async () => {
    try {
      const { data } = await api.get(
        `/posts?page=1&pageSize=2${title === '연애 TIP' ? '&category=연애' : ''}`,
      )

      return data
    } catch (err) {}
  }
  const postData = await fetchData()

  return (
    <section className={style.container}>
      <div className={style.titleContainer}>
        <div className={style.titleWrapper}>
          {icon}
          <label className={style.title}>{title}</label>
        </div>
        <Link href={href} scroll={false}>
          <Next />
        </Link>
      </div>
      <div className={style.postContainer}>
        {postData?.map((postData: postData, index: number) => {
          const wearingItem = postData.author.profileItems?.filter(
            (profileItems: any) => {
              return postData.animalOfAuthor === profileItems.animal
            },
          )

          return (
            <Post
              key={index}
              profile={{
                isWithDraw: postData.author ? true : false,
                image: wearingItem,
                name: postData.author?.credential.nickname,
                animal: postData.animalOfAuthor,
                isAnonymous: postData.isAnonymous,
                id: postData.author?.id,
              }}
              post={{
                id: postData.id,
                category: postData.category,
                tag: postData.tag,
                time: postData.createdAt,
                title: postData.title,
                content: postData.content,
                likes: postData.likes,
                comments: postData.commentNum,
                views: postData.views,
              }}
            />
          )
        })}
      </div>
    </section>
  )
}
