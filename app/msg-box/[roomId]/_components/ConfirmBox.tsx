import Button from '@/app/_components/button/Button'
import style from '../styles/confirmBox.module.scss'

interface Props {
  title: string
  description: string
  description2?: string
  buttonType: 'choice' | 'single'
  changeState?: () => void
  closeModal?: () => void
  actionFunction?: () => void
}

export default function ConfirmBox({
  title,
  description,
  description2,
  buttonType,
  changeState = () => {},
  closeModal,
  actionFunction = () => {},
}: Props) {
  return (
    <div className={style.container}>
      <h2 className={style.title}>{title}</h2>
      <p className={style.description}>{description}</p>
      <p className={style.description}>{description2}</p>
      <div className={style.buttonWrapper}>
        {buttonType === 'choice' ? (
          <>
            <Button text="차단하지 않기" mainColor="grey" action={closeModal} />
            <Button
              text="차단하기"
              mainColor="green"
              action={() => {
                actionFunction()
              }}
            />
          </>
        ) : (
          <Button text="확인" mainColor="green" action={closeModal} />
        )}
      </div>
    </div>
  )
}
