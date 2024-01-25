import style from './navTheme.module.css'
import Theme from './_component/Theme'
import SingleIcon from '@/./public/single.svg'
import SomeIcon from '@/./public/some.svg'
import CoupleIcon from '@/./public/couple.svg'
import BreakUpIcon from '@/./public/breakUp.svg'
import AdultIon from '@/./public/adult.svg'

export default function NavTheme() {
  return (
    <article className={style.container}>
      <label className={style.title}>테마별 게시판</label>
      <nav className={style.themeWrapper}>
        <Theme
          href={'./'}
          svg={<SingleIcon />}
          title="짝사랑"
          key={'single'}
          bgColor={'#DEF5FF'}
        />
        <Theme
          href={''}
          svg={<SomeIcon />}
          title="썸"
          key={'some'}
          bgColor={'#FFECBD'}
        />
        <Theme
          href={''}
          svg={<CoupleIcon />}
          title="연애"
          key={'couple'}
          bgColor={'#CCFFB1'}
        />
        <Theme
          href={''}
          svg={<BreakUpIcon />}
          title="이별"
          key={'breakUp'}
          bgColor={'#F3E1F7'}
        />
        <Theme
          href={''}
          svg={<AdultIon />}
          title="19"
          key={'19'}
          bgColor={'#FFE3C9'}
        />
      </nav>
    </article>
  )
}
