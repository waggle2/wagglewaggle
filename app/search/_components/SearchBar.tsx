'use client'
import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Back from '@/app/_components/common/header/_components/Back';
import style from '../_styles/searchBar.module.scss';
import { fetchSearchPost } from '../_api/useSearch';
import SearchHistories from '@/app/explore/_components/SearchHistories';

type Props = {
    isSearch: boolean
}

export default function SearchBar({ isSearch }: Props) {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [isLogin, setIsLogin] = useState<boolean>(false);
    const [isFocused, setIsFocused] = useState<boolean | null>(false);
    const searchParams = useSearchParams();
    const keyword = searchParams.get('keyword');
    const router = useRouter();

    useEffect(() => {
        // 로컬 스토리지에서 로그인 상태 확인
        setIsLogin(localStorage.getItem('isLogin') === 'true');
    }, []);

    useEffect(() => {
        if (keyword) {
            setSearchTerm(keyword);
        }
    }, [keyword]);


    const handleSearchInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const handleSearch = async () => {
        if (!searchTerm.trim()) {
            alert('검색어를 입력하세요');
            return;
        } else if (searchTerm.length === 1) {
            alert('검색어를 2글자 이상 입력하세요');
            return;
        }

        await fetchSearchPost({ text: searchTerm });
        router.push(`/search?keyword=${searchTerm}`);


        if (!isLogin) {
            // 비로그인 상태일 때: 로컬 스토리지에 검색 기록 저장
            const histories = JSON.parse(localStorage.getItem('searchHistories') || '[]');
            const updatedHistories = [searchTerm, ...histories.filter((term: string) => term !== searchTerm)];
            localStorage.setItem('searchHistories', JSON.stringify(updatedHistories));
        }
        setIsFocused(false)

    };

    return (
        <>
            <div className={style.searchBar}>
                <Back />
                <input
                    className={style.searchInput}
                    type="text"
                    placeholder="어떤 이야기를 찾으시나요?"
                    value={searchTerm}
                    onChange={handleSearchInput}
                    onFocus={() => setIsFocused(true)}
                    onKeyDown={(event) => event.key === 'Enter' && handleSearch()}
                />
            </div>
            {isSearch && isFocused &&
                (<div className={`${isFocused ? style.historiesContainer : ''}`}>
                    <SearchHistories isSearch={isSearch} setIsFocused={setIsFocused} />
                </div>)
            }
        </>
    );
}
