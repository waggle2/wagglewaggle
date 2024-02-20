import api from '@/app/_api/commonApi'
import { IPost } from '@/app/_types/postTypes'
import { useMutation } from '@tanstack/react-query'

const postWrite = async (writeData: IPost): Promise<any> => {
  const response = await api.post('/posts', writeData)
  return response
}
export function usePostWrite() {
  return useMutation({
    mutationFn: (writeData: IPost) => postWrite(writeData),
    onSuccess: (response) => {
      console.log(response)
      alert('게시글 첨부가 완료되었습니다.') // 임시, 게시글 디테일 페이지 작업 시 해당 게시물 디테일 페이지로 redirect구현 예정
    },
  })
}
