import style from './styles/itemSelection.module.scss'

import { avatarItemList, wearingItem, avatarItem } from './types/responseType'
import { useState } from 'react'
import CategoryButton from './view/CategoryButton'

import cs from 'classnames/bind'
import BackgroundPrev from './BackgroundPrev'
type props = {
  animal?: string | null
  itemList: avatarItemList
  wearingItem: any
  setWearingItem: React.Dispatch<React.SetStateAction<wearingItem>>
}

export default function ItemSelection({
  animal,
  itemList = [],
  wearingItem = {
    emoji: null,
    background: null,
    frame: null,
    wallpaper: null,
  },
  setWearingItem,
}: props) {
  const cx = cs.bind(style)
  const [selectedItemType, setSelectedItemType] = useState('emoji')
  const ITEMTYPE = ['emoji', 'background', 'frame', 'wallpaper']
  const handleChangeCategory = (category: string) => {
    setSelectedItemType(category)
  }
  const handleUnsetWearing = () => {
    setWearingItem((prev) => {
      return { ...prev, [selectedItemType]: null }
    })
  }
  console.log(itemList, 'itemList')
  const handleWearingItem = (item: avatarItem) => {
    setWearingItem((prev) => {
      return { ...prev, [selectedItemType]: item }
    })
  }

  return (
    <>
      <div className={style.itemSelectionWrapper}>
        <div className={style.categoryTabContainer}>
          {ITEMTYPE.map((category) => (
            <CategoryButton
              key={category}
              selectedTab={selectedItemType}
              category={category}
              handleTabClick={() => {
                handleChangeCategory(category)
              }}
            />
          ))}
        </div>
      </div>
      <div className={style.itemWrapper}>
        <ul className={style.itemContainer}>
          <li
            className={`${selectedItemType === 'emoji' ? style.item : style.bigItem} }`}
          >
            <div
              className={cx(
                'imageWrap',
                !wearingItem[`${selectedItemType}`]?.id && 'selected',
              )}
            >
              <img
                className={style.itemUnset}
                src={'/assets/point_shop/item_unset.svg'}
                alt={'unsetIcon'}
                onClick={handleUnsetWearing}
              />
            </div>
          </li>
          {itemList
            .filter((itemList) => {
              switch (selectedItemType) {
                case 'emoji':
                  return itemList.itemType === '이모지'

                case 'background':
                  return itemList.itemType === '프로필 배경'

                case 'frame':
                  return itemList.itemType === '프레임'

                case 'wallpaper':
                  return itemList.itemType === '벽지'
              }
            })
            .map((item) => {
              return (
                <li
                  key={item.id}
                  className={`${selectedItemType === 'emoji' ? style.item : style.bigItem} }`}
                  onClick={() => {
                    handleWearingItem(item)
                  }}
                >
                  <div
                    className={cx(
                      'imageWrap',
                      wearingItem[`${selectedItemType}`] &&
                        wearingItem[`${selectedItemType}`].id === item.id &&
                        'selected',
                    )}
                  >
                    {selectedItemType === 'background' ? (
                      <BackgroundPrev animal={animal} src={item.image} />
                    ) : (
                      <img
                        className={style.itemImage}
                        src={item.image}
                        alt={item.name}
                      />
                    )}
                  </div>
                </li>
              )
            })}
        </ul>
      </div>
    </>
  )
}
