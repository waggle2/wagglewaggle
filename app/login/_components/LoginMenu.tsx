import style from './styles/loginMenu.module.scss'
const menuList = ['회원가입', '계정정보 찾기', '가입없이 둘러보기']

export default function LoginMenu() {
  return (
    <div>
      <ul className={style.menuList}>
        {menuList.map((menu, index) => (
          <li key={index}>{menu}</li>
        ))}
      </ul>
    </div>
  )
}
