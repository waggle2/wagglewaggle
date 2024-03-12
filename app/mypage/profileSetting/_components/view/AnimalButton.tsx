import cs from 'classnames/bind'
import style from '../styles/pointShop.module.scss'
type props = {
  selectedTab: string | null
  animalType: string
  handleTabClick: (animal: string) => void
}

export default function AnimalButton({
  selectedTab,
  animalType,
  handleTabClick,
}: props) {
  const cx = cs.bind(style)
  return (
    <button
      className={cx('tabButton', selectedTab === animalType && 'active')}
      onClick={() => handleTabClick(animalType)}
    >
      {animalType}
    </button>
  )
}
