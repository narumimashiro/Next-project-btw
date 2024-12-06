import { atom } from 'recoil'

export const isVisibleMenuState = atom<boolean>({
  key: 'Is menu visible',
  default: true
})
