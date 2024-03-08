import LogoAndText from './_components/LogoAndText'
import SignInOrGuestView from './_components/SignInOrGuestView'
import SignUpButtonGroup from './_components/SignUpButtonGroup'
import style from './styles/page.module.scss'

async function page() {
  return (
    <section className={style.container}>
      <LogoAndText />
      <div className={style.buttonsWrapper}>
        <SignUpButtonGroup />
      </div>
      <SignInOrGuestView />
    </section>
  )
}

export default page
