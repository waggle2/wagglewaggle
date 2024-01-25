import SearchBar from "./_component/SearchBar";
import SearchResult from "./_component/SearchResult";
import style from './search.module.scss';

type Props = {
    searchParams: { q: string, f?: string, pf?: string };
}

export default function Search({ searchParams }: Props) {

    return (
        <div className={style.container}>
            <SearchBar q={searchParams.q} />
            <SearchResult q={searchParams.q} />

        </div>
    )
}

