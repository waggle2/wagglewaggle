import api from '@/app/_api/commonApi'
import { AnimalTab, ItemData, CartData } from '@/app/_recoil/atoms/pointshopState';

//유저가 착용하고 있는 아이템
export const fetchWearingItems = async (selectedTab: AnimalTab) => {
  const endpoint = `/items/profile?animal=${encodeURIComponent(selectedTab)}`;
  try {
    const data = await api.get(endpoint);
    // console.log(data.message)
    // console.log(data.data)

    if (data.data === null) {
      return {
        emoji: '',
        profileBg: '',
        frame: '',
        wallpaper: '',
      };
    }
    return data.data;

  } catch (error) {
    console.error('착용 아이템 데이터를 가져오는 중 오류 발생:', error);
    return {};
  }
};

//유저가 갖고 있는(보유중인) 아이템
export const fetchPossessionItems = async (selectedTab: AnimalTab, selectedItemType: string) => {
  const endpoint = `/items/?animal=${encodeURIComponent(selectedTab)}&itemType=${encodeURIComponent(selectedItemType)}`;
  try {
    const data = await api.get(endpoint);
    return data.data;

  } catch (error) {
    console.error('아이템 데이터를 가져오는 중 오류 발생:', error);
  }

}


//동물별 아이템 목록
export const fetchItems = async (selectedTab: AnimalTab, selectedItemType: string) => {
  const endpoint = `/items/animals?animal=${encodeURIComponent(selectedTab)}&itemType=${encodeURIComponent(selectedItemType)}`;
  try {
    const data = await api.get(endpoint);
    // console.log(data.message)
    return data.data.items;
  } catch (error) {
    console.error('아이템 데이터를 가져오는 중 오류 발생:', error);
    return [];
  }
};


//동물별 보유코인
export const fetchAnimalCoin = async (selectedTab: AnimalTab) => {
  const endpoint = `/users`;
  const animalKeyMap = {
    고냥이: 'catCoins',
    곰돌이: 'bearCoins',
    댕댕이: 'dogCoins',
    폭스: 'foxCoins',
  };
  try {
    const data = await api.get(endpoint);
    const animalCoinKey = animalKeyMap[selectedTab];
    // console.log(data.message)

    return data.data[animalCoinKey];

  } catch (error) {
    console.error("동물 코인 정보를 가져오는 데 실패했습니다.", error);
    return 0;
  }
};


//동물별 장바구니 데이터
export const fetchCartItems = async (selectedTab: AnimalTab) => {
  const endpoint = `/items/cart?animal=${encodeURIComponent(selectedTab)}`;
  try {
    const data = await api.get(endpoint);
    // console.log(data.message)

    return {
      cartItems: data.data.items,
      totalCoins: data.data.totalCoins,
    };
  } catch (error) {
    console.error('장바구니 데이터를 가져오는 중 오류 발생:', error);
    return { cartItems: [], totalCoins: 0 };
  }
};


// 동물별 장바구니 전체 아이템 구매 처리
export const checkoutAnimalCartItems = async (selectedTab: AnimalTab, cartItems: ItemData[]) => {
  const endpoint = `/items/cart?animal=${encodeURIComponent(selectedTab)}`;

  try {
    const data = await api.patch(endpoint, cartItems);
    // console.log(data.message);
    return data;
  } catch (error) {
    console.log(error);
  }
}


// 선택한 아이템으로 유저 프로필 업데이트
export const updateProfileItems = async (animal: AnimalTab, itemIds: number[][]) => {
  const endpoint = '/items/profile';

  try {
    const requestBody = {
      animal,
      itemIds, // 이중 배열을 직접 사용
    };

    const data = await api.patch(endpoint, requestBody, {
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json',
      },
    });

    // console.log(data.message);
    return data;
  } catch (error) {
    console.error('프로필 아이템 업데이트 중 오류 발생:', error);
  }
};
