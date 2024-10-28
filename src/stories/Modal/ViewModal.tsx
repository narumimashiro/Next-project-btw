import { useMemo } from 'react'

import clearLight from '@/img/light/clear.svg'
import clearDark from '@/img/dark/clear.svg'

import { useCustomContext } from '@/components/customProvider'
import styles from './ViewModal.module.scss'

export type ViewModalProps = {
  open: boolean
  children: React.ReactNode
  colorTheme?: 'light' | 'dark'
  onClose: () => void
}

export const ViewModal = ({
  open,
  children,
  colorTheme = 'light',
  onClose
}: ViewModalProps) => {
  const { isPortrait } = useCustomContext()

  const displayDialog = open ? 'BTW_modal-visible' : 'BTW_modal-hidden'
  const clearImg = useMemo(
    () => (colorTheme === 'light' ? clearLight.src : clearDark.src),
    [colorTheme]
  )

  return (
    <div className={styles[displayDialog]}>
      <div className={styles[`BTW_overlay-${colorTheme}`]}>
        <div
          className={`absolute-center ${styles[`BTW_modal-${colorTheme}`]} ${isPortrait ? styles.portrait : ''}`}>
          <button className={styles.BTW_closebutton} onClick={onClose}>
            <img src={clearImg} alt="" />
          </button>
          {children}
        </div>
      </div>
    </div>
  )
}
