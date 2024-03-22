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
  let koCategory = ''
  switch (category) {
    case 'emoji':
      koCategory = '이모지'
      break
    case 'background':
      koCategory = '프로필 배경'
      break
    case 'frame':
      koCategory = '프레임'
      break
    case 'wallpaper':
      koCategory = '벽지'
      break
  }
  const cx = cs.bind(style)
  return (
    <button
      className={cx('tabButton', selectedTab === category && 'active')}
      onClick={() => handleTabClick(category)}
    >
      {koCategory}
    </button>
  )
}
