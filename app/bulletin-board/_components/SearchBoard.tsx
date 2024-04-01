'use client'

import style from '../styles/searchBoard.module.scss'
import BackIcon from '@/public/assets/back.svg'
import SearchIcon from '@/public/assets/ico_search-outline.svg'

import { ChangeEventHandler, useEffect, useState } from 'react'

import api from '@/app/_api/commonApi'
import Empty from './Empty'
import History from './History'

type Props = {
  keyword: string
  keywordChange: ChangeEventHandler<HTMLInputElement>
  searchEvent: (keyword: string) => void
  closeModal: () => void
  emptyResult: string
  handleSearchOnFocus: () => void
}

export default function SearchBoard({
  keyword,
  keywordChange,
  searchEvent,
  closeModal,
  emptyResult,
  handleSearchOnFocus,
}: Props) {
  console.log('view')
  //TODO: get,patch 요청 리액트 쿼리 사용
  const [histories, setHistories] = useState<
    Array<{ id: number; keyword: string }>
  >([])

  const fetchHistory = async () => {
    const { data } = await api.get('search-histories?page=1&pageSize=10')
    setHistories(data)
  }

  useEffect(() => {
    if (localStorage.getItem('isLogin')) {
      fetchHistory()
    } else {
      setHistories(JSON.parse(localStorage.getItem('searchHistories') || '[]'))
    }
  }, [])

  return (
    <section className={style.container}>
      <article className={style.headerWrapper}>
        <BackIcon onClick={closeModal} />
        <div className={style.inputWrapper}>
          <input
            className={style.searchInput}
            type="text"
            placeholder="검색어 입력"
            value={keyword}
            onChange={keywordChange}
            onFocus={handleSearchOnFocus}
            onKeyDown={(event) => event.key === 'Enter' && searchEvent(keyword)}
          />
          <SearchIcon onClick={() => searchEvent(keyword)} />
        </div>
      </article>
      <article className={style.historyContainer}>
        {!!emptyResult ? (
          <Empty keyword={emptyResult} />
        ) : histories.length ? (
          <History
            histories={histories}
            fetchHistory={fetchHistory}
            searchEvent={searchEvent}
          />
        ) : (
          <Empty />
        )}
      </article>
    </section>
  )
}
