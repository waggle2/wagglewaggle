import style from './popularPreview.module.scss'

import Link from '@/node_modules/next/link'
import Popular from '@/public/assets/popular.svg'
import Next from '@/public/assets/next.svg'

import { postData } from '../postPreview/_types/responseType'

import api from '@/app/_api/commonApi'
import PopularPost from './_components/PopularPost'

export default async function PopularPreview() {
  const fetchData = async () => {
    try {
      const res = await api.get('posts/hot-posts?page=1&pageSize=10')
      console.log(res.data, 'data!')
      return res.data
    } catch (err) {
      console.log(err)
    }
  }
  const postData = await fetchData()

  return (
    <section className={style.container}>
      <div className={style.titleContainer}>
        <div className={style.titleWrapper}>
          {<Popular />}
          <label className={style.title}>{'바글바글 인기글'}</label>
        </div>
        <Link href={''}>
          <Next />
        </Link>
      </div>
      <div className={style.postContainer}>
        {postData?.map((postData: postData) => {
          return (
            <PopularPost
              profile={{
                isAnonymous: postData.isAnonymous,
                image: postData.author?.profileItems,
                name: postData.author?.credential.nickname,
                category: postData.category,
                tag: postData.tag,
                animal: postData.animalOfAuthor,
              }}
              post={{
                id: postData.id,
                time: postData.createdAt,
                title: postData.title,
                content: postData.content,
                likes: postData.likes,
                comments: postData.commentNum,
                views: postData.views,
              }}
              key={postData.id}
            />
          )
        })}
      </div>
    </section>
  )
}
