import { Dispatch, SetStateAction } from 'react'

import style from '../styles/sortModal.module.scss'

type Props = {
  handleSort: (sort: string) => void
  handleCloseModal: () => void
}
export default function SortModal({ handleSort, handleCloseModal }: Props) {
  return (
    <article className={style.container}>
      <div className={style.buttonWrapper}>
        <button onClick={() => handleSort('최신순')}>최신순</button>
        <button onClick={() => handleSort('인기순')}>인기순</button>
        <button onClick={handleCloseModal}>취소</button>
      </div>
    </article>
  )
}
