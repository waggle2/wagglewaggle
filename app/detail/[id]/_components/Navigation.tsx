'use client'
import Header from '@/app/_components/common/header/Header'
import Back from '@/app/_components/common/header/_components/Back'
import Heart from '@/app/_components/common/header/_components/Heart'
import MoreMenu from '@/app/_components/common/header/_components/MoreMenu'
import style from '../styles/navigation.module.scss'
import { useState } from 'react'
import { useDeletePost } from '@/app/_hooks/services/mutations/deletePost'
import { useRouter } from 'next/navigation'
import useGetUserInfo from '@/app/_hooks/services/queries/userInfo'

interface NavigationProps {
  postId: number
  authorNickname: string
}
export default function Navigation({
  postId,
  authorNickname,
}: NavigationProps) {
  const [isToggle, setIsToggle] = useState(false)
  const { mutate: postDelete } = useDeletePost()
  const { data: userInfo, isLoading } = useGetUserInfo()
  const router = useRouter()
  return (
    <div className={style.container}>
      {!isLoading && (
        <Header
          leftSection={<Back />}
          rightSection={[
            <Heart />,
            userInfo.credential.nickname === authorNickname && (
              <MoreMenu clickEvent={() => setIsToggle(!isToggle)} />
            ),
          ]}
        />
      )}
      {isToggle && (
        <div className={style.dropdown}>
          <div onClick={() => router.push('/write')}>게시글 수정</div>
          <div className={style.line}></div>
          <div onClick={() => postDelete(postId)}>게시글 삭제</div>
        </div>
      )}
    </div>
  )
}
