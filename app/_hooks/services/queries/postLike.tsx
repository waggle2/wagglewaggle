import api from '@/app/_api/commonApi'
import { useQuery } from '@tanstack/react-query'

const getPostLike = async (postId: number) => {
  const response = await api.get(`/posts/${postId}`)
  return {
    likeCount: response.data.likes === null ? 0 : response.data.likes.length,
    likes: response.data.likes === null ? [] : response.data.likes,
  }
}

export default function useGetPostLike(postId: number) {
  return useQuery({
    queryKey: ['get-post-like', postId],
    queryFn: ({ queryKey }) => getPostLike(queryKey[1] as number),
  })
}
