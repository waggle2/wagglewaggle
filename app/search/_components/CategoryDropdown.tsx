'use client'
import style from '../_styles/dropdown.module.scss'

type Props = {
    currentCategory: string,
    setCurrentCategoryHandler: (item: string) => void, // 문자열을 받아야 합니다.
}

export default function CategoryDropdown({ currentCategory, setCurrentCategoryHandler }: Props) {
    const category = ['전체', '썸', '연애', '짝사랑', '이별', '19'];

    return (
        <ul className={style.items}>
            {category.map((item, idx) => {
                const isSelected = item === currentCategory; // 현재 항목이 선택된 카테고리와 일치하는지 확인

                return (
                    <li
                        className={
                            isSelected
                                ? idx === 0
                                    ? `${style.item} ${style.firstItem} ${style.selected}`
                                    : `${style.item} ${style.selected}`
                                : idx === 0
                                    ? `${style.item} ${style.firstItem}`
                                    : `${style.item}`
                        }
                        onClick={() => setCurrentCategoryHandler(item)}
                    >
                        {item}
                    </li>
                );
            })}
        </ul>
    );
}