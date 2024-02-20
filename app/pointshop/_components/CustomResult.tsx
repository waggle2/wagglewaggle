'use client'

import { useEffect, useState } from 'react';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import style from '../_styles/pointShop.module.scss';
import ConfirmChange from './ConfirmChange';
import CustomPreview from './CustomPreview';
import Cart from './Cart';
import ItemSelection from './ItemSelection';
import { AnimalTab, ItemData, CartData } from '@/app/_recoil/atoms/pointshopState';
import api from '@/app/_api/commonApi'

type Props = {
  selectedTab: AnimalTab;
  selectedItemType: string;
  setSelectedItemType: (value: string) => void;
};

export default function CustomResult({
  selectedTab,
  selectedItemType,
  setSelectedItemType,
}: Props) {

  const [confirmModal, setConfirmModal] = useState(false);
  const [wearingItems, setWearingItems] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const [selectedEmoji, setSelectedEmoji] = useState('/assets/point_shop/emoji/cat_angry.svg');
  const [selectedProfileBg, setSelectedProfileBg] = useState('/assets/point_shop/profile_background/프로필배경1.svg');
  const [selectedFrame, setSelectedFrame] = useState('/assets/point_shop/frame/프레임샘플.png');
  const [selectedWallpaper, setSelectedWallpaper] = useState('/assets/point_shop/wallpaper/벽지샘플.png');



  const [animalCoins, setAnimalCoins] = useState(0); // 동물 코인 수를 저장할 상태
  const [items, setItems] = useState([]);
  const [cartData, setCartData] = useState<CartData>({ cartItems: [], totalCoins: 0 });
  const pointDifference = animalCoins - cartData.totalCoins;

  const fetchWearingItems = async (selectedTab: string) => {
    const endpoint = `/items/profile?animal=${encodeURIComponent(selectedTab)}`;
    try {
      const data = await api.get(endpoint);
      console.log(data);

      if (data.data === null) {
        return {
          emoji: '/assets/point_shop/emoji/cat_angry.svg',
          profileBg: '/assets/point_shop/profile_background/프로필배경1.svg',
          frame: '/assets/point_shop/frame/프레임샘플.png',
          wallpaper: '/assets/point_shop/wallpaper/벽지샘플.png',
        };
      }
      return data.data;

    } catch (error) {
      console.error('착용 아이템 데이터를 가져오는 중 오류 발생:', error);
      return {};
    }
  };

  useEffect(() => {
    const loadWearingItems = async () => {
      const fetchedWearingItems = await fetchWearingItems(selectedTab);
      setWearingItems(fetchedWearingItems);
    };
    loadWearingItems();
  }, [cartData.cartItems]);

  const fetchItems = async (selectedTab: string, selectedItemType: string) => {
    const endpoint = `/items/animals?animal=${encodeURIComponent(selectedTab)}&itemType=${encodeURIComponent(selectedItemType)}`;
    try {
      const data = await api.get(endpoint);
      return data.data.items;
    } catch (error) {
      console.error('아이템 데이터를 가져오는 중 오류 발생:', error);
      return [];
    }
  };

  const fetchAnimalCoin = async (selectedTab: AnimalTab) => {
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
      return data.data[animalCoinKey];

    } catch (error) {
      console.error("동물 코인 정보를 가져오는 데 실패했습니다.", error);
      return 0;
    }
  };

  const fetchCartItems = async (selectedTab: string) => {
    const endpoint = `/items/cart?animal=${encodeURIComponent(selectedTab)}`;
    try {
      const data = await api.get(endpoint);
      return {
        cartItems: data.data.items,
        totalCoins: data.data.totalCoins,
      };
    } catch (error) {
      console.error('장바구니 데이터를 가져오는 중 오류 발생:', error);
      return { cartItems: [], totalCoins: 0 };
    }
  };

  useEffect(() => {
    const fetchItemData = async () => {
      setIsLoading(true);
      try {
        const itemsPromise = fetchItems(selectedTab, selectedItemType);
        const coinsPromise = fetchAnimalCoin(selectedTab);
        const [items, coins] = await Promise.all([itemsPromise, coinsPromise]);
        setItems(items);
        setAnimalCoins(coins);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchItemData();
  }, [selectedTab, selectedItemType]);


  const handleConfirmModalClick = () => setConfirmModal(!confirmModal);
  const handleCategoryClick = (itemType: string) => setSelectedItemType(itemType);

  useEffect(() => {
    const getCartData = async () => {
      const fetchedCartData = await fetchCartItems(selectedTab);
      setCartData(fetchedCartData);
    };

    getCartData();
  }, [selectedTab]);


  // const queryClient = useQueryClient();

  const updateSelectedItemImages = (updatedCartItems: ItemData[]) => {
    const emojiItem = updatedCartItems.find(item => item.itemType === 'emoji');
    const backgroundItem = updatedCartItems.find(item => item.itemType === 'background');
    const frameItem = updatedCartItems.find(item => item.itemType === 'frame');
    const wallpaperItem = updatedCartItems.find(item => item.itemType === 'wallpaper');

    if (emojiItem) setSelectedEmoji(emojiItem.image);
    if (backgroundItem) setSelectedProfileBg(backgroundItem.image);
    if (frameItem) setSelectedFrame(frameItem.image);
    if (wallpaperItem) setSelectedWallpaper(wallpaperItem.image);
  };

  const resetSelectedImages = () => {
    setSelectedEmoji('/assets/point_shop/emoji/cat_angry.svg');
    setSelectedProfileBg('/assets/point_shop/profile_background/프로필배경1.svg');
    setSelectedFrame('/assets/point_shop/frame/프레임샘플.png');
    setSelectedWallpaper('/assets/point_shop/wallpaper/벽지샘플.png');
  };


  const addItemMutation = useMutation({
    mutationFn: async ({ itemId, animal }: { itemId: number; animal: string }) => {
      const endpoint = `/items/cart/${itemId}?animal=${animal}`;

      await api.post(endpoint, {});
    },
    onSuccess: async () => {
      console.log('Item added successfully');
      const updatedCartData = await fetchCartItems(selectedTab);
      setCartData(updatedCartData);
      updateSelectedItemImages(updatedCartData.cartItems);
    }
  });

  const removeItemMutation = useMutation({
    mutationFn: async ({ itemId, animal }: { itemId: number; animal: string }) => {
      const endpoint = `/items/cart/${itemId}?animal=${animal}`;
      await api.delete(endpoint);
    },
    onSuccess: async () => {
      console.log('Item removed successfully');
      const updatedCartData = await fetchCartItems(selectedTab);
      setCartData(updatedCartData);
      updateSelectedItemImages(updatedCartData.cartItems);
    }
  });

  const removeAllItemsMutation = useMutation({
    mutationFn: async (animal: string) => {
      const endpoint = `/items/cart?animal=${animal}`;
      await api.delete(endpoint);
    },
    onSuccess: async () => {
      console.log('All items removed successfully');
      const updatedCartData = await fetchCartItems(selectedTab);
      setCartData(updatedCartData);
      resetSelectedImages();
    }
  });



  const handleItemClick = async (item: ItemData) => {
    const existingItem = cartData.cartItems.find(cartItem => cartItem.itemType === item.itemType);
    if (existingItem) {
      await removeItemMutation.mutateAsync({ itemId: existingItem.id, animal: selectedTab });
    }
    addItemMutation.mutate({ itemId: item.id, animal: selectedTab });
  };


  const handleRemoveItemClick = (itemId: number) => {
    removeItemMutation.mutate({ itemId, animal: selectedTab });
  };

  const handleRefreshClick = () => removeAllItemsMutation.mutate(selectedTab);



  useEffect(() => {
    if (confirmModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [confirmModal]);

  return (
    <>
      {confirmModal && (
        <ConfirmChange
          pointDifference={pointDifference}
          selectedItemsLength={cartData.cartItems.length}
          onConfirmClick={handleConfirmModalClick}
        />
      )}
      <CustomPreview
        selectedTab={selectedTab}
        selectedEmoji={selectedEmoji}
        selectedProfileBg={selectedProfileBg}
        selectedFrame={selectedFrame}
        selectedWallpaper={selectedWallpaper}
        possessionCoin={animalCoins}
        handleConfirmModalClick={handleConfirmModalClick}
        handleRefreshClick={handleRefreshClick}
      />
      <Cart
        selectedTab={selectedTab}
        cartItems={cartData.cartItems}
        totalItemPrice={cartData.totalCoins}
        handleRemoveItemClick={handleRemoveItemClick}
      />
      <ItemSelection
        selectedTab={selectedTab}
        selectedItemType={selectedItemType}
        handleCategoryClick={handleCategoryClick}
        tabCategoryButtonStyle={(itemType: string) =>
          itemType === selectedItemType ? `${style.tabButton} ${style.active}` : style.tabButton
        }
        items={items}
        handleItemClick={handleItemClick}
        selectedItems={cartData.cartItems}
        isLoading={isLoading}
      />


    </>
  );
};

