import style from './styles/itemSelection.module.scss'

import { avatarItemList, wearingItem, avatarItem } from './types/responseType'
import { useState } from 'react'
import CategoryButton from './view/CategoryButton'

import cs from 'classnames/bind'
type props = {
  itemList: avatarItemList
  wearingItem: wearingItem
  setWearingItem: React.Dispatch<React.SetStateAction<wearingItem>>
}

export default function ItemSelection({
  itemList = [],
  wearingItem = {
    이모지: null,
    '프로필 배경': null,
    프레임: null,
    벽지: null,
  },
  setWearingItem,
}: props) {
  const cx = cs.bind(style)
  const [selectedItemType, setSelectedItemType] = useState('이모지')
  const ITEMTYPE = ['이모지', '프로필 배경', '프레임', '벽지']
  const handleChangeCategory = (category: string) => {
    setSelectedItemType(category)
  }
  const handleUnsetWearing = () => {
    setWearingItem((prev) => {
      return { ...prev, [selectedItemType]: null }
    })
  }

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
            className={`${selectedItemType === '이모지' ? style.item : style.bigItem} }`}
          >
            <div
              className={cx(
                'imageWrap',
                !wearingItem[`${selectedItemType}`]?.id && 'selected',
              )}
            >
              <img
                className={style.itemImage}
                src={'/assets/point_shop/item_unset.svg'}
                alt={'unsetIcon'}
                onClick={handleUnsetWearing}
              />
            </div>
          </li>
          {itemList
            .filter((itemList) => itemList.itemType === selectedItemType)
            .map((item) => {
              return (
                <li
                  key={item.id}
                  className={`${selectedItemType === '이모지' ? style.item : style.bigItem} }`}
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
                    <img
                      className={style.itemImage}
                      src={item.image}
                      alt={item.name}
                    />
                  </div>
                </li>
              )
            })}
        </ul>
      </div>
    </>
  )
}
