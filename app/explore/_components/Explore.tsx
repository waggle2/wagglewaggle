'use client'
import { useState } from 'react';
import style from '@/app/explore/_styles/explore.module.scss';
import RecordSwitch from './RecordSwitch';
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
    const [searchResults, setSearchResults] = useState<string[]>(['검색기록1', '검색기록2', '검색기록3', '검색기록4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', 'LAST']);
    const [showSearchRecords, setShowSearchRecords] = useState<boolean>(true); // New state for managing visibility

    const handleDeleteSearchRecord = (index: number) => {
        const newSearchResults = searchResults.filter((_, i) => i !== index);
        setSearchResults(newSearchResults);
    };

    const handleRecordSwitchChange = (checked: boolean) => {
        setShowSearchRecords(checked);
    };

    const handleClearSearchRecord = () => {
        setSearchResults([]);
    }

    return (
        <div className={style.container}>
            <div className={style.searchFnc}>
                <SearchBar />
                <div className={style.recordHeader}>
                    <h4 >최근 검색 기록</h4>
                    <button onClick={handleClearSearchRecord}>지우기</button>
                    {/* <div className={style.recordSwitch}><span>검색 기록</span> {showSearchRecords ? "숨기기" : "보기"}<RecordSwitch onChange={handleRecordSwitchChange} checked={showSearchRecords} /></div> */}
                </div>



            </div>

            {showSearchRecords && (
                <div className={style.searchRecordContainer}>
                    {searchResults.length > 0 ? (
                        <ul className={style.searchRecords}>
                            {searchResults.map((record, index) => (
                                <li key={index} className={style.record}>
                                    <span>{record}</span>
                                    <DeleteButton index={index} onDelete={handleDeleteSearchRecord} />
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <span className={style.noRecord}>최근 검색기록이 없습니다</span>
                    )}

                </div>
            )}
        </div>
    );
}

