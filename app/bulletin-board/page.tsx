'use client'

import { useSearchParams } from '@/node_modules/next/navigation'
import { ChangeEvent, useEffect, useState } from 'react'

import style from './styles/bulletinBoard.module.scss'

import api from '../_api/commonApi'

import Header from '../_components/common/header/Header'
import Back from '../_components/common/header/_components/Back'
import Post from '../_components/postPreview/_components/Post'
import V from '@/public/assets/v.svg'

import BoardFooter from './_components/BoardFooter'
import SearchBoard from './_components/SearchBoard'
import { postData, meta } from '../_components/postPreview/_types/responseType'

export default function BulletinBoard() {
  const categoryParams = useSearchParams().get('category')
  const titleParams = useSearchParams().get('title')

  const [posts, setPosts] = useState<postData[]>()
  const [meta, setMeta] = useState<meta>()
  const [sort, setSort] = useState<string>('최신순')
  const [searchModal, setSearchModal] = useState(false)
  const [emptyResult, setEmptyResult] = useState<string>('')
  const [keyword, setKeyword] = useState<string>('')

  useEffect(() => {
    const category = categoryParams ? `?category=${categoryParams}` : ''
    const fetchData = async () => {
      const { data, meta } = await api.get(
        `posts${category}&page=1&pageSize=10`,
      )
      setPosts(() => data)
      setMeta(() => meta)
    }
    fetchData()
  }, [])
  const handleSearch = async (keyword: string) => {
    const category = categoryParams ? `?category=${categoryParams}&` : ''
    if (!keyword.trim()) {
      alert('검색어를 입력하세요')
      return
    } else if (keyword.length === 1) {
      alert('검색어를 2글자 이상 입력하세요')
      return
    }
    try {
      const { data, meta } = await api.get(
        `posts${category}text=${keyword}&page=1&pageSize=10`,
      )

      if (localStorage.getItem('isLogin')) {
        // 비로그인 상태일 때: 로컬 스토리지에 검색 기록 저장
        const histories = JSON.parse(
          localStorage.getItem('searchHistories') || '[]',
        )
        const updatedHistories = [
          keyword,
          ...histories.filter((term: string) => term !== keyword),
        ]
        localStorage.setItem(
          'searchHistories',
          JSON.stringify(updatedHistories),
        )
      }
      if (data.length === 0) {
        setEmptyResult(keyword)
      } else {
        setPosts(() => data)
        setMeta(() => meta)
        setEmptyResult(() => '')
        setSearchModal(() => false)
      }
    } catch (err) {
      console.error(err)
    }
  }
  const handleViewSearchModal = () => {
    setSearchModal(true)
  }
  const handleCloseSearchModal = () => {
    setSearchModal(false)
  }
  const handleChangeKeyword = (event: ChangeEvent<HTMLInputElement>) => {
    setKeyword(() => event.target.value)
  }
  return (
    <>
      <Header leftSection={<Back />} title={titleParams ? titleParams : ''} />
      <section className={style.container}>
        <div className={style.postInfoContainer}>
          <span className={style.postCount}>글 {meta?.total}</span>
          <span className={style.sort}>
            {sort} <V />
          </span>
        </div>
        <div className={style.postContainer}>
          {posts ? (
            posts.map((postData: postData, index: number) => {
              return (
                <Post
                  key={index}
                  profile={{
                    image: postData.author?.profileItems,
                    name: postData.author?.credential.nickname,
                    animal: postData.animalOfAuthor,
                    isAnonymous: postData.isAnonymous,
                    id: postData.author?.id,
                  }}
                  post={{
                    id: postData.id,
                    category: postData.category,
                    tag: postData.tag,
                    time: postData.createdAt,
                    title: postData.title,
                    content: postData.content,
                    likes: postData.likes,
                    comments: postData.commentNum,
                    views: postData.views,
                  }}
                />
              )
            })
          ) : (
            <div>empty</div>
          )}
        </div>
      </section>
      {searchModal && (
        <SearchBoard
          keyword={keyword}
          keywordChange={handleChangeKeyword}
          searchEvent={handleSearch}
          closeModal={handleCloseSearchModal}
          emptyResult={emptyResult}
          setEmptyResult={setEmptyResult}
        />
      )}
      <BoardFooter handleSearch={handleViewSearchModal} />
    </>
  )
}
