import Post from './Post'
import api from '@/app/_api/commonApi'

import { postData } from '../_types/responseType'

type props = {
  title?: string
}

//작성자, 조회수 누락
//태그, 카테고리 나누기
//likes 좋아요 누른 유저 , likeNum 좋아요 수

export default async function Posts({ title }: props) {
  let filter = ''

  switch (title) {
    case '따끈따끈 최신글':
      filter = ''
      break

    case '연애 TIP':
      filter = '&tags=연애'
      break

    default:
      break
  }
  const fetchData = async () => {
    try {
      const res = await api.get(`/posts?page=1&pageSize=2${filter}`)

      // console.log(res.data, 'post data')
      return res.data
    } catch (err) {
      console.error(err, 'post error')
    }
  }
  const postData = await fetchData()

  return (
    <>
      {postData?.map((postData: postData, index: number) => {
        return (
          <Post
            key={index}
            profile={{
              image: postData.author.items,
              name: postData.author.credential.nickname,
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
    </>
  )
}
