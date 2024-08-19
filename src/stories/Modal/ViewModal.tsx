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
  const theme = useTheme().palette.mode
  const color = colorTheme ? colorTheme : theme
  const { isPortrait } = useCustomContext()

  const displayDialog = open ? 'BTW_modal-visible' : 'BTW_modal-hidden'

  return (
    <div className={styles[displayDialog]}>
      <div className={styles[`BTW_overlay-${color}`]}>
        <div
          className={`absolute-center ${styles[`BTW_modal-${color}`]} ${isPortrait ? styles.portrait : ''}`}>
          <button className={styles.BTW_closebutton} onClick={onClose}>
            <img src={color === 'light' ? clearLight.src : clearDark.src} alt="" />
          </button>
          {children}
        </div>
      </div>
    </div>
  )
}
