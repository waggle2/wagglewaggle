'use client'
import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react'
import style from '../_styles/search.module.scss'
import Image from 'next/image';
import SearchFilter from "./SearchFilter";
import FilterModal from './FilterModal';
import Post from '@/app/_components/postPreview/_components/Post';
import { fetchSearchPost } from '../_api/useSearch';


type Props = { keyword?: string }


type Author = {
    profileItems: any[] | undefined;
    id: string;
    authenticationProvider: string;
    socialId: string | null;
    isVerified: boolean;
    state: string;
    primaryAnimal: string;
    secondAnimal: string | null;
    profileAnimal: string;
    catCoins: number;
    bearCoins: number;
    dogCoins: number;
    foxCoins: number;
    currentRefreshToken: string;
    isSubscribed: boolean;
    items: any;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
    credential: {
        id: number;
        email: string | null;
        password: string | null;
        nickname: string;
        birthYear: number;
        gender: string;
    };
};

type PostData = {
    id: number;
    title: string;
    content: string;
    isAnonymous: boolean;
    commentNum: number;
    views: number;
    imageUrls: string[];
    tag: string;
    animalOfAuthor: string;
    category: string;
    likes: any[];
    createdAt: string;
    author: Author;
};


export default function SearchResult() {
    const [searchPosts, setSearchPosts] = useState<PostData[]>([]);
    const [hasInitialSearchResults, setHasInitialSearchResults] = useState(true); // 초기 검색 결과 상태
    const [isModal, setIsModal] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [selectedTag, setSelectedTag] = useState<string | null>(null);
    const [selectedAnimal, setSelectedAnimal] = useState<string | null>(null);

    const categories = {
        category: ['짝사랑', '썸', '연애', '이별', '19'],
        tag: ['수다수다', '공감해줘', '조언해줘', '골라줘', '꿀팁공유'],
        animal: ['고냥이', '곰돌이', '댕댕이', '폭스'],
    };

    const searchParams = useSearchParams();
    const keyword = searchParams.get('keyword');
    // console.log("검색어: " + keyword)


    const onClickModalToggle = () => {
        setIsModal(!isModal);
    }

    const handleFilterChange = (category: string, talkAbout: string, animal: string) => {
        setSelectedCategory(category);
        setSelectedTag(talkAbout);
        setSelectedAnimal(animal);
        setIsModal(false);
    };

    const filterLabels = {
        category: selectedCategory,
        tag: selectedTag,
        animal: selectedAnimal,
    };


    const onRemoveFilter = (filterType: 'category' | 'tag' | 'animal') => {
        switch (filterType) {
            case 'category':
                setSelectedCategory(null);
                break;
            case 'tag':
                setSelectedTag(null);
                break;
            case 'animal':
                setSelectedAnimal(null);
                break;
            default:
                break;
        }
    };



    useEffect(() => {
        const fetchInitialSearchData = async () => {
            const initialData = await fetchSearchPost({ text: keyword });
            // console.log('초기배열', initialData.data.length)
            if (initialData.data.length == 0)
                setHasInitialSearchResults(false)
            else
                setHasInitialSearchResults(true)
        };

        // 초기 검색 실행
        fetchInitialSearchData();
    }, [keyword]);


    useEffect(() => {


        const fetchSearchPostData = async () => {
            const data = await fetchSearchPost({
                category: selectedCategory,
                tag: selectedTag,
                text: keyword,
                animal: selectedAnimal,
            });
            if (data && data.data) {
                setSearchPosts(data.data);
            } else {
                setSearchPosts([]);
            }
        }
        fetchSearchPostData();
    }, [keyword, selectedCategory, selectedTag, selectedAnimal]);


    return (
        <div className={style.searchContainer}>
            {isModal && (
                <FilterModal
                    onClickModalToggle={onClickModalToggle}
                    categories={categories}
                    onApplyFilter={handleFilterChange}
                />
            )}

            {hasInitialSearchResults ? (
                <>
                    <SearchFilter
                        isResult={searchPosts}
                        filterLabels={filterLabels}
                        onClickModalToggle={onClickModalToggle}
                        onRemoveFilter={onRemoveFilter}
                    />
                    <div className={style.postContainer}>
                        {searchPosts.map((postData) => (
                            <Post
                                key={postData.id}
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
                        ))}

                    </div>
                </>
            ) : (
                <div className={style.noResultContainer}>
                    <div className={style.noResultIcon}>
                        <Image src='/assets/searchNoResult.svg' alt='search icon' width={21.25} height={21.25} />
                    </div>
                    <p>
                        ′{keyword}′<br />
                        검색결과가 없어요!
                    </p>
                </div>
            )}



        </div>
    )
}

