'use client'
import api from '@/app/_api/commonApi'
import { IPost } from '@/app/_types/postTypes'
import { useMutation } from '@tanstack/react-query'

const postWrite = async (
  writeData: IPost,
): Promise<{ data: { id: number }; message: string }> => {
  const response = await api.post('/posts', writeData)
  return response
}

const postModify = async (
  writeData: IPost,
  postId: number,
): Promise<{ data: { id: number }; message: string }> => {
  const response = await api.patch(`/posts/${postId}`, writeData)
  return response
}
export function usePostWrite() {
  return useMutation({
    mutationFn: (writeData: IPost) => postWrite(writeData),
  })
}
export function usePostModify(postId: number) {
  return useMutation({
    mutationFn: (writeData: IPost) => postModify(writeData, postId),
  })
}
