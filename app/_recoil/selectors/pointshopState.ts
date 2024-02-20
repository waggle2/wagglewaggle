import { selector } from 'recoil'
import axiosInstance from '@/app/_api/config'
import {
  selectedTabState,
  selectedItemTypeState,
  ItemData,
  CartData,
} from '@/app/_recoil/atoms/pointshopState'

export const itemsState = selector<ItemData[]>({
  key: 'itemsState',
  get: async ({ get }) => {
    const selectedTab = get(selectedTabState)
    const selectedItemType = get(selectedItemTypeState)
    const endpoint = `/items/animals?animal=${encodeURIComponent(selectedTab)}&itemType=${encodeURIComponent(selectedItemType)}`
    try {
      const response = await axiosInstance.get(endpoint)
      return response.data.data.items
    } catch (error) {
      console.error('아이템 데이터를 가져오는 중 오류 발생:', error)
      return []
    }
  },
})

export const userCoinsState = selector<number>({
  key: 'userCoinsState',
  get: async ({ get }) => {
    const selectedTab = get(selectedTabState)
    const endpoint = `/users`
    try {
      const response = await axiosInstance.get(endpoint)
      const animalKeyMap = {
        고냥이: 'catCoins',
        곰돌이: 'bearCoins',
        댕댕이: 'dogCoins',
        폭스: 'foxCoins',
      }
      const animalCoinKey = animalKeyMap[selectedTab]
      return response.data.data[animalCoinKey]
    } catch (error) {
      console.error('사용자 코인 데이터를 가져오는 중 오류 발생:', error)
      return 0
    }
  },
})

export const wearingItemsState = selector({
  key: 'wearingItemsState',
  get: async ({ get }) => {
    const selectedTab = get(selectedTabState)
    const endpoint = `/items/profile?animal=${encodeURIComponent(selectedTab)}`
    try {
      const response = await axiosInstance.get(endpoint)
      return response.data.data
    } catch (error) {
      console.error('착용 아이템 데이터를 가져오는 중 오류 발생:', error)
      return {}
    }
  },
})

export const cartItemsState = selector<CartData>({
  key: 'cartItemsState',
  get: async ({ get }) => {
    const selectedTab = get(selectedTabState)
    const endpoint = `/items/cart?animal=${encodeURIComponent(selectedTab)}`

    try {
      const response = await axiosInstance.get(endpoint)
      return {
        cartItems: response.data.data.items,
        totalCoins: response.data.data.totalCoins,
      }
    } catch (error) {
      console.error('장바구니 데이터를 가져오는 중 오류 발생:', error)
      return { cartItems: [], totalCoins: 0 }
    }
  },
})
