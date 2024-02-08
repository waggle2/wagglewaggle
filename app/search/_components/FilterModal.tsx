'use client'
import { useState } from 'react'
import style from '../_styles/filterModal.module.scss'
import Refresh from '@/public/assets/ico_refresh.svg'

type Props = {
    onClickModalToggle: () => void,
    categories: {
        category: string[],
        talkAbout: string[],
        animalType: string[],
    },
    onApplyFilter: (category: string, talkAbout: string, animalType: string) => void
}

export default function FilterModal({ onClickModalToggle, categories, onApplyFilter }: Props) {
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedTalkAbout, setSelectedTalkAbout] = useState('');
    const [selectedAnimalType, setSelectedAnimalType] = useState('');

    const selectCategory = (category: string) => setSelectedCategory(category);
    const selectTalkAbout = (talkAbout: string) => setSelectedTalkAbout(talkAbout);
    const selectAnimalType = (animalType: string) => setSelectedAnimalType(animalType);


    const resetFilters = () => {
        setSelectedCategory('');
        setSelectedTalkAbout('');
        setSelectedAnimalType('');
    }

    const applyFilters = () => {
        onApplyFilter(selectedCategory, selectedTalkAbout, selectedAnimalType);
        onClickModalToggle();
    };


    return (
        <div className={style.modalContainer}>
            <div className={style.filterModal}>
                <div className={style.modalHeader}>
                    <h3>검색필터</h3>
                    <div className={style.iconWrap} onClick={resetFilters}><Refresh /></div>
                </div>
                <div className={style.selectorWrap}>
                    <h5>이런 주제를 나누고 싶어요</h5>
                    <div className={style.buttonWrap}>
                        {categories.category.map((item, itemIdx) => (
                            <button
                                key={itemIdx}
                                className={selectedCategory === item ? style.selected : ''}
                                onClick={() => selectCategory(item)}
                            >
                                {item}
                            </button>
                        ))}
                    </div>
                </div>
                <div className={`${style.selectorWrap} ${style.middle}`}>
                    <h5>이런 이야기를 나누고 싶어요</h5>
                    <div className={style.buttonWrap}>
                        {categories.talkAbout.map((item, itemIdx) => (
                            <button
                                key={itemIdx}
                                className={selectedTalkAbout === item ? style.selected : ''}
                                onClick={() => selectTalkAbout(item)}
                            >
                                {item}
                            </button>
                        ))}
                    </div>
                </div>
                <div className={style.selectorWrap}>
                    <h5>이런 친구들과 이야기를 나누고 싶어요</h5>
                    <div className={style.buttonWrap}>
                        {categories.animalType.map((item, itemIdx) => (
                            <button
                                key={itemIdx}
                                className={selectedAnimalType === item ? style.selected : ''}
                                onClick={() => selectAnimalType(item)}
                            >
                                {item}
                            </button>
                        ))}
                    </div>
                </div>

                {/* {categories && Object.entries(categories).map(([key, value], sectionIdx) => (
                    <div key={sectionIdx} className={style.selectorWrap}>
                        <h5>{
                            key === 'category' ? '이런 주제를 나누고 싶어요' :
                                key === 'talkAbout' ? '이런 이야기를 나누고 싶어요' :
                                    '이런 친구들과 이야기를 나누고 싶어요'
                        }</h5>
                        <div className={style.buttonWrap}>
                            {value.map((item, itemIdx) => (
                                <button key={itemIdx}>
                                    {item}
                                </button>
                            ))}
                        </div>
                    </div>
                ))} */}

                <div className={style.modalFooter}>
                    <button className={style.closeBtn}
                        onClick={onClickModalToggle}>닫기</button>
                    <button className={style.applyBtn} onClick={applyFilters}>필터 적용</button>
                </div>

            </div>
        </div>
    )
}
