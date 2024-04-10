import SearchIcon from '@/public/assets/ico_search-outline.svg'
import Image from 'next/image'
import style from '../styles/empty.module.scss'

export default function Empty({ keyword }: { keyword?: string }) {
  //TODO: 검색 아이콘 변경(이미지 크기가 안변함)
  return (
    <div className={style.container}>
      <div className={style.svgContainer}>
        {/* <SearchIcon /> */}
        <Image
          src="/assets/ico_search-outline.svg"
          alt="search icon"
          width={30}
          height={30}
        />
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
