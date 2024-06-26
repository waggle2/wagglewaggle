'use client'

import { useRouter, useSearchParams } from '@/node_modules/next/navigation'
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
import SortModal from './_components/SortModal'
import Button from '../_components/button/Button'
import useIntersectionObserver from '../_hooks/useIntersectionObserver'
import EmptyPost from '../_components/emptyPost/EmptyPost'

export default function BulletinBoard() {
  const animalParams = useSearchParams().get('animal')
  const categoryParams = useSearchParams().get('category')
  const titleParams = useSearchParams().get('title')

  const [posts, setPosts] = useState<postData[]>()
  const [metaData, setMetaData] = useState<meta>()
  const [sort, setSort] = useState<'최신순' | '인기순'>('최신순')
  const [searchModal, setSearchModal] = useState(false)
  const [sortModal, setSortModal] = useState(false)
  const [emptyResult, setEmptyResult] = useState<string>('')
  const [keyword, setKeyword] = useState<string>('')
  const [animal, setAnimal] = useState<string | null>(animalParams)
  const [isLoaded, setIsLoaded] = useState(false)
  let timerId: NodeJS.Timeout | undefined
  const router = useRouter()

  const onIntersect: IntersectionObserverCallback = async (
    [entry],
    observer,
  ) => {
    if (!!timerId) {
      return
    }
    timerId = setTimeout(() => {
      timerId = undefined
    }, 500)

    if (entry.isIntersecting && !isLoaded) {
      observer.unobserve(entry.target)

      setIsLoaded(() => true)
      try {
        if (categoryParams === '인기글') {
          const { data, meta } = await api.get(
            `posts/hot-posts?page=1&pageSize=${metaData && metaData.pageSize + 10}`,
          )
          setPosts(() => data)
          setMetaData(() => meta)
          setIsLoaded(() => false)
        } else {
          const category = categoryParams ? `category=${categoryParams}&` : ''
          const selectAnimal =
            animal === '전체' || animal === null ? '' : `animal=${animal}&`
          const keywordText = keyword ? `text=${keyword}` : ''

          const { data, meta } = await api.get(
            `posts?${category}${selectAnimal}${keywordText}&page=1&pageSize=${metaData && metaData.pageSize + 10}`,
          )
          setPosts(() => data)
          setMetaData(() => meta)
          setIsLoaded(() => false)
        }
      } catch (err) {
        setIsLoaded(() => false)
      }

      observer.observe(entry.target)
    }
  }

  const { setTarget } = useIntersectionObserver({
    root: null,
    rootMargin: '0px',
    threshold: 1,
    onIntersect,
  })

  useEffect(() => {
    const category = categoryParams ? `category=${categoryParams}` : ''
    const selectAnimal =
      animal === '전체' || animal === null ? '' : `animal=${animal}`

    const fetchData = async () => {
      if (categoryParams === '인기글') {
        const { data, meta } = await api.get(
          `posts/hot-posts?page=1&pageSize=10`,
        )
        console.log(data, 'data')
        setPosts(() => data)
        setMetaData(() => meta)
      } else {
        try {
          const { data, meta } = await api.get(
            `posts?${category}${selectAnimal}&page=1&pageSize=10`,
          )
          setPosts(() => data)
          setMetaData(() => meta)
        } catch (err: any) {
          if (err.code === 403) {
            alert('성인 인증이 필요합니다.')
            // router.back()
          }
          console.error(err.code)
        }
      }
    }

    fetchData()
  }, [animal])
  console.log(metaData, 'meta')
  const handleAnimalSelect = (animal: string) => {
    setAnimal(() => animal)
  }
  const handleSearch = async (keyword: string) => {
    const category = categoryParams ? `category=${categoryParams}&` : ''
    const selectAnimal =
      animal === '전체' || animal === null ? '' : `animal=${animal}&`
    if (!keyword.trim()) {
      alert('검색어를 입력하세요')
      return
    } else if (keyword.length === 1) {
      alert('검색어를 2글자 이상 입력하세요')
      return
    }
    try {
      setKeyword(() => keyword)
      const { data, meta } = await api.get(
        `posts?${category}${selectAnimal}text=${keyword}&page=1&pageSize=10`,
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
        setMetaData(() => meta)
        setEmptyResult(() => '')
        setSearchModal(() => false)
      }
    } catch (err) {
      console.error(err)
    }
  }
  const handleSearchOnFocus = () => {
    setEmptyResult(() => '')
  }
  const handleViewSearchModal = () => {
    setSearchModal(true)
  }
  const handleCloseSearchModal = () => {
    setSearchModal(false)
  }

  const handleSortModalView = () => {
    setSortModal(true)
  }
  const handleSortModalClose = () => {
    setSortModal(false)
  }

  const handleChangeKeyword = (event: ChangeEvent<HTMLInputElement>) => {
    setKeyword(() => event.target.value)
  }
  const handleSort = (sort: string) => {
    switch (sort) {
      case '최신순':
        const recent = posts?.sort((a, b) => {
          if (a.createdAt > b.createdAt) {
            return 1
          }
          if (a.createdAt < b.createdAt) {
            return -1
          }
          return 0
        })
        console.log(recent)
        setPosts(() => recent)
        setSortModal(() => false)
        setSort(() => '최신순')
        break
      case '인기순':
        const popular = posts?.sort((a, b) => {
          if (a.views > b.views) {
            return -1
          }
          if (a.views < b.views) {
            return 1
          }
          return 0
        })
        setPosts(() => popular)
        setSortModal(() => false)
        setSort(() => '인기순')
        break
      default:
        break
    }
  }
  return (
    <>
      <Header leftSection={<Back />} title={titleParams ? titleParams : ''} />
      <section className={style.container}>
        {categoryParams && categoryParams !== '인기글' && (
          <div className={style.postInfoContainer}>
            <span className={style.postCount}>글 {metaData?.total}</span>
            <span className={style.sort} onClick={handleSortModalView}>
              {sort} <V />
            </span>
          </div>
        )}
        {animal && (
          <div className={style.animalContainer}>
            <Button
              text={'전체'}
              mainColor={animal === '전체' ? 'green' : 'none'}
              borderRadius={'30px'}
              action={() => {
                handleAnimalSelect('전체')
              }}
            />
            <Button
              text={'고냥이'}
              mainColor={animal === '고냥이' ? 'green' : 'none'}
              borderRadius={'30px'}
              action={() => {
                handleAnimalSelect('고냥이')
              }}
            />
            <Button
              text={'곰돌이'}
              mainColor={animal === '곰돌이' ? 'green' : 'none'}
              borderRadius={'30px'}
              action={() => {
                handleAnimalSelect('곰돌이')
              }}
            />
            <Button
              text={'댕댕이'}
              mainColor={animal === '댕댕이' ? 'green' : 'none'}
              borderRadius={'30px'}
              action={() => {
                handleAnimalSelect('댕댕이')
              }}
            />
            <Button
              text={'폭스'}
              mainColor={animal === '폭스' ? 'green' : 'none'}
              borderRadius={'30px'}
              action={() => {
                handleAnimalSelect('폭스')
              }}
            />
          </div>
        )}
        <div className={style.postContainer}>
          {posts?.length ? (
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
            <EmptyPost />
          )}
          {metaData?.hasNextPage && <div ref={setTarget}></div>}
        </div>
      </section>
      {searchModal && (
        <SearchBoard
          keyword={keyword}
          keywordChange={handleChangeKeyword}
          searchEvent={handleSearch}
          closeModal={handleCloseSearchModal}
          emptyResult={emptyResult}
          handleSearchOnFocus={handleSearchOnFocus}
        />
      )}
      {sortModal && (
        <SortModal
          handleSort={handleSort}
          handleCloseModal={handleSortModalClose}
        />
      )}
      <BoardFooter handleSearch={handleViewSearchModal} />
    </>
  )
}
