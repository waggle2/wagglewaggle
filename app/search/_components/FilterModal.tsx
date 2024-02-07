import CategoryDropdown from './CategoryDropdown'
import SortDropdown from './SortDropdown'
import style from '../_styles/dropdown.module.scss'


type Props = {
    currentCategory: string,
    sort: string
    isCategoryToggle: boolean;
    setCurrentCategoryHandler: (item: string) => void;
    isSortToggle: boolean;
    setSortHandler: (item: string) => void;
}

export default function FilterModal({
    currentCategory,
    sort,
    isCategoryToggle,
    setCurrentCategoryHandler,
    isSortToggle,
    setSortHandler,
}: Props) {
    return (
        <div className={style.modalContainer}>
            {isCategoryToggle && (
                <CategoryDropdown
                    currentCategory={currentCategory}
                    setCurrentCategoryHandler={setCurrentCategoryHandler}
                />
            )}

            {isSortToggle && (
                <SortDropdown
                    sort={sort}
                    setSortHandler={setSortHandler}
                />
            )}
        </div>
    )
}
