import { useEffect } from 'react'
import { useTranslation } from 'next-i18next'
import Loading from '@/components/atom/loading'
import { API_STATUS, AptStatusType } from '@/hooks/useApiStatus'
import styles from './ApiFetchDialog.module.scss'

export type ApiFetchDialogProps = {
  apiStatus: AptStatusType
  colorTheme?: 'light' | 'dark'
  bodyLoading: {
    title?: string,
    bodyText: string[]
  }
  bodySuccess: {
    title?: string,
    bodyText: string[],
    buttonString?: string
    onClick?: () => void
  }
  bodyFailed: {
    title?: string,
    bodyText: string[],
    buttonString?: string
    onClick?: () => void
  }
  resetApiState: () => void,
} & React.ButtonHTMLAttributes<HTMLButtonElement>

export const ApiFetchDialog = ({
  colorTheme = 'light',
  apiStatus,
  bodyLoading,
  bodySuccess,
  bodyFailed,
  resetApiState,
  ...buttonProps
}: ApiFetchDialogProps) => {

  useEffect(() => {
    return () => resetApiState()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const { t } = useTranslation()

  const displayDialog = apiStatus !== API_STATUS.IDLE ? 'dialog-visible' : 'dialog-hidden'

  const ariaLabelSuccess = bodySuccess.title ?? 'api_success_confirm_ok'
  const ariaLabelFailed = bodyFailed.title ?? 'api_failed_conform_ok'

  const successBtnStr = bodySuccess.buttonString ?? 'STRID_cmn_ok'
  const failedBtnStr = bodyFailed.buttonString ?? 'STRID_cmn_ok'

  const handlerConform = () => {
    if(apiStatus === API_STATUS.SUCCESS) {
      if(bodySuccess.onClick) bodySuccess.onClick()
    } else {
      // apiStatus === API_STATUS.FAILED
      if(bodyFailed.onClick) bodyFailed.onClick()
    }
    // Fetch reset function to close a dialog
    resetApiState()
  }

  return (
    <div className={styles[displayDialog]}>
      <div className={styles[`overlay-${colorTheme}`]}>
        <div className={`absolute-center ${styles[`dialog-${colorTheme}`]}`}>
          <div className={styles.containerWrap}>
            {
              apiStatus === API_STATUS.SUCCESS || apiStatus === API_STATUS.FAILED ? (
                <>
                  <div className={styles.contentsWrap}>
                    <h2 className={`text-2xl-bold ${styles.title}`}>
                      {apiStatus === API_STATUS.SUCCESS ? bodySuccess.title : bodyFailed.title}
                    </h2>
                    {
                      apiStatus === API_STATUS.SUCCESS ? (
                        bodySuccess.bodyText.map((sentence, index) => <p key={`{body-text-${index}}`}>{sentence}</p>)
                      ) : (
                        bodyFailed.bodyText.map((sentence, index) => <p key={`{body-text-${index}}`}>{sentence}</p>)
                      )
                    }
                  </div>
                  <div className={styles.bottomButton}>
                    <div className={styles[`horizon-${colorTheme}`]}></div>
                    <button
                      className={`text-xl-bold button-active-${colorTheme}`}
                      aria-label={apiStatus === API_STATUS.SUCCESS ? ariaLabelSuccess : ariaLabelFailed}
                      onClick={handlerConform}
                      {...buttonProps}
                    >
                      {apiStatus === API_STATUS.SUCCESS ? t(`${successBtnStr}`) : t(`${failedBtnStr}`)}
                    </button>
                  </div>
                </>
              ) : (
                // apiStatus === API_STATUS.LOADING
                <div className={styles.contentsWrap}>
                  <h2 className={`text-2xl-bold ${styles.title}`}>{bodyLoading.title}</h2>
                  {bodyLoading.bodyText.map((sentence, index) => <p key={`{body-text-${index}}`}>{sentence}</p>)}
                  <div className={styles.loading}>
                    <Loading />
                  </div>
                </div>
              )
            }
          </div>
        </div>
      </div>
    </div>
  )
}