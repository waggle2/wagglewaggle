import style from './navTheme.module.scss'
import Theme from './_components/Theme'
import SingleIcon from '@/public/assets/single.svg'
import SomeIcon from '@/public/assets/some.svg'
import CoupleIcon from '@/public/assets/couple.svg'
import BreakUpIcon from '@/public/assets/breakUp.svg'
import AdultIon from '@/public/assets/adult.svg'

export default function NavTheme() {
  return (
    <article className={style.container}>
      <label className={style.title}>테마별 게시판</label>
      <nav className={style.themeWrapper}>
        <Theme
          svg={<SingleIcon />}
          title="짝사랑"
          key={'single'}
          bgColor={'#DEF5FF'}
          href={{
            pathname: '/bulletin-board',
            query: {
              category: '짝사랑',
              title: '짝사랑',
            },
          }}
        />
        <Theme
          svg={<SomeIcon />}
          title="썸"
          key={'some'}
          bgColor={'#FFECBD'}
          href={{
            pathname: '/bulletin-board',
            query: {
              category: '썸',
              title: '썸',
            },
          }}
        />
        <Theme
          svg={<CoupleIcon />}
          title="연애"
          key={'couple'}
          bgColor={'#CCFFB1'}
          href={{
            pathname: '/bulletin-board',
            query: {
              category: '연애',
              title: '연애',
            },
          }}
        />
        <Theme
          svg={<BreakUpIcon />}
          title="이별"
          key={'breakUp'}
          bgColor={'#F3E1F7'}
          href={{
            pathname: '/bulletin-board',
            query: {
              category: '이별',
              title: '이별',
            },
          }}
        />
        <Theme
          svg={<AdultIon />}
          title="19"
          key={'19'}
          bgColor={'#FFE3C9'}
          href={{
            pathname: '/bulletin-board',
            query: {
              category: '19',
              title: '19',
            },
          }}
        />
      </nav>
    </article>
  )
}
