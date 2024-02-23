'use client'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Back from '@/app/_components/common/header/_components/Back';
import style from '../_styles/searchBar.module.scss';
import { fetchSearchPost } from '../_api/useSearch';

type Props = { q?: string };

export default function SearchBar({ q }: Props) {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [isLogin, setIsLogin] = useState<boolean>(false);
    const router = useRouter();

    useEffect(() => {
        // 로컬 스토리지에서 로그인 상태 확인
        setIsLogin(localStorage.getItem('isLogin') === 'true');
    }, []);

    useEffect(() => {
        if (q) {
            setSearchTerm(q);
        }
    }, [q]);

    const handleSearchInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const handleSearch = async () => {
        if (!searchTerm.trim()) {
            alert('검색어를 입력하세요');
            return;
        }

        await fetchSearchPost({ text: searchTerm });
        router.push(`/search?q=${searchTerm}`);

        if (!isLogin) {
            // 비로그인 상태일 때: 로컬 스토리지에 검색 기록 저장
            const histories = JSON.parse(localStorage.getItem('searchHistories') || '[]');
            const updatedHistories = [searchTerm, ...histories.filter((term: string) => term !== searchTerm)];
            localStorage.setItem('searchHistories', JSON.stringify(updatedHistories));
        }
    };

    return (
        <div className={style.exploreBar}>
            <Back />
            <input
                className={style.searchInput}
                type="text"
                placeholder="어떤 이야기를 찾으시나요?"
                value={searchTerm}
                onChange={handleSearchInput}
                onKeyDown={(event) => event.key === 'Enter' && handleSearch()}
            />
        </div>
    );
}
