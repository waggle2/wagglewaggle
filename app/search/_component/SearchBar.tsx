'use client'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import style from './searchBar.module.scss'
import BackButton from '@/app/_component/BackButton';

type Props = { q?: string }

export default function SearchBar({ q }: Props) {

    const [searchTerm, setSearchTerm] = useState<string>('');
    const router = useRouter();

    useEffect(() => {
        if (q) {
            setSearchTerm(q);
        }
    }, [q]);

    const handleSearchInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const handleSearch = () => {
        console.log(searchTerm);
        router.replace(`/search?q=${searchTerm}`);
    };

    return (
        <div className={style.exploreBar}>
            <BackButton />
            <input
                className={style.searchInput}
                type="text"
                placeholder="무엇을 검색하실건가요?"
                value={searchTerm}
                onChange={handleSearchInput}
                onKeyDown={(event) => event.key === 'Enter' && handleSearch()}
            />
        </div>
    )
}