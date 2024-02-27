'use client'

import { useEffect, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import style from '../_styles/pointShop.module.scss';
import ConfirmChange from './ConfirmChange';
import CustomPreview from './CustomPreview';
import Cart from './Cart';
import ItemSelection from './ItemSelection';
import { AnimalTab, ItemData, CartData, PossesionItemData } from '@/app/_recoil/atoms/pointshopState';
import api from '@/app/_api/commonApi'
import { fetchWearingItems, fetchPossessionItems, fetchItems, fetchAnimalCoin, fetchCartItems } from '../_service/usePointshopData';

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
  const [wearingItems, setWearingItems] = useState({
    emoji: 0,
    background: 0,
    frame: 0,
    wallpaper: 0,
  });
  const [isLoading, setIsLoading] = useState(false);

  const [possessionItems, setPossessionItems] = useState<PossesionItemData[]>([]);

  const [animalCoins, setAnimalCoins] = useState(0); // 동물별 보유 코인
  const [items, setItems] = useState([]); // 동물별 아이템 리스트
  const [cartData, setCartData] = useState<CartData>({ cartItems: [], totalCoins: 0 });
  const pointDifference = animalCoins - cartData.totalCoins;

  //착용 미리보기 이미지
  const [selectedEmoji, setSelectedEmoji] = useState('');
  const [selectedProfileBg, setSelectedProfileBg] = useState('');
  const [selectedFrame, setSelectedFrame] = useState('');
  const [selectedWallpaper, setSelectedWallpaper] = useState('');

  const confirmModalToggle = () => setConfirmModal(!confirmModal);
  const handleCategoryClick = (itemType: string) => setSelectedItemType(itemType);

  //구매 확인 모달 열려있을때 스크롤 방지
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


  const loadWearingItems = async () => {
    const fetchedWearingItems = await fetchWearingItems(selectedTab);

    if (fetchedWearingItems) {
      if (fetchedWearingItems.emoji) setSelectedEmoji(fetchedWearingItems.emoji.image || selectedEmoji);
      if (fetchedWearingItems.background) setSelectedProfileBg(fetchedWearingItems.background.image || selectedProfileBg);
      if (fetchedWearingItems.frame) setSelectedFrame(fetchedWearingItems.frame.image || selectedFrame);
      if (fetchedWearingItems.wallpaper) setSelectedWallpaper(fetchedWearingItems.wallpaper.image || selectedWallpaper);
    }

    setWearingItems({
      emoji: fetchedWearingItems.emoji.id ? fetchedWearingItems.emoji.id : null,
      background: fetchedWearingItems.background.id ? fetchedWearingItems.background.id : null,
      frame: fetchedWearingItems.frame.id ? fetchedWearingItems.frame.id : null,
      wallpaper: fetchedWearingItems.wallpaper.id ? fetchedWearingItems.wallpaper.id : null,
    });

    console.log(`${selectedTab}`, fetchedWearingItems)
  };




  const getPossessionItems = async () => {
    const fetchedossessionItems = await fetchPossessionItems(selectedTab, selectedItemType);
    setPossessionItems(fetchedossessionItems)
  }

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


  const getCartData = async () => {
    const fetchedCartData = await fetchCartItems(selectedTab);
    setCartData(fetchedCartData);
    updateSelectedItemImages(fetchedCartData.cartItems);
  };

  const updateSelectedItemImages = (updatedCartItems: ItemData[]) => {

    // 카트 아이템에 따라 이미지 업데이트
    updatedCartItems.forEach(item => {
      switch (item.itemType) {
        case 'emoji':
          setSelectedEmoji(item.image);
          break;
        case 'background':
          setSelectedProfileBg(item.image);
          break;
        case 'frame':
          setSelectedFrame(item.image);
          break;
        case 'wallpaper':
          setSelectedWallpaper(item.image);
          break;
        default:
          break;
      }
    });
  };

  useEffect(() => {
    loadWearingItems();
    getCartData();
    console.log(`${selectedTab} 장바구니:`, cartData.cartItems)
    updateSelectedItemImages(cartData.cartItems);
  }, [selectedTab]);


  useEffect(() => {
    fetchItemData();
    console.log(`${selectedTab} ${selectedItemType} 아이템:`, items)

    getPossessionItems();
    console.log(`${selectedTab} ${selectedItemType} 보유 아이템:`, possessionItems)

  }, [selectedTab, selectedItemType]);

  const addItemMutation = useMutation({
    mutationFn: async ({ itemId, animal }: { itemId: number; animal: string }) => {
      const endpoint = `/items/cart/${itemId}?animal=${animal}`;

      await api.patch(endpoint, {});
    },
    onSuccess: async () => {
      console.log('Item added successfully');
      const updatedCartData = await fetchCartItems(selectedTab);
      setCartData(updatedCartData);
      updateSelectedItemImages(updatedCartData.cartItems);

      getCartData();
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

      getCartData();
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

      getCartData();
    }
  });



  const handleItemClick = async (item: ItemData) => {
    const existingItem = cartData.cartItems.find(cartItem => cartItem.itemType === item.itemType);
    if (existingItem) {
      await removeItemMutation.mutateAsync({ itemId: existingItem.id, animal: selectedTab });
    }
    addItemMutation.mutate({ itemId: item.id, animal: selectedTab });
  };


  const handleRemoveItemClick = async (itemId: number) => {
    const fetchedWearingItems = await fetchWearingItems(selectedTab);
    const itemToRemove = cartData.cartItems.find(item => item.id === itemId);
    await removeItemMutation.mutateAsync({ itemId, animal: selectedTab });

    if (itemToRemove) {
      switch (itemToRemove.itemType) {
        case 'emoji':
          setSelectedEmoji(fetchedWearingItems.emoji.image || selectedEmoji);
          break;
        case 'background':
          setSelectedProfileBg(fetchedWearingItems.background.image || selectedProfileBg);
          break;
        case 'frame':
          setSelectedFrame(fetchedWearingItems.frame.image || selectedFrame);
          break;
        case 'wallpaper':
          setSelectedWallpaper(fetchedWearingItems.wallpaper.image || selectedWallpaper);
          break;
        default:
          break;
      }
    }
  };

  const handleResetClick = async () => {
    await removeAllItemsMutation.mutateAsync(selectedTab);
    const fetchedWearingItems = await fetchWearingItems(selectedTab);
    if (fetchedWearingItems) {
      setSelectedEmoji(fetchedWearingItems.emoji ? fetchedWearingItems.emoji.image : '');
      setSelectedProfileBg(fetchedWearingItems.background ? fetchedWearingItems.background.image : '');
      setSelectedFrame(fetchedWearingItems.frame ? fetchedWearingItems.frame.image : '');
      setSelectedWallpaper(fetchedWearingItems.wallpaper ? fetchedWearingItems.wallpaper.image : '');
    }
  };





  return (
    <>
      {confirmModal && (
        <ConfirmChange
          cartItems={cartData.cartItems}
          pointDifference={pointDifference}
          confirmModalToggle={confirmModalToggle}
          wearingItems={wearingItems}
        />
      )}
      <CustomPreview
        selectedEmoji={selectedEmoji}
        selectedProfileBg={selectedProfileBg}
        selectedFrame={selectedFrame}
        selectedWallpaper={selectedWallpaper}
        possessionCoin={animalCoins}
        confirmModalToggle={confirmModalToggle}
        handleResetClick={handleResetClick}
      />
      <Cart
        cartItems={cartData.cartItems}
        totalItemPrice={cartData.totalCoins}
        handleResetClick={handleResetClick}
        confirmModalToggle={confirmModalToggle}
      />
      <ItemSelection
        handleCategoryClick={handleCategoryClick}
        tabCategoryButtonStyle={(itemType: string) =>
          itemType === selectedItemType ? `${style.tabButton} ${style.active}` : style.tabButton
        }
        items={items}
        handleItemClick={handleItemClick}
        handleRemoveItemClick={handleRemoveItemClick}
        selectedItems={cartData.cartItems}
        isLoading={isLoading}
        possessionItems={possessionItems}
      />
    </>
  );
};