// 'use client'
import style from '../_styles/searchFilter.module.scss'
import FilterIcon from '/public/assets/searchFilter.svg'
import RemoveIcon from '/public/assets/remove.svg'

type Props = {
  isResult: any[]
  onClickModalToggle: () => void
  filterLabels: {
    category: string | null
    tag: string | null
    animal: string | null
  }
  onRemoveFilter: (filterType: 'category' | 'tag' | 'animal') => void
}

export default function SearchFilter({
  isResult,
  onClickModalToggle,
  filterLabels,
  onRemoveFilter,
}: Props) {
  const handleRemoveFilter = (filterType: 'category' | 'tag' | 'animal') => {
    // 부모 컴포넌트로부터 받은 onRemoveFilter 함수를 호출하여 해당 필터를 제거
    onRemoveFilter(filterType)
  }

  return (
    <>
      <div className={style.filterNav}>
        <span className={style.totalNum}>{isResult.length}개</span>

        <button onClick={onClickModalToggle}>
          <FilterIcon />
        </button>
      </div>

      {/* <span className={!filterLabels.category && !filterLabels.talkAbout && !filterLabels.animalType ? style.active : ''}>전체</span>
                <span className={filterLabels.category ? style.active : ''}>{filterLabels.category ? filterLabels.category : '카테고리'}</span>
                <span className={filterLabels.talkAbout ? style.active : ''}>{filterLabels.talkAbout ? filterLabels.talkAbout : '답변유형'}</span>
                <span className={filterLabels.animalType ? style.active : ''}>{filterLabels.animalType ? filterLabels.animalType : '글쓴이 타입'}</span> */}

      <div className={style.selected}>
        {filterLabels.category && (
          <span className={style.filterItem}>
            #{filterLabels.category}
            <button
              className={style.removeFilterBtn}
              onClick={() => handleRemoveFilter('category')}
            >
              <RemoveIcon />
            </button>
          </span>
        )}
        {filterLabels.tag && (
          <span className={style.filterItem}>
            #{filterLabels.tag}
            <button
              className={style.removeFilterBtn}
              onClick={() => handleRemoveFilter('tag')}
            >
              <RemoveIcon />
            </button>
          </span>
        )}
        {filterLabels.animal && (
          <span className={style.filterItem}>
            #{filterLabels.animal}
            <button
              className={style.removeFilterBtn}
              onClick={() => handleRemoveFilter('animal')}
            >
              <RemoveIcon />
            </button>
          </span>
        )}
      </div>
    </>
  )
}
