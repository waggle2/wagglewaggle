import SearchBar from "./_components/SearchBar";
import SearchResult from "./_components/SearchResult";
import style from '@/app/search/_styles/search.module.scss';

type Props = {
    searchParams: { q: string, f?: string, pf?: string };
}

export default function Search({ searchParams }: Props) {

    return (
        <div className={style.searchContainer}>
            <SearchBar q={searchParams.q} />
            <SearchResult q={searchParams.q} />
        </div>
    )
}

