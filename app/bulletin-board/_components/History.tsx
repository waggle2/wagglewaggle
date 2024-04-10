import style from '../styles/history.module.scss'

import CloseIcon from '@/public/assets/close.svg'
import api from '@/app/_api/commonApi'

type Props = {
  histories: Array<{ id: number; keyword: string }>
  fetchHistory: () => Promise<void>
  searchEvent: (keyword: string) => void
}

export default function History({
  histories,
  fetchHistory,
  searchEvent,
}: Props) {
  const handleRemoveHistory = async (id: number) => {
    await api.delete(`/search-histories/${id}`)
    await fetchHistory()
  }
  const handleAllRemoveHistory = async () => {
    await api.delete(`/search-histories`)
    await fetchHistory()
  }
  return (
    <>
      <div className={style.container}>
        <div className={style.titleWrapper}>
          <span className={style.recent}>최근 검색어</span>
          <span className={style.delete} onClick={handleAllRemoveHistory}>
            지우기
          </span>
        </div>
        <div className={style.historyContainer}>
          {histories.map((info) => {
            return (
              <div className={style.historyWrapper} key={info.id}>
                <span onClick={() => searchEvent(info.keyword)}>
                  {info.keyword}
                </span>
                <CloseIcon onClick={() => handleRemoveHistory(info.id)} />
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}
