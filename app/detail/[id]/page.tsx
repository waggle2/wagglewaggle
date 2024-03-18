import styles from './styles/page.module.scss'
import Content from './_components/Content'
import Comment from './_components/Comment'
import { PageProps } from '@/.next/types/app/layout'
import api from '@/app/_api/commonApi'
import { formatDate } from '@/app/_lib/formatDate'
import Navigation from './_components/Navigation'
import userVerify from '@/app/_lib/userVerify'

export default async function Detail({ params }: PageProps) {
  const response = await api.get(`/posts/${params.id}`)
  const data = response.data
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
        vote={data.poll}
      />
      <div className={styles.boldLine}></div>
      <Comment postId={params.id} />
    </div>
  )
}
