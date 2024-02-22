import api from '@/app/_api/commonApi'
import { useQuery } from '@tanstack/react-query'

const getPostLike = async (postId: number) => {
  const response = await api.get(`/posts/${postId}`)
  return response.data.likes
}

export default function useGetPostLike(postId: number) {
  return useQuery({
    queryKey: ['get-post-like'],
    queryFn: () => getPostLike(postId),
  })
}
