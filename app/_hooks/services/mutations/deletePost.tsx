'use client'
import api from '@/app/_api/commonApi'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'

const deletePost = async (postId: number): Promise<{ message: string }> => {
  const response = await api.delete(`/posts/${postId}`)
  return response
}
export function useDeletePost() {
  const router = useRouter()
  return useMutation({
    mutationFn: (postId: number) => deletePost(postId),
    onSuccess: (response) => {
      alert(response.message)
      router.push('/')
    },
    onError: (response) => {
      alert(response.message)
    },
  })
}
