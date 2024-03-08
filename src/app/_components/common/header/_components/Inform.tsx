'use client'
import InformIcon from '/public/assets/inform.svg'

interface Props {
  clickEvent?: () => void
}

export default function Inform({ clickEvent }: Props) {
  return (
    <span onClick={clickEvent}>
      <InformIcon />
    </span>
  )
}
