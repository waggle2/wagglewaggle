import api from '@/app/_api/commonApi'
import { useQuery } from '@tanstack/react-query'

const getVotes = async (postId: number) => {
  const response = await api.get(`/posts/${postId}`)
  return response.data.poll
}

export default function useGetVotes(postId: number) {
  return useQuery({
    queryKey: ['get-votes', postId],
    queryFn: ({ queryKey }) => getVotes(queryKey[1] as number),
  })
}
