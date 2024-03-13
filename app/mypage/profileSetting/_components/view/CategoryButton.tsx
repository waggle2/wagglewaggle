import cs from 'classnames/bind'
import style from '../styles/itemSelection.module.scss'
type props = {
  selectedTab: string | null
  category: string
  handleTabClick: (animal: string) => void
}

export default function CategoryButton({
  selectedTab,
  category,
  handleTabClick,
}: props) {
  const cx = cs.bind(style)
  return (
    <button
      className={cx('tabButton', selectedTab === category && 'active')}
      onClick={() => handleTabClick(category)}
    >
      {category}
    </button>
  )
}
