// 'use client'
import style from '../_styles/searchFilter.module.scss'
import FilterIcon from '@/public/assets/searchFilter.svg'
import RemoveIcon from '@/public/assets/remove.svg'

type Props = {
    isResult: any[],
    onClickModalToggle: () => void,
    filterLabels: {
        category: string | null,
        talkAbout: string | null,
        animalType: string | null,
    },
    onRemoveFilter: (filterType: 'category' | 'talkAbout' | 'animalType') => void

}


export default function SearchFilter({ isResult, onClickModalToggle, filterLabels, onRemoveFilter }: Props) {

    const handleRemoveFilter = (filterType: 'category' | 'talkAbout' | 'animalType') => {
        // 부모 컴포넌트로부터 받은 onRemoveFilter 함수를 호출하여 해당 필터를 제거
        onRemoveFilter(filterType);
    };

    return (
        <>
            <div className={style.filterNav}>
                <span className={style.totalNum}>{isResult.length}개</span>

                <button onClick={onClickModalToggle}><FilterIcon /></button>
            </div>

            {/* <span className={!filterLabels.category && !filterLabels.talkAbout && !filterLabels.animalType ? style.active : ''}>전체</span>
                <span className={filterLabels.category ? style.active : ''}>{filterLabels.category ? filterLabels.category : '카테고리'}</span>
                <span className={filterLabels.talkAbout ? style.active : ''}>{filterLabels.talkAbout ? filterLabels.talkAbout : '답변유형'}</span>
                <span className={filterLabels.animalType ? style.active : ''}>{filterLabels.animalType ? filterLabels.animalType : '글쓴이 타입'}</span> */}

            <div className={style.selected}>
                {filterLabels.category && (
                    <span className={style.filterItem}>
                        #{filterLabels.category}
                        <button className={style.removeFilterBtn} onClick={() => handleRemoveFilter('category')}><RemoveIcon /></button>
                    </span>
                )}
                {filterLabels.talkAbout && (
                    <span className={style.filterItem}>
                        #{filterLabels.talkAbout}
                        <button className={style.removeFilterBtn} onClick={() => handleRemoveFilter('talkAbout')}><RemoveIcon /></button>
                    </span>
                )}
                {filterLabels.animalType && (
                    <span className={style.filterItem}>
                        #{filterLabels.animalType}
                        <button className={style.removeFilterBtn} onClick={() => handleRemoveFilter('animalType')}><RemoveIcon /></button>
                    </span>
                )}

            </div>
        </>
    )
}

