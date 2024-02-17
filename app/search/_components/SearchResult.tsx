'use client'
import axiosInstance from '@/app/_api/config'

import { useState, useEffect } from 'react'
import style from '../_styles/search.module.scss'

import SearchFilter from "./SearchFilter";
import FilterModal from './FilterModal';
import Post from '@/app/_components/postPreview/_components/Post';

import SearchIcon from '@/public/assets/ico_search-outline.svg'

type Props = { q?: string }

// UI에서 사용하는 동물 타입
type AnimalTypeUI = '고냥이' | '곰돌이' | '댕댕이' | '폭스';

// 서버에서 요구하는 동물 타입
type AnimalTypeServer = '고양이' | '곰' | '강아지' | '여우';

export default function SearchResult({ q }: Props) {
    console.log("검색어: " + q)

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
    const [isResult, setIsResult] = useState([]);


    // 필터링 레이블 상태
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [selectedTalkAbout, setSelectedTalkAbout] = useState<string | null>(null);
    const [selectedAnimalType, setSelectedAnimalType] = useState<string | null>(null);


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


    // animalType과 서버에서 요구하는 값의 매핑
    const animalTypeMapping: Record<AnimalTypeUI, AnimalTypeServer> = {
        고냥이: '고양이',
        곰돌이: '곰',
        댕댕이: '강아지',
        폭스: '여우',
    };

    // 선택된 animalType을 서버 요구 값으로 변환
    const getServerAnimalType = (selectedAnimalType: AnimalTypeUI) => {
        // 매핑을 사용하여 변환된 값을 반환
        return animalTypeMapping[selectedAnimalType] || selectedAnimalType;
    };


    const onRemoveFilter = (filterType: 'category' | 'talkAbout' | 'animalType') => {
        switch (filterType) {
            case 'category':
                setSelectedCategory(null);
                break;
            case 'talkAbout':
                setSelectedTalkAbout(null);
                break;
            case 'animalType':
                setSelectedAnimalType(null);
                break;
            default:
                break;
        }
    };


    useEffect(() => {
        const fetchData = async () => {
            // 선택된 animalType이 null이 아닐 경우에만 변환을 시도합니다.
            const serverAnimalType = selectedAnimalType ? getServerAnimalType(selectedAnimalType as AnimalTypeUI) : null;

            const queryParams = new URLSearchParams({
                ...(selectedTalkAbout && { tags: selectedTalkAbout }),
                ...(selectedCategory && { category: selectedCategory }),
                ...(q && { text: q }),
                // serverAnimalType이 null이 아닐 경우에만 animal 쿼리 파라미터를 추가합니다.
                ...(serverAnimalType && { animal: serverAnimalType }),
                page: '1',
                pageSize: '10',
            }).toString();

            const endpoint = `/posts?${queryParams}`;

            console.log(`요청 URL: ${endpoint}`);
            try {
                const resultResponse = await axiosInstance.get(endpoint);
                console.log(resultResponse.data);
                // 서버 응답이 배열을 포함하는 객체라면, 예: { posts: [...] }
                setIsResult(resultResponse.data.posts || []);
            } catch (error) {
                console.error('Error fetching data:', error);
                setIsResult([]); // 오류 발생 시 빈 배열을 설정
            }
        };

        // selectedAnimalType이 null일 가능성을 고려하여 타입 단언 사용
        if (selectedAnimalType !== null) {
            fetchData();
        }
        console.log('현재 선택 항목:', selectedCategory, selectedTalkAbout, selectedAnimalType);
    }, [selectedCategory, selectedTalkAbout, selectedAnimalType]);

    useEffect(() => {
        setSelectedCategory(null);
        setSelectedTalkAbout(null);
        setSelectedAnimalType(null);

    }, [q])




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
                        isResult={isResult}
                        filterLabels={filterLabels}
                        onClickModalToggle={onClickModalToggle}
                        onRemoveFilter={onRemoveFilter}
                    />
                    <div className={style.postContainer}>
                        {isResult.map((index, post) => (
                            <Post
                                key={index}
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
                        ))}

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

