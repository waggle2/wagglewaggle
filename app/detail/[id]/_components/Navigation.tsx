'use client'
import Header from '@/app/_components/common/header/Header'
import Back from '@/app/_components/common/header/_components/Back'
import Heart from '@/app/_components/common/header/_components/Heart'
import MoreMenu from '@/app/_components/common/header/_components/MoreMenu'
import style from '../styles/navigation.module.scss'
import { Dispatch, SetStateAction } from 'react'
import { useDeletePost } from '@/app/_hooks/services/mutations/deletePost'
import { useRouter } from 'next/navigation'
import useGetUserInfo from '@/app/_hooks/services/queries/userInfo'
import {
  useAddPostLike,
  useDeletePostLike,
} from '@/app/_hooks/services/mutations/postLike'
import useGetPostLike from '@/app/_hooks/services/queries/postLike'

interface NavigationProps {
  postId: number
  isToggle: boolean
  setIsToggle: Dispatch<SetStateAction<boolean>>
}
export default function Navigation({
  postId,
  isToggle,
  setIsToggle,
}: NavigationProps) {
  const { mutate: addPostLike } = useAddPostLike()
  const { mutate: deletePostLike } = useDeletePostLike()
  const { data: userInfo, isLoading } = useGetUserInfo()
  const { data: likeInfo, isLoading: isLikeLoading } = useGetPostLike(postId)
  return (
    <div className={style.container}>
      {!isLoading && !isLikeLoading && (
        <Header
          leftSection={<Back />}
          rightSection={[
            userInfo && (
              <Heart
                isClicked={likeInfo?.likes.includes(userInfo.id)}
                clickEvent={() => {
                  if (likeInfo?.likes.includes(userInfo.id)) {
                    deletePostLike(postId)
                  } else {
                    addPostLike(postId)
                  }
                }}
              />
            ),
            <MoreMenu clickEvent={() => setIsToggle(!isToggle)} />,
          ]}
        />
      )}
    </div>
  )
}
