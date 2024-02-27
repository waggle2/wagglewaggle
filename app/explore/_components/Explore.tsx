'use client'
import { useEffect, useState } from 'react';
import style from '@/app/explore/_styles/explore.module.scss';
import RecordSwitch from './RecordSwitch';
import SearchBar from '@/app/search/_components/SearchBar';
import { fetchSearchHistories, deleteSingleHistory, deleteAllHistories } from '@/app/search/_api/useSearch';
import { useRouter } from 'next/navigation';

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
    const router = useRouter();

    const [page, setPage] = useState<number>(1);
    const [loading, setLoading] = useState<boolean>(false);
    const [noMoreData, setNoMoreData] = useState<boolean>(false); // 추가할 데이터가 더 이상 없을 때 true로 설정

    const [localSearchHistoriesPage, setLocalSearchHistoriesPage] = useState(1);
    const [maxLocalHistoryPage, setMaxLocalHistoryPage] = useState(1);


    const fetchHistories = async () => {
        setLoading(true);
        try {
            const { data } = await fetchSearchHistories(1, 10);
            setSearchHistories(data);
            setLoading(false);
        } catch (error) {
            console.error('Failed to fetch search histories:', error);
            setLoading(false);
        }
    };

    console.log('localSearchHistoriesPage', localSearchHistoriesPage)
    console.log('maxLocalHistoryPage', maxLocalHistoryPage)

    const fetchLocalHistories = () => {
        const localHistories = JSON.parse(localStorage.getItem('searchHistories') || '[]');
        const pageSize = 10; // 한 페이지당 표시할 항목 수
        // 페이지 번호가 1부터 시작하므로, 실제 인덱스 계산을 위해 1을 빼줍니다.
        const startIndex = pageSize * (localSearchHistoriesPage - 1); // 현재 페이지의 시작 인덱스
        const endIndex = startIndex + pageSize; // 현재 페이지의 끝 인덱스
        setMaxLocalHistoryPage(Math.ceil(localHistories.length / pageSize));

        // 새 페이지 데이터를 기존 데이터에 추가
        const newPageHistories = localHistories.slice(startIndex, endIndex);
        setLocalSearchHistories(prevHistories => [...prevHistories, ...newPageHistories]);
    };

    useEffect(() => {
        fetchLocalHistories();
    }, [localSearchHistoriesPage]);



    const fetchMoreHistories = async () => {
        if (loading || noMoreData) return; // 로딩 중이거나 더 이상 불러올 데이터가 없으면 함수를 종료
        setLoading(true);
        try {
            const { data } = await fetchSearchHistories(page + 1, 10);
            if (data.length > 0) {
                setSearchHistories(prev => [...prev, ...data]);
                setPage(prev => prev + 1);
            } else {
                setNoMoreData(true); // 불러온 데이터가 없으면 더 이상 불러올 데이터가 없다고 상태 업데이트
            }
        } catch (error) {
            console.error('Failed to fetch search histories:', error);
        } finally {
            setLoading(false); // 에러가 발생하든 안 하든 로딩 상태는 false로 변경
        }
    };


    const handleHistoryClick = (keyword: string) => {
        router.push(`/search?keyword=${keyword}`)
    };

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

    const handleLoadMore = () => {
        fetchMoreHistories();
    };



    const handleLoadMoreLocalHistories = () => {
        if (localSearchHistoriesPage < maxLocalHistoryPage) {
            setLocalSearchHistoriesPage(prevPage => prevPage + 1);
        }
    };

    useEffect(() => {
        setIsLogin(localStorage.getItem('isLogin') === 'true');

        if (isLogin) {
            fetchHistories();
        } else {
            fetchLocalHistories();
        }

    }, [isLogin, localSearchHistoriesPage]);

    useEffect(() => {
        setIsLogin(localStorage.getItem('isLogin') === 'true');

        const fetchHistories = async () => {
            if (isLogin) {
                try {
                    const { data } = await fetchSearchHistories(page, 10);
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
                    {
                        isLogin ? (
                            searchHistories.length > 0 && (
                                !noMoreData ? (
                                    !loading && (
                                        <button className={style.loadMore} onClick={handleLoadMore}>
                                            더보기
                                        </button>
                                    )
                                ) : (
                                    <div className={style.noMoreData}>더 이상 불러올 기록이 없습니다.</div>
                                )
                            )
                        ) : (
                            localSearchHistoriesPage < maxLocalHistoryPage && (
                                <button className={style.loadMore} onClick={handleLoadMoreLocalHistories}>
                                    더보기
                                </button>
                            )
                        )
                    }
                    {loading && <span className={style.loading}>Loading...</span>}


                    {(!isLogin && localSearchHistories.length === 0) || (isLogin && searchHistories.length === 0) && (
                        <span className={style.noRecord}>최근 검색기록이 없습니다</span>
                    )}

                </div>
            )}
        </div>
    );
}
