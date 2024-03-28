import { useEffect, useMemo } from 'react'

import Loading from '@/components/atom/loading'
import { API_STATUS, AptStatusType } from '@/hooks/useApiStatus'
import styles from '@/styles/ui_components/dialog.module.sass'

type DialogProps = {
  open: boolean
  children?: React.ReactNode
  colorTheme?: 'light' | 'dark'
}

const Dialog = ({
  open,
  children,
  colorTheme = 'light'
}: DialogProps) => {

  const displayDialog = open ? 'dialog-visible' : 'dialog-hidden'

  return (
    <div className={styles[displayDialog]}>
      <div className={styles[`overlay-${colorTheme}`]}>
        <div className={`absolute-center ${styles[`dialog-${colorTheme}`]}`}>
          { children }
        </div>
      </div>
    </div>
  )
}

type ConfirmDialogProps = {
  open: boolean
  title: string
  children: React.ReactNode
  colorTheme?: 'light' | 'dark'
  buttonString?: string
  ariaLabel?: string
  onConfirm: () => void
} & DialogProps

export const ConfirmDialog = ({
  open,
  title,
  children,
  colorTheme = 'light',
  buttonString = 'OK',
  ariaLabel = 'Confirm OK',
  onConfirm
}: ConfirmDialogProps) => {

  return (
    <Dialog open={open} colorTheme={colorTheme}>
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
    </Dialog>
  )
}

type ApiFetchDialogProps = {
  apiStatus: AptStatusType
  colorTheme?: 'light' | 'dark'
  bodyLoading: {
    title?: string,
    bodyText: string
  }
  bodySuccess: {
    title?: string,
    bodyText: string,
    buttonString: string
    onClick: () => void
  }
  bodyFailed: {
    title?: string,
    bodyText: string,
    buttonString: string
    onClick: () => void
  }
  resetApiState: () => void
}

export const ApiFetchDialog = ({
  colorTheme = 'light',
  apiStatus,
  bodyLoading,
  bodySuccess,
  bodyFailed,
  resetApiState
}: ApiFetchDialogProps) => {

  useEffect(() => {
    return () => resetApiState()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const ariaLabelSuccess = useMemo(() => bodySuccess.title ?? 'api_success_confirm_ok', [bodySuccess])
  const ariaLabelFailed = useMemo(() => bodyFailed.title ?? 'api_failed_conform_ok', [bodyFailed])
  
  return (
    <Dialog open={apiStatus !== API_STATUS.IDLE} colorTheme={colorTheme}>
      <div className={styles.containerWrap}>
        {
          apiStatus === API_STATUS.LOADING ? (
            <div className={styles.contentsWrap}>
              <h2 className={`text-2xl-bold ${styles.title}`}>{bodyLoading.title}</h2>
              <p>{bodyLoading.bodyText}</p>
              <div className={styles.loading}>
                <Loading />
              </div>
            </div>
          ) : apiStatus === API_STATUS.SUCCESS ||
              apiStatus === API_STATUS.FAILED ? (
            <>
              <div className={styles.contentsWrap}>
                <h2 className={`text-2xl-bold ${styles.title}`}>
                  {apiStatus === API_STATUS.SUCCESS ? bodySuccess.title : bodyFailed.title}
                </h2>
                <p>{apiStatus === API_STATUS.SUCCESS ? bodySuccess.bodyText : bodyFailed.bodyText}</p>
              </div>
              <div className={styles.bottomButton}>
                <div className={styles[`horizon-${colorTheme}`]}></div>
                <button
                  className={`button-active-${colorTheme}`}
                  aria-label={apiStatus === API_STATUS.SUCCESS ? ariaLabelSuccess : ariaLabelFailed}
                  onClick={apiStatus === API_STATUS.SUCCESS ? bodySuccess.onClick : bodyFailed.onClick}
                >
                  {apiStatus === API_STATUS.SUCCESS ? bodySuccess.buttonString : bodyFailed.buttonString}
                </button>
              </div>
            </>
          ) : (
            <></>
          )
        }
      </div>
    </Dialog>
  )
}