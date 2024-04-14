import api from '@/app/_api/commonApi'
import { formatDate } from '@/app/_lib/formatDate'
import Wrapper from './_components/Wrapper'
import { PageProps } from '@/.next/types/app/detail/[id]/page'

export default async function Detail({ params }: PageProps) {
  const response = await api.get(`/posts/${params.id}`)
  const data = response.data
  return (
    <Wrapper
      postId={params.id}
      title={data.title}
      nickName={
        data.isAnonymous
          ? `익명의 ${data.animalOfAuthor}`
          : data.author.nickname
      }
      content={data.content}
      tag={data.tag}
      category={data.category}
      date={formatDate(data.createdAt)}
      views={data.views}
      vote={data.poll}
      userId={data.author.id}
    />
  )
}
