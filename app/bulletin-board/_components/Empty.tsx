import SearchIcon from '@/public/assets/ico_search-outline.svg'
import style from '../styles/empty.module.scss'

export default function Empty({ keyword }: { keyword?: string }) {
  //TODO: 검색 아이콘 변경(이미지 크기가 안변함)
  return (
    <div className={style.container}>
      <div className={style.svgContainer}>
        <SearchIcon />
      </div>
      {keyword ? (
        <div className={style.empty}>
          '{keyword}'의
          <br />
          검색 결과가 없어요!
        </div>
      ) : (
        <div className={style.empty}>최근 검색어 내역이 없어요.</div>
      )}
    </div>
  )
}
