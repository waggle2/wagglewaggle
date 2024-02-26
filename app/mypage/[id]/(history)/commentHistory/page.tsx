import style from '../history.module.scss'
import Header from '@/app/_components/common/header/Header'
import Back from '@/app/_components/common/header/_components/Back'
import Post from '@/app/_components/postPreview/_components/Post'

export default function CommentHistory() {
  return (
    <div className={style.postContainer}>
      <Post
        profile={{
          image: undefined,
          name: '',
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
      <Post
        profile={{
          image: undefined,
          name: '',
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
  )
}
