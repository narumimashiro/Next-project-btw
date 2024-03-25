import styles from '@/styles/ui_components/dialog.module.sass'

interface ConfirmDialogProps {
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
  buttonString = 'OK',
  ariaLabel = 'Confirm OK',
  onConfirm
}: ConfirmDialogProps) => {

  const dialogVisible = open ? 'dialog-visible' : 'dialog-hidden'

  return (
    <div className={styles[dialogVisible]}>
      <div className={styles[`overlay-${colorTheme}`]}>
        <div className={`absolute-center ${styles[`dialog-${colorTheme}`]}`}>
          <div className={styles.contentsWrap}>
            <h2 className={`text-2xl-bold ${styles.title}`}>{title}</h2>
            {children}
          </div>
          <div className={styles[`horizon-${colorTheme}`]}></div>
          <button
            className={`${`button-active-${colorTheme}`} ${styles.confirmButton}`}
            aria-label={ariaLabel}
            onClick={onConfirm}
          >
            {buttonString}
          </button>
        </div>
      </div>
    </div>
  )
}