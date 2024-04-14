import api from '@/app/_api/commonApi'
import { IImage } from '@/app/_types/postTypes'
import { useMutation } from '@tanstack/react-query'

const postImage = async (imageName: string, image: File): Promise<string> => {
  const imageUrl = await api.post('/presign-urls', {
    filename: imageName,
  })
  await fetch(imageUrl.data.signedUrl, {
    method: 'PUT',
    headers: {
      'Content-Type': image.type,
    },
    body: image,
  })
  return imageUrl.data.publicUrl
}
export function usePostImage() {
  return useMutation({
    mutationFn: ({ imageName, image }: IImage) => postImage(imageName, image),
  })
}
