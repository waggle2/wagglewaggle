import style from './postPreview.module.scss'

import Link from '@/node_modules/next/link'

import Next from '@/public/assets/next.svg'
import { ReactNode } from 'react'
import Posts from './_components/Posts'

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
        <Posts title={title} />
      </div>
    </section>
  )
}
