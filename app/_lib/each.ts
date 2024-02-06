import { Children, ReactNode } from 'react'

interface props<T> {
  render: (item: T, index?: number) => ReactNode
  of: T[]
}

const Each = <T>({ render, of }: props<T>): ReactNode =>
  Children.toArray(of.map((item, index?: number) => render(item, index)))

export default Each
