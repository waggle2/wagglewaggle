import Link from '@/node_modules/next/link'
import style from '../styles/boardFooter.module.scss'

type Props = {
  handleSearch: () => void
}
export default function BoardFooter({ handleSearch }: Props) {
  return (
    <footer className={style.container}>
      <button className={style.search} onClick={handleSearch}>
        검색하기
      </button>
      <Link className={style.write} href={''}>
        글쓰기
      </Link>
    </footer>
  )
}
