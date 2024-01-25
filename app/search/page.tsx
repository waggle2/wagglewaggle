import SearchBar from "./_component/SearchBar";
import style from './search.module.scss';

type Props = {
    searchParams: { q: string, f?: string, pf?: string };
}

export default function Search({ searchParams }: Props) {

    return (
        <div className={style.container}>
            <SearchBar q={searchParams.q} />
            {searchParams.q}에대한 검색결과
        </div>
    )
}

