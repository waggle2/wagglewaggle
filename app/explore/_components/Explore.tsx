'use client'
import { useState } from 'react';
import style from '@/app/explore/_styles/explore.module.scss';
import RecordSwitch from './RecordSwitch';
import { useRouter } from 'next/navigation';
import Back from '@/app/_components/common/header/_components/Back';
import SearchBar from '@/app/search/_components/SearchBar';

type DeleteButtonProps = {
    index: number;
    onDelete: (index: number) => void;
};

const DeleteButton: React.FC<DeleteButtonProps> = ({ index, onDelete }) => {
    return (
        <button onClick={() => onDelete(index)}>
            <img src="/assets/ico_search_close.svg" alt="" />
        </button>
    );
};

export default function Explore() {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [searchResults, setSearchResults] = useState<string[]>(['검색기록1', '검색기록2', '검색기록3', '검색기록4']);
    // const tag = ['# 공감해줘', '# 격려해줘', '# 위로해줘', '# 조언해줘']


    const handleDeleteSearchRecord = (index: number) => {
        const newSearchResults = searchResults.filter((_, i) => i !== index);
        setSearchResults(newSearchResults);
    };



    return (
        <div className={style.container}>
            <SearchBar />
            {/* <div className={style.interestsContainer}>
                <span>듣고싶은 말만 모아봐요!</span>
                <div className={style.tagBox}>
                    {tag.map((item, idx) => (
                        <div className={style.tag} key={idx}>
                            {item}
                        </div>
                    ))}
                </div>
                <span>추천 게시판이에요!</span>
                <div className={style.tagBox}>
                    <div className={style.tag}>
                        <img src="/assets/lips.svg" alt="" />
                        연애 TIP</div>
                    <div className={style.tag}>
                        <img src="/assets/town.svg" alt="" />
                        나와 같은 동물 이야기</div>
                </div>
            </div> */}

            <div className={style.recordHeader}>
                <div className={style.recentRecord}>최근 검색 기록</div>
                <div className={style.recordSwitch}>검색 기록 숨기기<RecordSwitch /></div>

            </div>

            <ul className={style.searchRecords}>
                {searchResults.map((record, index) => (
                    <li key={index} className={style.record}>
                        <span>{record}</span>
                        <DeleteButton index={index} onDelete={handleDeleteSearchRecord} />
                    </li>
                ))}
            </ul>

        </div>
    )
}
