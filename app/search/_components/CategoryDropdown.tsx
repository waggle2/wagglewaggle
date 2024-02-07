'use client'
import style from '../_styles/dropdown.module.scss'

type Props = {
    currentCategory: string,
    setCurrentCategoryHandler: (item: string) => void, // 문자열을 받아야 합니다.
}

export default function CategoryDropdown({ currentCategory, setCurrentCategoryHandler }: Props) {
    const categories = {
        category: ['짝사랑', '썸', '연애', '이별', '19'],
        talkAbout: ['수다수다', '공감해줘', '조언해줘', '골라줘', '꿀팁공유'],
        animalType: ['고냥이', '곰돌이', '댕댕이', '폭스'],
    };

    return (
        // <ul className={style.items}>
        //     {category.map((item, idx) => {
        //         const isSelected = item === currentCategory; // 현재 항목이 선택된 카테고리와 일치하는지 확인

        //         return (
        //             <li
        //                 className={
        //                     isSelected
        //                         ? idx === 0
        //                             ? `${style.item} ${style.firstItem} ${style.selected}`
        //                             : `${style.item} ${style.selected}`
        //                         : idx === 0
        //                             ? `${style.item} ${style.firstItem}`
        //                             : `${style.item}`
        //                 }
        //                 onClick={() => setCurrentCategoryHandler(item)}
        //             >
        //                 {item}
        //             </li>
        //         );
        //     })}
        // </ul>
        <div className={style.filterModal}>
            <div className={style.modalHeader}>
                <h3>검색필터</h3>
                <div>새로고침아이콘</div>
            </div>
            {Object.entries(categories).map(([key, value], sectionIdx) => (
                <div key={sectionIdx} className={style.selectorWrap}>
                    <h5>{key === 'category' ? '이런 주제를 나누고 싶어요' : key === 'talkAbout' ? '이런 이야기를 나누고 싶어요' : '이런 친구들과 이야기를 나누고 싶어요'}</h5>
                    <div className={style.buttonWrap}>
                        {value.map((item) => (
                            <button key={item} onClick={() => setCurrentCategoryHandler(item)} className={item === currentCategory ? style.selected : ''}>
                                {item}
                            </button>
                        ))}
                    </div>
                </div>
            ))}
            <div className={style.modalFooter}>
                <button className={style.closeBtn}>닫기</button>
                <button className={style.applyBtn}>필터 적용</button>
            </div>
        </div>
    );
}