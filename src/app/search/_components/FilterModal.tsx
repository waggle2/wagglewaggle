'use client'
import { useState } from 'react'
import style from '../_styles/filterModal.module.scss'
import Refresh from '@/public/assets/ico_refresh.svg'
import { useSearchParams, useRouter } from 'next/navigation'
import { fetchSearchPost } from '../_api/useSearch'


type Props = {
    onClickModalToggle: () => void,
    categories: {
        category: string[],
        tag: string[],
        animal: string[],
    },
    onApplyFilter: (category: string, tag: string, animal: string) => void
}

export default function FilterModal({ onClickModalToggle, categories, onApplyFilter }: Props) {
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedTag, setSelectedTag] = useState('');
    const [selectedAnimal, setSelectedAnimal] = useState('');

    const selectCategory = (category: string) => setSelectedCategory(category);
    const selectTag = (tag: string) => setSelectedTag(tag);
    const selectAnimal = (animal: string) => setSelectedAnimal(animal);

    const router = useRouter();
    const searchParams = useSearchParams()
    const keyword = searchParams.get('keyword');

    const resetFilters = () => {
        setSelectedCategory('');
        setSelectedTag('');
        setSelectedAnimal('');
    }

    const applyFilters = async () => {
        try {
            // fetchSearchPost 함수를 호출하여 검색 결과를 가져옵니다.
            const response = await fetchSearchPost({
                category: selectedCategory,
                tag: selectedTag,
                text: keyword, // 주의: keyword가 URL 쿼리 파라미터에서 올바르게 추출되었는지 확인해야 합니다.
                animal: selectedAnimal,
            });

            // 검색 결과 처리
            console.log(response); // 콘솔에 결과를 로깅하거나, 상태로 저장하여 UI에 표시
            onApplyFilter(selectedCategory, selectedTag, selectedAnimal); // 필요한 경우, 검색 결과를 상위 컴포넌트에 전달
        } catch (error) {
            console.error('검색 중 에러 발생:', error);
        }

        onClickModalToggle(); // 모달 창을 닫습니다.
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
                        {categories.tag.map((item, itemIdx) => (
                            <button
                                key={itemIdx}
                                className={selectedTag === item ? style.selected : ''}
                                onClick={() => selectTag(item)}
                            >
                                {item}
                            </button>
                        ))}
                    </div>
                </div>
                <div className={style.selectorWrap}>
                    <h5>이런 친구들과 이야기를 나누고 싶어요</h5>
                    <div className={style.buttonWrap}>
                        {categories.animal.map((item, itemIdx) => (
                            <button
                                key={itemIdx}
                                className={selectedAnimal === item ? style.selected : ''}
                                onClick={() => selectAnimal(item)}
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
