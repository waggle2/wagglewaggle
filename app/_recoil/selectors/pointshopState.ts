import { selector } from 'recoil'
import axiosInstance from '@/app/_api/config'
import {
  selectedTabState,
  selectedItemTypeState,
} from '@/app/_recoil/atoms/pointshopState' // 경로는 실제 상황에 맞게 조정해야 함

export const fetchItemState = selector({
  key: 'fetchItemState',
  get: async ({ get }) => {
    const selectedTab = get(selectedTabState) // 실제 선택된 탭 상태에서 가져옴
    const selectedItemType = get(selectedItemTypeState) // 실제 선택된 아이템 타입 상태에서 가져옴
    const endpoint = `/items/animals?animal=${encodeURIComponent(selectedTab)}&itemType=${encodeURIComponent(selectedItemType)}`
    const usersEndpoint = `/users`

    try {
      const [itemsResponse, usersResponse] = await Promise.all([
        axiosInstance.get(endpoint),
        axiosInstance.get(usersEndpoint),
      ])

      const itemsData = itemsResponse.data.data.items
      const animalKeyMap = {
        고양이: 'catCoins',
        곰: 'bearCoins',
        개: 'dogCoins',
        여우: 'foxCoins',
      }
      console.log('동물별 아이템 ⬇︎⬇︎ ')
      console.log(itemsResponse.data)

      const animalCoinKey = animalKeyMap[selectedTab]
      const animalCoinData = usersResponse.data.data[animalCoinKey]

      console.log(selectedTab + ' ' + selectedItemType + ' 아이템 ⬇︎⬇︎ ')
      console.log(itemsData)
      return {
        items: itemsData,
        animalCoin: animalCoinData,
      }
    } catch (error) {
      console.error('Error fetching data:', error)
      return {
        items: [],
        animalCoin: 0,
      }
    }
  },
})
