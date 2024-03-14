import { avatarItemList } from '@/app/mypage/profileSetting/_components/types/responseType'
import api from '@/app/_api/commonApi'
import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'

const profileItemList = async (animal: string | null) => {
  const response = await api.get(`/items?animal=${animal}`)
  console.log(animal, 'profileItemList')
  return response.data
}

export default function useProfileItemList(
  animal: string | null,
  setItemList: React.Dispatch<React.SetStateAction<avatarItemList>>,
) {
  const { loading, error, data } = useQuery({
    queryKey: ['get-profile-item-list', animal], //쿼리 키 추가
    queryFn: () => profileItemList(animal),
    staleTime: 10 * 60 * 1000, //10분이 지나기 전에는 해당 요청을 캐싱해서 재요청이 발생하지 않음
    enabled: !!animal, //animal이 undefined일 때 실행하지 않는 코드
  })
  useEffect(() => {
    console.log(data, animal, '여기')
    if (data) setItemList(data)
  }, [data])
}
