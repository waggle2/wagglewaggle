import { wearingItem } from '@/app/mypage/profileSetting/_components/types/responseType'
import api from '@/app/_api/commonApi'
import { useQuery, useMutation } from '@tanstack/react-query'
import { useEffect } from 'react'

const getProfileAvatar = async (animal: string | null) => {
  const response = await api.get(`items/profile?animal=${animal}`)
  // console.log(animal, 'getProfileAvatar', response)

  return response.data
}

// export default function useGetProfileAvatar(
//   animal: string | null,
//   setData: React.Dispatch<React.SetStateAction<wearingItem | undefined | null>>,
// ) {
//   return useMutation({
//     mutationKey: ['get-profile-avatar', animal],
//     mutationFn: () => getProfileAvatar(animal),

//     onSuccess: (response) => {
//       setData(response)
//       console.log(response, '잘 오나?')
//     },
//   })
// }

export default function useGetProfileAvatar(
  animal: string | null,
  setWearingItem: React.Dispatch<React.SetStateAction<wearingItem>>,
) {
  const { loading, error, data } = useQuery({
    queryKey: ['get-profile-avatar', animal],
    queryFn: () => getProfileAvatar(animal),
    staleTime: 10 * 60 * 1000, //10분이 지나기 전에는 해당 요청을 캐싱해서 재요청이 발생하지 않음
    enabled: !!animal, //animal이 undefined일 때 실행하지 않는 코드
  })

  useEffect(() => {
    console.log(data, animal, '착용중인 프로필')
    if (data) setWearingItem(data)
  }, [data])
}
