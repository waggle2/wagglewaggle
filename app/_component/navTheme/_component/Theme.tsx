import Link from '@/node_modules/next/link'
import style from './theme.module.css'
import Image from '@/node_modules/next/image'

type Props = {
  href: string
  svg: string
  title: string
  bgColor: string
}

export default function Theme({ href, svg, title, bgColor }: Props) {
  return (
    <Link href={href} className={style.container} key={title}>
      <Image
        src={svg}
        alt={'nav logo'}
        style={{ backgroundColor: `${bgColor}` }}
      />
      <div className={style.title}>{title}</div>
    </Link>
  )
}
