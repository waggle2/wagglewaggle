'use client'
import style from '@/app/explore/_styles/explore.module.scss';
import SearchBar from '@/app/search/_components/SearchBar';
import SearchHistories from './SearchHistories';

export default function Explore() {


    return (
        <div className={style.container}>
            <SearchBar isSearch={false} />
            <SearchHistories />
        </div>
    );
}

