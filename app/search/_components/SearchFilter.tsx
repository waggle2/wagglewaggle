// 'use client'
import style from '../_styles/searchFilter.module.scss'
import FilterIcon from '@/public/assets/searchFilter.svg'

type Props = {
    onClickModalToggle: () => void,
    filterLabels: {
        category: string,
        talkAbout: string,
        animalType: string
    }
}


export default function SearchFilter({ onClickModalToggle, filterLabels }: Props) {


    return (
        <div className={style.filterNav}>
            <div className={style.selected}>
                <span className={!filterLabels.category && !filterLabels.talkAbout && !filterLabels.animalType ? style.active : ''}>전체</span>
                <span className={filterLabels.category ? style.active : ''}>{filterLabels.category ? filterLabels.category : '카테고리'}</span>
                <span className={filterLabels.talkAbout ? style.active : ''}>{filterLabels.talkAbout ? filterLabels.talkAbout : '답변유형'}</span>
                <span className={filterLabels.animalType ? style.active : ''}>{filterLabels.animalType ? filterLabels.animalType : '글쓴이 타입'}</span>
            </div>
            <button onClick={onClickModalToggle}><FilterIcon /></button>
        </div>
    )
}

