import LoginForm from './_components/LoginForm'
import LoginHeader from './_components/LoginHeader'
import LoginMenu from './_components/LoginMenu'
import LoginSocial from './_components/LoginSocial'
import style from './page.module.scss'
export default function page() {
  return (
    <section className={style.section}>
      <LoginHeader />
      <LoginForm />
      <div className={style.hrDiv}>
        <hr />
        <span>OR</span>
      </div>
      <LoginSocial />
      <LoginMenu />
    </section>
  )
}
