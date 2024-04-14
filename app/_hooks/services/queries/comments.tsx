import api from '@/app/_api/commonApi'
import { useQuery } from '@tanstack/react-query'

const getComments = async (postId: number) => {
  const response = await api.get(`/comments?postId=${postId}`)
  return response.data
}

export default function useGetComments(postId: number) {
  return useQuery({
    queryKey: ['get-comments', postId],
    queryFn: ({ queryKey }) => getComments(queryKey[1] as number),
  })
}
