import style from './guideline.module.scss'
import WithdrawalAnimal from '/public/assets/withdrawalAnimal.svg'
import WithdrawalStar from '/public/assets/withdrawalStar.svg'
import Button from '@/app/_components/button/Button'

type props = { handleBack: () => void; handleNextStep: () => void }

export default function Guideline({ handleBack, handleNextStep }: props) {
  return (
    <>
      <div className={style.boldText}>
        정말로 와글와글을
        <br />
        떠나시나요?
      </div>
      <div className={style.normalText}>
        지금 계정을 삭제하면 친구들과의
        <br />
        추억이 사라져요.
      </div>
      <div className={style.imageWrapper}>
        <WithdrawalAnimal />
        <WithdrawalStar className={style.star} />
      </div>
      <div className={style.noticeContainer}>
        <div className={style.noticeTitle}>와글와글 서비스 이용기록 삭제</div>
        <div className={style.noticeContent}>
          회원정보 및 쪽지 등 개인형 서비스 이용 기록은 모두 삭제되며 삭제된
          데이터는 복구되지 않습니다.
        </div>
      </div>
      <div className={style.noticeContainer}>
        <div className={style.noticeTitle}>게시물 및 댓글 유지</div>
        <div className={style.noticeContent}>
          와글와글 서비스 내에 올린 게시글 및 댓글은 탈퇴 시 자동 삭제되지 않고
          그대로 남아있습니다. 삭제를 원하는 게시글이나 댓글이 있다면 반드시
          탈퇴 전 삭제하시길 바랍니다.
        </div>
      </div>
      <div className={style.buttonWrapper}>
        <Button text={'취소'} mainColor={'grey'} action={handleBack} />
        <Button text={'계속하기'} mainColor={'green'} action={handleNextStep} />
      </div>
    </>
  )
}
