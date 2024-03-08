import api from '@/app/_api/commonApi'
import Content from '../_components/Content'
import styles from '../styles/page.module.scss'
import { PageProps } from '@/.next/types/app/layout'

export default async function Write({ params }: PageProps) {
  const response = await api.get(`/posts/${params.id}`)
  const data = response.data
  return (
    <div className={styles.container}>
      <Content
        postId={params.id}
        editTitle={data.title}
        editContent={data.content}
        editCategory={data.category}
        editTag={data.tag}
        editIsAnonymous={data.isAnonymous}
      />
    </div>
  )
}
