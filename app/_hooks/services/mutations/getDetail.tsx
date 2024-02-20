import api from '@/app/_api/commonApi'
import { useQuery } from '@tanstack/react-query'

export const getDetail = async (postId: number): Promise<any> => {
  const response = await api.get(`/posts/${postId}`)
  return response
}
export function useGetDetail(postId: number) {
  return useQuery({
    queryKey: ['get-detail', postId],
    queryFn: ({ queryKey }) => getDetail(queryKey[1] as number),
  })
}
