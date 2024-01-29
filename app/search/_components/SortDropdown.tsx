'use client'
import style from '../_styles/dropdown.module.scss'

type Props = {
    sort: string,
    setSortHandler: (item: string) => void, // 문자열을 받아야 합니다.
}

export default function SortDropdown({ sort, setSortHandler }: Props) {
    const category = ['최신순', '추천순'];

    return (
        <ul className={style.items}>
            {category.map((item, idx) => {
                const isSelected = item === sort; // 현재 항목이 선택된 정렬과 일치하는지 확인

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
                        onClick={() => setSortHandler(item)}
                    >
                        {item}
                    </li>
                );
            })}
        </ul>
    );
}