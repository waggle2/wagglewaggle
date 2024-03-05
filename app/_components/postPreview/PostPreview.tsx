import style from './postPreview.module.scss'

import Link from '@/node_modules/next/link'

import Next from '@/public/assets/next.svg'
import { ReactNode } from 'react'

import { postData } from './_types/responseType'
import api from '@/app/_api/commonApi'
import Post from './_components/Post'

type Props = {
  title: string
  href: string
  icon?: ReactNode
}

export default async function PostPreview({ title, href, icon }: Props) {
  const fetchData = async () => {
    try {
      const { data } = await api.get(
        // `/posts?page=1&pageSize=2${title === '연애 TIP' ? '&category=연애' : ''}`,
        `/posts?page=1&pageSize=2`,
      )

      console.log(data, title, 'post data')

      return data
    } catch (err) {
      console.error(err, 'post error')
    }
  }
  const postData = await fetchData()

  return (
    <section className={style.container}>
      <div className={style.titleContainer}>
        <div className={style.titleWrapper}>
          {icon}
          <label className={style.title}>{title}</label>
        </div>
        <Link href={href}>
          <Next />
        </Link>
      </div>
      <div className={style.postContainer}>
        {postData?.map((postData: postData, index: number) => {
          return (
            <Post
              key={index}
              profile={{
                image: postData.author?.profileItems,
                name: postData.author?.credential.nickname,
                animal: postData.animalOfAuthor,
                isAnonymous: postData.isAnonymous,
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
