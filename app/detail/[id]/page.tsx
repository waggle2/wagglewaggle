import styles from './styles/page.module.scss'
import Content from './_components/Content'
import Comment from './_components/Comment'
<<<<<<< HEAD
import Sort from '/public/assets/sort.svg'
=======
>>>>>>> 6d3975185bb40e2af42e71ba2195050834d962c4
import { PageProps } from '@/.next/types/app/layout'
import api from '@/app/_api/commonApi'
import { formatDate } from '@/app/_lib/formatDate'
import Navigation from './_components/Navigation'

export default async function Detail({ params }: PageProps) {
  const response = await api.get(`/posts/${params.id}`)
  const data = response.data
  console.log(data)
  return (
    <div className={styles.container}>
      <Navigation
        postId={params.id}
        authorNickname={data.author.credential.nickname}
      />
      <Content
        postId={params.id}
        title={data.title}
        nickName={
          data.isAnonymous
            ? `익명의 ${data.animalOfAuthor}`
            : data.author.credential.nickname
        }
        content={data.content}
        tag={data.tag}
        category={data.category}
        date={formatDate(data.createdAt)}
        views={data.views}
      />
      <div className={styles.boldLine}></div>
      <Comment postId={params.id} />
    </div>
  )
}
