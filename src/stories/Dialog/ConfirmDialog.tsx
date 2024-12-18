import { useTheme } from '@mui/material'
import { useTranslation } from 'next-i18next'

import styles from './ConfirmDialog.module.scss'

export type ConfirmDialogProps = {
  open: boolean
  title: string
  children: React.ReactNode
  colorTheme?: 'light' | 'dark'
  buttonString?: string
  ariaLabel?: string
  onConfirm: () => void
}

export const ConfirmDialog = ({
  open,
  title,
  children,
  colorTheme,
  buttonString,
  ariaLabel = 'Confirm_OK',
  onConfirm
}: ConfirmDialogProps) => {
  const { t } = useTranslation()
  const theme = useTheme()
  const color = colorTheme ? colorTheme : theme.palette.mode

  const displayDialog = open ? 'BTW_dialog-visible' : 'BTW_dialog-hidden'
  const btnString = buttonString ? buttonString : t('STRID_cmn_ok')

  return (
    <div className={styles[displayDialog]}>
      <div className={styles[`BTW_overlay-${color}`]}>
        <div className={`absolute-center ${styles[`BTW_dialog-${color}`]}`}>
          <div className={styles.BTW_contentsWrap}>
            <h2 className={`text-xl-bold ${styles.BTW_title}`}>{title}</h2>
            {children}
          </div>
          <div className={styles[`BTW_horizon-${color}`]}></div>
          <button
            className={`${`button-active-${color}`} ${styles.BTW_confirmButton}`}
            aria-label={ariaLabel}
            onClick={onConfirm}>
            {btnString}
          </button>
        </div>
      </div>
    </div>
  )
}
