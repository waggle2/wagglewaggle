import Link from 'next/link'
import style from './styles/loginMenu.module.scss'
const menuList = [
  {
    title: '회원가입',
    href: '/register',
  },
  {
    title: '계정정보 찾기',
    href: '/',
  },
  {
    title: '가입없이 둘러보기',
    href: '/',
  },
]

export default function LoginMenu() {
  return (
    <div>
      <ul className={style.menuList}>
        {menuList.map((menu, index) => (
          <li key={index}>
            <Link href={menu.href}>{menu.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
