import Footer from "../_components/common/footer/page";
import SearchBar from "./_components/SearchBar";
import SearchResult from "./_components/SearchResult";
import style from '@/app/search/_styles/search.module.scss';



export default function Search() {

    return (
        <>

            <div className={style.searchContainer}>
                <SearchBar />
                <SearchResult />
            </div>
            <Footer />
        </>
    )
}

