import { selector } from 'recoil'
import axiosInstance from '@/app/_api/config'
import {
  selectedTabState,
  selectedItemTypeState,
} from '@/app/_recoil/atoms/pointshopState'

export const fetchItemState = selector({
  key: 'fetchItemState',
  get: async ({ get }) => {
    const selectedTab = get(selectedTabState)
    const selectedItemType = get(selectedItemTypeState)
    const endpoint = `/items/animals?animal=${encodeURIComponent(selectedTab)}&itemType=${encodeURIComponent(selectedItemType)}`
    const usersEndpoint = `/users`
    const wearingItemsEndPoint = `/items/profile?animal=${encodeURIComponent(selectedTab)}`

    try {
      const [itemsResponse, usersResponse, wearingItemsResponse] =
        await Promise.all([
          axiosInstance.get(endpoint),
          axiosInstance.get(usersEndpoint),
          axiosInstance.get(wearingItemsEndPoint),
        ])

      console.log('착용중인 ' + selectedTab + ' 아이템 ⬇︎⬇︎ ')
      console.log(wearingItemsResponse.data)

      const itemsData = itemsResponse.data.data.items
      const animalKeyMap = {
        고냥이: 'catCoins',
        곰돌이: 'bearCoins',
        댕댕이: 'dogCoins',
        폭스: 'foxCoins',
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
