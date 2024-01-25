// 'use client'
import style from './searchFilter.module.scss'
import DropdownToggle from '/public/assets/dropdownToggle.svg'

type Props = {
    currentCategory: string,
    sort: string,
    isCategoryToggle: boolean,
    onClickCategoryToggle: () => void,
    isSortToggle: boolean,
    onClickSortToggle: () => void,

}

export default function SearchFilter({ currentCategory, sort, isCategoryToggle, onClickCategoryToggle, isSortToggle, onClickSortToggle }: Props) {


    return (
        <div className={style.navBar}>
            <div
                className={
                    isCategoryToggle ? `${style.category} ${style.toggled}` : style.category
                }
                onClick={onClickCategoryToggle}
            >
                <span>{currentCategory}</span>
                <DropdownToggle fill={isCategoryToggle ? '#fff' : '#6B6B6B'} />
            </div>

            <div
                className={
                    isSortToggle ? `${style.category} ${style.toggled}` : style.category
                }
                onClick={onClickSortToggle}
            >
                <span>{sort}</span>
                <DropdownToggle fill={isSortToggle ? '#fff' : '#6B6B6B'} />
            </div>
        </div>
    )
}

