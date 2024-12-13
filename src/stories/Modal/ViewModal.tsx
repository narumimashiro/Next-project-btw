import { useMemo } from 'react'
import { useTheme } from '@mui/material'

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

export const ViewModal = ({ open, children, colorTheme, onClose }: ViewModalProps) => {
  const { isPortrait } = useCustomContext()
  const theme = useTheme()
  const color = colorTheme ? colorTheme : theme.palette.mode

  const displayDialog = open ? 'BTW_modal-visible' : 'BTW_modal-hidden'
  const clearImg = useMemo(
    () => (colorTheme === 'light' ? clearLight.src : clearDark.src),
    [colorTheme]
  )

  return (
    <div className={styles[displayDialog]}>
      <div className={styles[`BTW_overlay-${color}`]}>
        <div
          className={`absolute-center ${styles[`BTW_modal-${color}`]} ${isPortrait ? styles.BTW_portrait : ''}`}>
          <button className={styles.BTW_closebutton} onClick={onClose}>
            <img src={clearImg} alt="" />
          </button>
          <div className={styles.BTW_contentViewer}>{children}</div>
        </div>
      </div>
    </div>
  )
}
