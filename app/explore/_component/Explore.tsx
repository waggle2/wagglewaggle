'use client'
import { useState } from 'react';
import style from '@/app/explore/_component/explore.module.scss';
import RecordSwitch from './RecordSwitch';
import { useRouter } from 'next/navigation';
import BackButton from '@/app/_component/BackButton';


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
    const [searchResults, setSearchResults] = useState<string[]>(['연애', '남사친', '썸', '이별']);
    const router = useRouter();

    const handleSearchInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const handleSearch = () => {
        console.log(searchTerm);
        router.replace(`/search?q=${searchTerm.toString()}`);
    };

    const handleDeleteSearchRecord = (index: number) => {
        const newSearchResults = searchResults.filter((_, i) => i !== index);
        setSearchResults(newSearchResults);
    };



    return (
        <div className={style.container}>
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
