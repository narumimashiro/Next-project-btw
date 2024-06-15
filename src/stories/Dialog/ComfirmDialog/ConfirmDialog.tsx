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
  colorTheme = 'light',
  buttonString,
  ariaLabel = 'Confirm_OK',
  onConfirm
}: ConfirmDialogProps) => {
  const { t } = useTranslation()

  const displayDialog = open ? 'dialog-visible' : 'dialog-hidden'
  const btnString = buttonString ? buttonString : t('STRID_cmn_ok')

  return (
    <div className={styles[displayDialog]}>
      <div className={styles[`overlay-${colorTheme}`]}>
        <div className={`absolute-center ${styles[`dialog-${colorTheme}`]}`}>
          <div className={styles.contentsWrap}>
            <h2 className={`text-xl-bold ${styles.title}`}>{title}</h2>
            {children}
          </div>
          <div className={styles[`horizon-${colorTheme}`]}></div>
          <button
            className={`${`button-active-${colorTheme}`} ${styles.confirmButton}`}
            aria-label={ariaLabel}
            onClick={onConfirm}>
            {btnString}
          </button>
        </div>
      </div>
    </div>
  )
}
