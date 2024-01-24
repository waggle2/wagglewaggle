import style from './navTheme.module.css'
import Theme from './_component/Theme'
import singleIcon from '@/./public/single.svg'
import someIcon from '@/./public/some.svg'
import coupleIcon from '@/./public/couple.svg'
import breakUpIcon from '@/./public/breakUp.svg'
import adultIon from '@/./public/adult.svg'

export default function NavTheme() {
  return (
    <article className={style.container}>
      <label className={style.title}>테마별 게시판</label>
      <nav className={style.themeWrapper}>
        <Theme
          href={'./'}
          svg={singleIcon}
          title="짝사랑"
          key={'single'}
          bgColor={'#DEF5FF'}
        />
        <Theme
          href={''}
          svg={someIcon}
          title="썸"
          key={'some'}
          bgColor={'#FFECBD'}
        />
        <Theme
          href={''}
          svg={coupleIcon}
          title="연애"
          key={'couple'}
          bgColor={'#CCFFB1'}
        />
        <Theme
          href={''}
          svg={breakUpIcon}
          title="이별"
          key={'breakUp'}
          bgColor={'#F3E1F7'}
        />
        <Theme
          href={''}
          svg={adultIon}
          title="19"
          key={'19'}
          bgColor={'#FFE3C9'}
        />
      </nav>
    </article>
  )
}
