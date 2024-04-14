import Footer from '../_components/common/footer/Footer'
import SearchBar from './_components/SearchBar'
import SearchResult from './_components/SearchResult'
import style from '@/app/search/_styles/search.module.scss'



export default function Search() {

  return (
    <>
      <div className={style.searchContainer}>
        <SearchBar isSearch={true} />
        <SearchResult />
      </div>
      <Footer />
    </>
  )
}
