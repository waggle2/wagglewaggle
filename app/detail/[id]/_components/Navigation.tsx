'use client'
import Header from '@/app/_components/common/header/Header'
import Back from '@/app/_components/common/header/_components/Back'
import Heart from '@/app/_components/common/header/_components/Heart'
import MoreMenu from '@/app/_components/common/header/_components/MoreMenu'
import style from '../styles/navigation.module.scss'
<<<<<<< HEAD
import { useState } from 'react'
import { useDeletePost } from '@/app/_hooks/services/mutations/deletePost'
import { useRouter } from 'next/navigation'
import useGetUserInfo from '@/app/_hooks/services/queries/userInfo'
=======
import { useEffect, useState } from 'react'
import { useDeletePost } from '@/app/_hooks/services/mutations/deletePost'
import { useRouter } from 'next/navigation'
import useGetUserInfo from '@/app/_hooks/services/queries/userInfo'
import {
  useAddPostLike,
  useDeletePostLike,
} from '@/app/_hooks/services/mutations/postLike'
import useGetPostLike from '@/app/_hooks/services/queries/postLike'
>>>>>>> 6d3975185bb40e2af42e71ba2195050834d962c4

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
<<<<<<< HEAD
  const { data: userInfo, isLoading } = useGetUserInfo()
  const router = useRouter()
  return (
    <div className={style.container}>
      {!isLoading && (
        <Header
          leftSection={<Back />}
          rightSection={[
            <Heart />,
=======
  const { mutate: addPostLike } = useAddPostLike()
  const { mutate: deletePostLike } = useDeletePostLike()
  const { data: userInfo, isLoading } = useGetUserInfo()
  const { data: likeInfo, isLoading: isLikeLoading } = useGetPostLike(postId)
  const router = useRouter()
  return (
    <div className={style.container}>
      {!isLoading && !isLikeLoading && (
        <Header
          leftSection={<Back />}
          rightSection={[
            <Heart
              isClicked={likeInfo?.likes.includes(userInfo.id)}
              clickEvent={() => {
                if (likeInfo?.likes.includes(userInfo.id)) {
                  deletePostLike(postId)
                } else {
                  addPostLike(postId)
                }
              }}
            />,
>>>>>>> 6d3975185bb40e2af42e71ba2195050834d962c4
            userInfo.credential.nickname === authorNickname && (
              <MoreMenu clickEvent={() => setIsToggle(!isToggle)} />
            ),
          ]}
        />
      )}
      {isToggle && (
        <div className={style.dropdown}>
<<<<<<< HEAD
          <div onClick={() => router.push('/write')}>게시글 수정</div>
=======
          <div onClick={() => router.push(`/write/${postId}`)}>게시글 수정</div>
>>>>>>> 6d3975185bb40e2af42e71ba2195050834d962c4
          <div className={style.line}></div>
          <div onClick={() => postDelete(postId)}>게시글 삭제</div>
        </div>
      )}
    </div>
  )
}
