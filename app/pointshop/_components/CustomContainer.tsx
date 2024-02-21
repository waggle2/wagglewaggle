'use client'
import style from '../_styles/pointShop.module.scss'
import { useEffect, useState } from 'react'
import ConfirmChange from './ConfirmChange'
import CustomPreview from './CustomPreview'
import Cart from './Cart'
import ItemSelection from './ItemSelection'
import axios from 'axios'
import api from '@/app/_api/commonApi'

type Props = {
  selectedTab: string
}

type Item = {
  id: number
  src: string
  price: number
  category: 'emoji' | 'profileBg' | 'frame' | 'wallpaper'
}

type CategoryPriority = {
  [key in Item['category']]: number
}

const categoryPriority: CategoryPriority = {
  emoji: 1,
  profileBg: 2,
  frame: 3,
  wallpaper: 4,
}

export default function CustomResult({ selectedTab }: Props) {
  const [item, setItem] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get('/items')
        setItem(res.data)
      } catch (err) {
        console.log(err)
      }
    }

    fetchData()
  }, [])
  console.log(item)

  // 확인 모달의 보임 상태
  const [confirmModal, setConfirmModal] = useState(false)

  // 현재 선택된 아이템 카테고리 탭 상태
  const [itemCategoryTab, setItemCategoryTab] = useState('emoji')

  // 장바구니 아이템 금액
  const [totalItemPrice, setTotalItemPrice] = useState(0)

  // 보유 포인트
  const [possessionCoin, setPossessionCoin] = useState(90)

  // 구매시 포인트 잔액
  const pointDifference = possessionCoin - totalItemPrice

  // 프로필 미리보기부분 기본 상태는 유저 프로필데이터의 이미지경로가 될듯??
  const [selectedEmoji, setSelectedEmoji] = useState(
    '/assets/point_shop/emoji/cat_smile.svg',
  )
  const [selectedProfileBg, setSelectedProfileBg] = useState(
    '/assets/point_shop/profile_background/프로필배경1.svg',
  )
  const [selectedFrame, setSelectedFrame] = useState(
    '/assets/point_shop/frame/프레임샘플.png',
  )
  const [selectedWallpaper, setSelectedWallpaper] = useState(
    '/assets/point_shop/wallpaper/벽지샘플.png',
  )

  //선태한 아이템
  const [selectedItems, setSelectedItems] = useState<Item[]>([])

  //Test 상품들
  const products: Item[] = [
    {
      id: 0,
      src: `/assets/point_shop/emoji/${selectedTab}_smile.svg`,
      price: 10,
      category: 'emoji',
    },
    {
      id: 1,
      src: `/assets/point_shop/emoji/${selectedTab}_empathy.svg`,
      price: 20,
      category: 'emoji',
    },
    {
      id: 2,
      src: `/assets/point_shop/emoji/${selectedTab}_angry.svg`,
      price: 40,
      category: 'emoji',
    },
    {
      id: 3,
      src: `/assets/point_shop/emoji/${selectedTab}_panic.svg`,
      price: 50,
      category: 'emoji',
    },
    {
      id: 4,
      src: `/assets/point_shop/emoji/${selectedTab}_disagree.svg`,
      price: 60,
      category: 'emoji',
    },
    {
      id: 5,
      src: `/assets/point_shop/emoji/${selectedTab}_sad.svg`,
      price: 70,
      category: 'emoji',
    },
    {
      id: 6,
      src: `/assets/point_shop/emoji/${selectedTab}_insidious.svg`,
      price: 10,
      category: 'emoji',
    },
    {
      id: 7,
      src: `/assets/point_shop/emoji/${selectedTab}_serious.svg`,
      price: 80,
      category: 'emoji',
    },
    {
      id: 9,
      src: '/assets/point_shop/profile_background/프로필배경1.svg',
      price: 15,
      category: 'profileBg',
    },
    {
      id: 10,
      src: '/assets/point_shop/profile_background/프로필배경2.svg',
      price: 25,
      category: 'profileBg',
    },
    {
      id: 11,
      src: '/assets/point_shop/profile_background/프로필배경3.svg',
      price: 15,
      category: 'profileBg',
    },
    {
      id: 12,
      src: '/assets/point_shop/profile_background/프로필배경4.svg',
      price: 25,
      category: 'profileBg',
    },
    {
      id: 13,
      src: '/assets/point_shop/frame/프레임샘플.png',
      price: 30,
      category: 'frame',
    },
    {
      id: 14,
      src: '/assets/point_shop/frame/프레임샘플2.png',
      price: 40,
      category: 'frame',
    },
    {
      id: 15,
      src: '/assets/point_shop/frame/프레임샘플3.png',
      price: 30,
      category: 'frame',
    },
    {
      id: 16,
      src: '/assets/point_shop/frame/프레임샘플4.png',
      price: 40,
      category: 'frame',
    },

    {
      id: 17,
      src: '/assets/point_shop/wallpaper/벽지샘플.png',
      price: 35,
      category: 'wallpaper',
    },
    {
      id: 18,
      src: '/assets/point_shop/wallpaper/벽지샘플2.png',
      price: 45,
      category: 'wallpaper',
    },
    {
      id: 19,
      src: '/assets/point_shop/wallpaper/벽지샘플3.png',
      price: 35,
      category: 'wallpaper',
    },
    {
      id: 20,
      src: '/assets/point_shop/wallpaper/벽지샘플4.png',
      price: 45,
      category: 'wallpaper',
    },
  ]

  // 구매확인 모달 상태 토글
  const handleConfirmModalClick = () => {
    setConfirmModal(!confirmModal)
  }

  //아이템 카테고리 선택 업데이트
  const handleCategoryClick = (category: string) => {
    setItemCategoryTab(category)
  }

  // 선택된 아이템 카테고리에 따라 탭 버튼의 스타일 지정
  const tabCategoryButtonStyle = (category: string) => {
    return itemCategoryTab === category
      ? `${style.tabButton} ${style.active}`
      : style.tabButton
  }

  useEffect(() => {
    // .container 클래스를 가진 모든 요소 선택
    const containers = document.getElementsByClassName(style.container)

    // Element 타입을 HTMLElement로 형 변환
    const containerElements = Array.from(containers) as HTMLElement[]

    if (confirmModal) {
      // 스크롤 방지 적용
      containerElements.forEach((container) => {
        container.style.overflow = 'hidden'
      })
    } else {
      // 스크롤 허용
      containerElements.forEach((container) => {
        container.style.overflow = 'unset'
      })
    }

    // 컴포넌트가 언마운트 될 때 스크롤을 다시 활성화
    return () => {
      containerElements.forEach((container) => {
        container.style.overflow = 'unset'
      })
    }
  }, [confirmModal])

  // 아이템 선택 로직
  const handleItemClick = (item: Item) => {
    const existingItemIndex = selectedItems.findIndex(
      (selectedItem) => selectedItem.category === item.category,
    )

    let newSelectedItems =
      existingItemIndex >= 0
        ? selectedItems.map((selectedItem, index) =>
            index === existingItemIndex ? item : selectedItem,
          )
        : [...selectedItems, item]

    newSelectedItems.sort(
      (a, b) => categoryPriority[a.category] - categoryPriority[b.category],
    )

    // 카테고리별로 해당 이미지 경로 업데이트
    switch (item.category) {
      case 'emoji':
        setSelectedEmoji(item.src)
        break
      case 'profileBg':
        setSelectedProfileBg(item.src)
        break
      case 'frame':
        setSelectedFrame(item.src)
        break
      case 'wallpaper':
        setSelectedWallpaper(item.src)
        break
      default:
        // 기본 경우 처리
        break
    }

    setSelectedItems(newSelectedItems)
  }

  const handleRefreshClick = () => {
    // 장바구니 비우기
    setSelectedItems([])

    // 각 상태를 초기 상태로 설정
    setSelectedEmoji('/assets/point_shop/emoji/cat_smile.svg')
    setSelectedProfileBg(
      '/assets/point_shop/profile_background/프로필배경1.svg',
    )
    setSelectedFrame('/assets/point_shop/frame/프레임샘플.png')
    setSelectedWallpaper('/assets/point_shop/wallpaper/벽지샘플.png')
  }

  // 총 금액 계산
  useEffect(() => {
    const totalPrice = selectedItems.reduce((sum, item) => sum + item.price, 0)
    setTotalItemPrice(totalPrice)
  }, [selectedItems])

  return (
    <>
      {confirmModal && (
        <ConfirmChange
          pointDifference={pointDifference}
          selectedItemsLength={selectedItems.length}
          onConfirmClick={handleConfirmModalClick}
        />
      )}

      {/* 선택된 동물 꾸미기 미리보기 */}
      <CustomPreview
        selectedTab={selectedTab}
        selectedEmoji={selectedEmoji}
        selectedProfileBg={selectedProfileBg}
        selectedFrame={selectedFrame}
        selectedWallpaper={selectedWallpaper}
        possessionCoin={possessionCoin}
        handleConfirmModalClick={handleConfirmModalClick}
        handleRefreshClick={handleRefreshClick}
      />

      {/* 장바구니 */}
      <Cart selectedItems={selectedItems} totalItemPrice={totalItemPrice} />

      {/* 아이템 선택 */}
      <ItemSelection
        itemCategoryTab={itemCategoryTab}
        handleCategoryClick={handleCategoryClick}
        tabCategoryButtonStyle={tabCategoryButtonStyle}
        products={products}
        handleItemClick={handleItemClick}
        selectedItems={selectedItems}
      />
    </>
  )
}
