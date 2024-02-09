import style from './postPreview.module.scss'

import Link from '@/node_modules/next/link'

import Next from '@/public/assets/next.svg'
import { ReactNode } from 'react'
import Posts from './_components/Posts'
import Post from './_components/Post'

type Props = {
  title: string
  href: string
  icon?: ReactNode
}

export default function PostPreview({ title, href, icon }: Props) {
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
        {/* @ts-expect-error Async Server Component */}
        {/* <Posts title={title} /> */}
        <Post
          profile={{
            image: undefined,
            name: 'test',
            animal: undefined,
          }}
          post={{
            id: 0,
            tag: '',
            category: '',
            time: '',
            title: '',
            content: '',
            likes: 0,
            comments: 0,
            views: 0,
          }}
        />
      </div>
    </section>
  )
}
