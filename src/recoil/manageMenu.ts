import { useEffect } from 'react'
import { atom, useSetRecoilState } from 'recoil'

export const isVisibleMenuState = atom<boolean>({
  key: 'Is menu visible',
  default: true
})

export const useManageMenuHidden = () => {
  const setMenuVisible = useSetRecoilState(isVisibleMenuState)
  useEffect(() => {
    setMenuVisible(false)

    return () => setMenuVisible(true)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}
