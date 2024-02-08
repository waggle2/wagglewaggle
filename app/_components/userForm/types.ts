export type IInput = {
  type: string
  name: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  value: string
  placeholder?: string
  maxLength?: number
}

export type IButton = {
  text: string
  onClick: () => void
  active: boolean
  inactive: boolean
  type?: 'button' | 'submit'
}