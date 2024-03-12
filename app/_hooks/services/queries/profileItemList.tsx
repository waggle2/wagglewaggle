import api from '@/app/_api/commonApi'
import { useQuery } from '@tanstack/react-query'

const profileItemList = async (animal: string | null) => {
  const response = await api.get(`/items?animal=${animal}`)
  console.log(animal, 'profileItemList')
  return response.data
}

export default function useProfileItemList(animal: string | null) {
  return useQuery({
    queryKey: ['get-profile-item-list', animal], //쿼리 키 추가
    queryFn: () => profileItemList(animal),
    staleTime: 10 * 60 * 1000, //10분이 지나기 전에는 해당 요청을 캐싱해서 재요청이 발생하지 않음
    enabled: !!animal, //animal이 undefined일 때 실행하지 않는 코드
    notifyOnChangeProps: ['data'], //데이터가 변경되었을 때만 리렌더링
  })
}
