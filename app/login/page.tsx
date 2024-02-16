import LoginHeader from './_components/LoginHeader'
import LoginMenu from './_components/LoginMenu'
import LoginSocial from './_components/LoginSocial'
import style from './page.module.scss'
import FormPresetProvider from '../_components/userForm/FormPresetProvider'
export default function page() {
  return (
    <section className={style.section}>
      <LoginHeader />
      <FormPresetProvider
        formDataType="login"
        formDataObject={{
          loginEmail: '',
          loginPassword: '',
        }}
      />
      <div className={style.hrDiv}>
        <hr />
        <span>OR</span>
      </div>
      <LoginSocial />
      <LoginMenu />
    </section>
  )
}
