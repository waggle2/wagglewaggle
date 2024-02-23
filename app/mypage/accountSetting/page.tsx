import style from './accountSetting.module.scss'
import Header from '@/app/_components/common/header/Header'
import Back from '@/app/_components/common/header/_components/Back'
import Link from '@/node_modules/next/link'

export default function AccountSetting() {
  return (
    <>
      <Header leftSection={<Back />} title={'계정 설정'} />
      <div className={style.container}>
        <Link className={style.item} href={'/mypage/editInformation'}>
          회원 정보 수정
        </Link>

        <Link className={style.lastItem} href={'/mypage/withdrawal'}>
          회원 탈퇴
        </Link>
      </div>
    </>
  )
}
