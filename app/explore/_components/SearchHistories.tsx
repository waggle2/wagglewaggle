'use client'
import { useEffect, useState } from 'react';
import style from '../_styles/searchHistories.module.scss'
import { fetchSearchHistories, deleteSingleHistory, deleteAllHistories } from '@/app/search/_api/useSearch';
import { useRouter } from 'next/navigation';
// import RecordSwitch from './RecordSwitch';


type DeleteButtonProps = {
    index: number,
    onDelete: (index: number) => void,
};

type SearchHistory = {
    id: number,
    keyword: string,
    userId: string,
    createdAt: string,
};

type SearchHistoriesProps = {
    setIsFocused?: (isFocused: boolean) => void;
};

const DeleteButton: React.FC<DeleteButtonProps> = ({ index, onDelete }) => {
    return (
        <button onClick={() => onDelete(index)}>
            <img src="/assets/ico_search_close.svg" alt="" />
        </button>
    );
};

export default function SearchHistories({ setIsFocused }: SearchHistoriesProps) {
    const [searchHistories, setSearchHistories] = useState<SearchHistory[]>([]);
    const [localSearchHistories, setLocalSearchHistories] = useState<string[]>([]);
    const [showSearchHistories, setShowSearchHistories] = useState<boolean>(true);
    const [isLogin, setIsLogin] = useState(false);

    const router = useRouter();

    const handleHistoryClick = (keyword: string) => {
        router.push(`/search?keyword=${keyword}`)
        setIsFocused?.(false);
    }

    // const handleRecordSwitchChange = (checked: boolean) => {
    //     setShowSearchHistories(checked);
    // };

    const handleDeleteSearchRecord = async (index: number, keyword?: string) => {
        if (isLogin) {
            const historyId = searchHistories[index].id;
            await deleteSingleHistory(historyId);
            try {
                const { data } = await fetchSearchHistories(1, 10);
                setSearchHistories(data);
            } catch (error) {
                console.error('Failed to fetch search histories:', error);
            }
        } else {
            let updatedHistories = JSON.parse(localStorage.getItem('searchHistories') || '[]');
            updatedHistories.splice(index, 1);
            localStorage.setItem('searchHistories', JSON.stringify(updatedHistories));
            setLocalSearchHistories(updatedHistories.slice(0, 10));
        }
    };

    const handleClearSearchRecord = async () => {
        if (isLogin) {
            await deleteAllHistories();
            setSearchHistories([]);
        } else {
            localStorage.removeItem('searchHistories');
            setLocalSearchHistories([]);
        }
    };

    useEffect(() => {
        setIsLogin(localStorage.getItem('isLogin') === 'true');

        const fetchHistories = async () => {
            if (isLogin) {
                try {
                    const { data } = await fetchSearchHistories(1, 10);
                    setSearchHistories(data);
                } catch (error) {
                    console.error('Failed to fetch search histories:', error);
                }
            } else {
                const localHistories = JSON.parse(localStorage.getItem('searchHistories') || '[]');
                setLocalSearchHistories(localHistories.slice(0, 10));
            }
        };


        fetchHistories();
    }, [isLogin]);
    return (
        <div>
            <div className={style.searchFnc}>
                <div className={style.recordHeader}>
                    <h4>최근 검색 기록</h4>
                    <button onClick={handleClearSearchRecord}>지우기</button>
                    {/* <div className={style.recordSwitch}><span>검색 기록</span> {showSearchHistories ? "숨기기" : "보기"}<RecordSwitch onChange={handleRecordSwitchChange} checked={showSearchHistories} /></div> */}

                </div>
            </div>

            {showSearchHistories && (
                <div className={style.searchRecordContainer}>
                    {isLogin ? (
                        searchHistories.length > 0 && (
                            <ul className={style.searchRecords}>
                                {searchHistories.map((history, index) => (
                                    <li key={history.id} className={style.record} >
                                        <span onClick={() => handleHistoryClick(history.keyword)}>{history.keyword}</span>
                                        <DeleteButton index={index} onDelete={() => handleDeleteSearchRecord(index)} />
                                    </li>
                                ))}
                            </ul>
                        )
                    ) : (
                        localSearchHistories.length > 0 && (
                            <ul className={style.searchRecords}>
                                {localSearchHistories.map((keyword, index) => (
                                    <li key={index} className={style.record} >
                                        <span onClick={() => handleHistoryClick(keyword)}>{keyword}</span>
                                        <DeleteButton index={index} onDelete={() => handleDeleteSearchRecord(index, keyword)} />
                                    </li>
                                ))}
                            </ul>
                        )
                    )}
                    {(!isLogin && localSearchHistories.length === 0) || (isLogin && searchHistories.length === 0) && (
                        <span className={style.noRecord}>최근 검색기록이 없습니다</span>
                    )}
                </div>
            )}
        </div>
    )
}

