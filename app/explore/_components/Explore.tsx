'use client'
import { useEffect, useState } from 'react';
import style from '@/app/explore/_styles/explore.module.scss';
import RecordSwitch from './RecordSwitch';
import SearchBar from '@/app/search/_components/SearchBar';
import { fetchSearchHistories, deleteSingleHistory, deleteAllHistories } from '@/app/search/_api/useSearch';

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

const DeleteButton: React.FC<DeleteButtonProps> = ({ index, onDelete }) => {
    return (
        <button onClick={() => onDelete(index)}>
            <img src="/assets/ico_search_close.svg" alt="" />
        </button>
    );
};

export default function Explore() {
    const [searchHistories, setSearchHistories] = useState<SearchHistory[]>([]);
    const [localSearchHistories, setLocalSearchHistories] = useState<string[]>([]);
    const [showSearchHistories, setShowSearchHistories] = useState<boolean>(true);
    const [isLogin, setIsLogin] = useState(false);

    const handleRecordSwitchChange = (checked: boolean) => {
        setShowSearchHistories(checked);
    };

    const handleDeleteSearchRecord = async (index: number, keyword?: string) => {
        if (isLogin) {
            const historyId = searchHistories[index].id;
            await deleteSingleHistory(historyId);
            setSearchHistories(prev => prev.filter((_, idx) => idx !== index));
        } else {
            const updatedHistories = localSearchHistories.filter((_, idx) => idx !== index);
            localStorage.setItem('searchHistories', JSON.stringify(updatedHistories));
            setLocalSearchHistories(updatedHistories);
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
                setLocalSearchHistories(localHistories);
            }
        };

        fetchHistories();
    }, [isLogin]);

    return (
        <div className={style.container}>
            <div className={style.searchFnc}>
                <SearchBar />
                <div className={style.recordHeader}>
                    <h4>최근 검색 기록</h4>
                    <button onClick={handleClearSearchRecord}>지우기</button>
                </div>
            </div>

            {showSearchHistories && (
                <div className={style.searchRecordContainer}>
                    {isLogin ? (
                        searchHistories.length > 0 && (
                            <ul className={style.searchRecords}>
                                {searchHistories.map((history, index) => (
                                    <li key={history.id} className={style.record}>
                                        <span>{history.keyword}</span>
                                        <DeleteButton index={index} onDelete={() => handleDeleteSearchRecord(index)} />
                                    </li>
                                ))}
                            </ul>
                        )
                    ) : (
                        localSearchHistories.length > 0 && (
                            <ul className={style.searchRecords}>
                                {localSearchHistories.map((keyword, index) => (
                                    <li key={index} className={style.record}>
                                        <span>{keyword}</span>
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
    );
}
