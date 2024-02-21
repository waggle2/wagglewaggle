import styles from './styles/page.module.scss'
import Content from './_components/Content'
import Comment from './_components/Comment'
import Sort from '/public/assets/sort.svg'
import Header from '@/app/_components/common/header/page'
import Back from '@/app/_components/common/header/_components/Back'
import Heart from '@/app/_components/common/header/_components/Heart'
import MoreMenu from '@/app/_components/common/header/_components/MoreMenu'
import { PageProps } from '@/.next/types/app/layout'
import api from '@/app/_api/commonApi'
import formatDate from '@/app/_lib/formatDate'

export default async function Detail({ params }: PageProps) {
  const response = await api.get(`/posts/${params.id}`)
  const data = response.data
  return (
    <div className={styles.container}>
      <Header leftSection={<Back />} rightSection={[<Heart />, <MoreMenu />]} />
      <Content
        title={data.title}
        nickName={
          data.isAnonymous
            ? `익명의 ${data.animalOfAuthor}`
            : data.credential.nickname
        }
        content={data.content}
        tag={data.tag}
        category={data.category}
        date={formatDate(data.createdAt)}
        likes={data.likes === null ? 0 : data.likes.length}
        views={data.views}
      />
      <div className={styles.boldLine}></div>
      <div className={styles.commentInfo}>
        <div>
          <span>댓글</span>
          <span>2</span>
        </div>
        <div>
          <Sort width="14" height="14" />
          <span>최신순</span>
        </div>
      </div>
      <Comment nickName="익명의 냥이" />
      <div className={styles.line} />
      <Comment nickName="익명의 냥이" />
      <div className={styles.line} />
      <Comment nickName="익명의 냥이" />
    </div>
  )
}
