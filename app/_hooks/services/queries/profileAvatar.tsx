import { wearingItem } from '@/app/mypage/profileSetting/_components/types/responseType'
import api from '@/app/_api/commonApi'
import { useQuery, useMutation } from '@tanstack/react-query'

const getProfileAvatar = async (animal: string | null) => {
  const response = await api.get(`items/profile?animal=${animal}`)
  console.log(animal, 'getProfileAvatar', response)

  return response.data
}

export default function useGetProfileAvatar(
  animal: string | null,
  setData: React.Dispatch<React.SetStateAction<wearingItem | undefined | null>>,
) {
  return useMutation({
    mutationKey: ['get-profile-avatar', animal],
    mutationFn: () => getProfileAvatar(animal),

    onSuccess: (response) => {
      setData(response)
      console.log(response, '잘 오나?')
    },
  })
}
