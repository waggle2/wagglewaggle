'use client'
import { useState, useEffect } from 'react'
import style from '../_styles/search.module.scss'
import SearchFilter from "./SearchFilter";
import Post from '@/app/_components/postPreview/_components/Post';
import TestProfile from '@/public/assets/profile.svg'
import Dropdown from './Dropdown';
import SearchIcon from '@/public/assets/ico_search-outline.svg'

type Props = { q?: string }

export default function SearchResult({ q }: Props) {
    const [isCategoryToggle, setIsCategoryToggle] = useState(false);
    const [isSortToggle, setIsSortToggle] = useState(false);

    const [currentCategory, setCurrentCategory] = useState('전체');
    const [sort, setSort] = useState('최신순')

    //카테고리 모달
    const onClickCategoryToggle = () => {
        setIsCategoryToggle(!isCategoryToggle);
        setIsSortToggle(false);
    }

    //카테고리 선택
    const setCurrentCategoryHandler = (item: string) => {
        setCurrentCategory(item);
        setIsCategoryToggle(!isCategoryToggle);
    }

    //정렬 모달
    const onClickSortToggle = () => {
        setIsSortToggle(!isSortToggle);
        setIsCategoryToggle(false)
    }

    //정렬 선택
    const setSortHandler = (item: string) => {
        setSort(item);
        setIsSortToggle(!isSortToggle);
    }


    // useEffect(() => {
    //     const containers = document.getElementsByClassName(style.searchContainer);

    //     // Element 타입을 HTMLElement로 형 변환
    //     const containerElements = Array.from(containers) as HTMLElement[];

    //     if (isCategoryToggle || isSortToggle) {
    //         // 스크롤 방지 적용
    //         containerElements.forEach((container) => {
    //             container.style.overflow = 'hidden';
    //         });
    //     } else {
    //         // 스크롤 허용
    //         containerElements.forEach((container) => {
    //             container.style.overflow = 'unset';
    //         });
    //     }

    //     // 컴포넌트가 언마운트 될 때 스크롤을 다시 활성화
    //     return () => {
    //         containerElements.forEach((container) => {
    //             container.style.overflow = 'unset';
    //         });
    //     };
    // }, [isCategoryToggle, isSortToggle]);

    //검색결과 없음 테스트용
    const [isResult, setIsResult] = useState(false);



    return (
        <div className={style.searchContainer}>
            <SearchFilter
                currentCategory={currentCategory}
                sort={sort}
                isCategoryToggle={isCategoryToggle}
                onClickCategoryToggle={onClickCategoryToggle}
                isSortToggle={isSortToggle}
                onClickSortToggle={onClickSortToggle}
            />
            {(isCategoryToggle || isSortToggle) && (
                <Dropdown
                    currentCategory={currentCategory}
                    sort={sort}
                    isCategoryToggle={isCategoryToggle}
                    setCurrentCategoryHandler={setCurrentCategoryHandler}
                    isSortToggle={isSortToggle}
                    setSortHandler={setSortHandler}
                />
            )}

            {isResult ? (
                <div className={style.postContainer}>
                    <Post
                        profile={{
                            image: <TestProfile />,
                            name: '익명의 누군가',
                            category: '수다수다',
                            tag: '19',
                        }}
                        post={{
                            title: '14살 연하랑 썸타본사람? 나 좀 공감해줘',
                            content: `아 길거리에서 번호 땄는데 14살 연하야 ㅋ
              서로 연락 자주해서 썸타고 있는거 같긴 한데,, 이게 맞는걸까?`,
                            likes: 24,
                            comments: 24,
                            views: 24,
                            time: '1분전',
                        }}
                    />
                    <Post
                        profile={{
                            image: <TestProfile />,
                            name: '익명의 누군가',
                            category: '수다수다',
                            tag: '19',
                        }}
                        post={{
                            title: '14살 연하랑 썸타본사람? 나 좀 공감해줘',
                            content: `아 길거리에서 번호 땄는데 14살 연하야 ㅋ
              서로 연락 자주해서 썸타고 있는거 같긴 한데,, 이게 맞는걸까?`,
                            likes: 24,
                            comments: 24,
                            views: 24,
                            time: '1분전',
                        }}
                    />
                    <Post
                        profile={{
                            image: <TestProfile />,
                            name: '익명의 누군가',
                            category: '수다수다',
                            tag: '19',
                        }}
                        post={{
                            title: '14살 연하랑 썸타본사람? 나 좀 공감해줘',
                            content: `아 길거리에서 번호 땄는데 14살 연하야 ㅋ
              서로 연락 자주해서 썸타고 있는거 같긴 한데,, 이게 맞는걸까?`,
                            likes: 24,
                            comments: 24,
                            views: 24,
                            time: '1분전',
                        }}
                    />
                    <Post
                        profile={{
                            image: <TestProfile />,
                            name: '익명의 누군가',
                            category: '수다수다',
                            tag: '19',
                        }}
                        post={{
                            title: '14살 연하랑 썸타본사람? 나 좀 공감해줘',
                            content: `아 길거리에서 번호 땄는데 14살 연하야 ㅋ
              서로 연락 자주해서 썸타고 있는거 같긴 한데,, 이게 맞는걸까?`,
                            likes: 24,
                            comments: 24,
                            views: 24,
                            time: '1분전',
                        }}
                    />
                    <Post
                        profile={{
                            image: <TestProfile />,
                            name: '익명의 누군가',
                            category: '수다수다',
                            tag: '19',
                        }}
                        post={{
                            title: '14살 연하랑 썸타본사람? 나 좀 공감해줘',
                            content: `아 길거리에서 번호 땄는데 14살 연하야 ㅋ
              서로 연락 자주해서 썸타고 있는거 같긴 한데,, 이게 맞는걸까?`,
                            likes: 24,
                            comments: 24,
                            views: 24,
                            time: '1분전',
                        }}
                    />
                </div>
            ) : (
                <div className={style.noResultContainer}>
                    <div className={style.noResultIcon}><SearchIcon /></div>
                    <p>
                        ′{q}′<br />
                        검색결과가 없어요!
                    </p>
                </div>
            )}

        </div>
    )
}

