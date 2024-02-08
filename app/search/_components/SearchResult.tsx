'use client'
import { useState, useEffect } from 'react'
import style from '../_styles/search.module.scss'

import SearchFilter from "./SearchFilter";
import FilterModal from './FilterModal';
import Post from '@/app/_components/postPreview/_components/Post';

import SearchIcon from '@/public/assets/ico_search-outline.svg'

type Props = { q?: string }

export default function SearchResult({ q }: Props) {
    const [isModal, setIsModal] = useState(false);
    const categories = {
        category: ['짝사랑', '썸', '연애', '이별', '19'],
        talkAbout: ['수다수다', '공감해줘', '조언해줘', '골라줘', '꿀팁공유'],
        animalType: ['고냥이', '곰돌이', '댕댕이', '폭스'],
    };


    //카테고리 모달토글
    const onClickModalToggle = () => {
        setIsModal(!isModal);
    }


    //검색결과 없음 테스트용
    const [isResult, setIsResult] = useState(true);


    // 필터링 레이블 상태
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedTalkAbout, setSelectedTalkAbout] = useState('');
    const [selectedAnimalType, setSelectedAnimalType] = useState('');

    // FilterModal에서 필터링 변경하는 부분
    const handleFilterChange = (category: string, talkAbout: string, animalType: string) => {
        setSelectedCategory(category);
        setSelectedTalkAbout(talkAbout);
        setSelectedAnimalType(animalType);
        setIsModal(false);
    };

    // SearchFilter 컴포넌트에 전달할 props
    const filterLabels = {
        category: selectedCategory,
        talkAbout: selectedTalkAbout,
        animalType: selectedAnimalType,
    };

    console.log('현재 선택 항목:' + selectedCategory, selectedTalkAbout, selectedAnimalType)

    return (
        <div className={style.searchContainer}>

            {isModal && (
                <FilterModal
                    onClickModalToggle={onClickModalToggle}
                    categories={categories}
                    onApplyFilter={handleFilterChange}
                />
            )}

            {isResult ? (
                <>
                    <SearchFilter
                        filterLabels={filterLabels}
                        onClickModalToggle={onClickModalToggle}
                    />
                    <div className={style.postContainer}>
                        <Post
                            profile={{
                                image: '',
                                name: '익명의 곰',
                                animal: '곰돌이'
                            }}
                            post={{
                                id: 0,
                                tag: '19',
                                category: '수다수다',
                                time: '2023-11-01',
                                title: '아 정말 못참겠다',
                                content:
                                    '남친이 자꾸 짜증나게 구는데 어떻게 해야 돼? 그냥 헤어질까 싶기도 한데 그러기엔 좀 아까웡 어쩌구 ...',
                                likes: 24,
                                comments: 24,
                                views: 24,
                            }}
                        />
                        <Post
                            profile={{
                                image: '',
                                name: '익명의 곰',
                                animal: '곰돌이'
                            }}
                            post={{
                                id: 0,
                                tag: '19',
                                category: '수다수다',
                                time: '2023-11-01',
                                title: '아 정말 못참겠다',
                                content:
                                    '남친이 자꾸 짜증나게 구는데 어떻게 해야 돼? 그냥 헤어질까 싶기도 한데 그러기엔 좀 아까웡 어쩌구 ...',
                                likes: 24,
                                comments: 24,
                                views: 24,
                            }}
                        />
                        <Post
                            profile={{
                                image: '',
                                name: '익명의 곰',
                                animal: '곰돌이'
                            }}
                            post={{
                                id: 0,
                                tag: '19',
                                category: '수다수다',
                                time: '2023-11-01',
                                title: '아 정말 못참겠다',
                                content:
                                    '남친이 자꾸 짜증나게 구는데 어떻게 해야 돼? 그냥 헤어질까 싶기도 한데 그러기엔 좀 아까웡 어쩌구 ...',
                                likes: 24,
                                comments: 24,
                                views: 24,
                            }}
                        />
                        <Post
                            profile={{
                                image: '',
                                name: '익명의 곰',
                                animal: '곰돌이'
                            }}
                            post={{
                                id: 0,
                                tag: '19',
                                category: '수다수다',
                                time: '2023-11-01',
                                title: '아 정말 못참겠다',
                                content:
                                    '남친이 자꾸 짜증나게 구는데 어떻게 해야 돼? 그냥 헤어질까 싶기도 한데 그러기엔 좀 아까웡 어쩌구 ...',
                                likes: 24,
                                comments: 24,
                                views: 24,
                            }}
                        />
                        <Post
                            profile={{
                                image: '',
                                name: '익명의 곰',
                                animal: '곰돌이'
                            }}
                            post={{
                                id: 0,
                                tag: '19',
                                category: '수다수다',
                                time: '2023-11-01',
                                title: '아 정말 못참겠다',
                                content:
                                    '남친이 자꾸 짜증나게 구는데 어떻게 해야 돼? 그냥 헤어질까 싶기도 한데 그러기엔 좀 아까웡 어쩌구 ...',
                                likes: 24,
                                comments: 24,
                                views: 24,
                            }}
                        />
                    </div>
                </>
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

