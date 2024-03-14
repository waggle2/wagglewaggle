import style from './styles/itemSelection.module.scss'

import { avatarItemList, wearingItem, avatarItem } from './types/responseType'
import { useState } from 'react'
import CategoryButton from './view/CategoryButton'

import UnsetIcon from '@/public/assets/point_shop/item_unset.svg'
import cs from 'classnames/bind'
type props = {
  itemList: avatarItemList
  wearingItem: wearingItem
}

export default function ItemSelection({
  itemList = [],
  wearingItem = {
    emoji: null,
    background: null,
    frame: null,
    wallpaper: null,
  },
}: props) {
  const cx = cs.bind(style)
  const [selectedItemType, setSelectedItemType] = useState('emoji')
  const ITEMTYPE = ['emoji', 'background', 'frame', 'wallpaper']
  const handleChangeCategory = (category: string) => {
    setSelectedItemType(category)
  }
  console.log(!wearingItem[`${selectedItemType}`]?.id, 'unset')
  console.log(wearingItem[`${selectedItemType}`]?.id, 'unset')

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
                className={style.itemImage}
                src={'/assets/point_shop/item_unset.svg'}
                alt={'unsetIcon'}
              />
            </div>
          </li>
          {itemList
            .filter((itemList) => itemList.itemType === selectedItemType)
            .map((item) => {
              return (
                <li
                  key={item.id}
                  className={`${selectedItemType === 'emoji' ? style.item : style.bigItem} }`}
                  onClick={() => {}}
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
