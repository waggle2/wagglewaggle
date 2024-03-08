'use client'
import useGetPostLike from '@/app/_hooks/services/queries/postLike'
import HeartIcon from '/public/assets/heart.svg'

interface LikeSectionProps {
  postId: number
}
export default function LikeSection({ postId }: LikeSectionProps) {
  const { data, isLoading } = useGetPostLike(postId)
  return (
    <>
      {!isLoading && (
        <div>
          <HeartIcon width="16" height="16" color="#8c8c8c" />
          <span>{data?.likeCount}</span>
        </div>
      )}
    </>
  )
}
