import CategoryDropdown from './CategoryDropdown'
import SortDropdown from './SortDropdown'
import style from './dropdown.module.scss'


type Props = {
    currentCategory: string,
    sort: string
    isCategoryToggle: boolean;
    setCurrentCategoryHandler: (item: string) => void;
    isSortToggle: boolean;
    setSortHandler: (item: string) => void;
}

export default function Dropdown({
    currentCategory,
    sort,
    isCategoryToggle,
    setCurrentCategoryHandler,
    isSortToggle,
    setSortHandler,
}: Props) {
    return (
        <div className={style.dropdownContainer}>
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
