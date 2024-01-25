'use client'
import { useState } from 'react'
import style from './searchResult.module.scss'
import SearchFilter from "./SearchFilter";
import Post from '@/app/_components/postPreview/_component/Post';
import TestProfile from '@/public/assets/profile.svg'
import Dropdown from './Dropdown';

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


    return (
        <div>
            <SearchFilter
                currentCategory={currentCategory}
                sort={sort}
                isCategoryToggle={isCategoryToggle}
                onClickCategoryToggle={onClickCategoryToggle}
                isSortToggle={isSortToggle}
                onClickSortToggle={onClickSortToggle}
            />

            <div className={style.postContainer}>
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
        </div>
    )
}

