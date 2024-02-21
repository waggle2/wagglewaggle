import style from '../history.module.scss'
import Header from '@/app/_components/common/header/Header'
import Back from '@/app/_components/common/header/_components/Back'
import Post from '@/app/_components/postPreview/_components/Post'

export default function CommentHistory() {
  return <Header leftSection={<Back />} title={'내가 댓글 단 글'} />
}
