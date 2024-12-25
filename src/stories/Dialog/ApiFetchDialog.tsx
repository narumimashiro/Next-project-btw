import { useEffect } from 'react'

import { useTheme } from '@mui/material'
import { useTranslation } from 'next-i18next'

import Loading from '@/components/atom/loading'
import { API_STATUS, ApiStatusType } from '@/hooks/useApiStatus'

import styles from './ApiFetchDialog.module.scss'
import { ConfirmDialog } from './ConfirmDialog'

export type ApiFetchDialogProps = {
  apiStatus: ApiStatusType
  colorTheme?: 'light' | 'dark'
  bodyLoading: {
    title?: string
    bodyText: string[]
  }
  bodySuccess: {
    title?: string
    bodyText: string[]
    buttonString?: string
    onClick?: () => void
  }
  bodyFailed: {
    title?: string
    bodyText: string[]
    buttonString?: string
    onClick?: () => void
  }
  resetApiState: () => void
} & React.ButtonHTMLAttributes<HTMLButtonElement>

export const ApiFetchDialog = ({
  colorTheme,
  apiStatus,
  bodyLoading,
  bodySuccess,
  bodyFailed,
  resetApiState,
  ...buttonProps
}: ApiFetchDialogProps) => {
  const theme = useTheme()
  const color = colorTheme ? colorTheme : theme.palette.mode

  useEffect(() => {
    return () => resetApiState()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const displayDialog =
    apiStatus !== API_STATUS.IDLE ? 'BTW_dialog-visible' : 'BTW_dialog-hidden'

  return (
    <div className={styles[displayDialog]}>
      <div className={styles[`BTW_overlay-${color}`]}>
        <div className={`absolute-center ${styles[`BTW_dialog-${color}`]}`}>
          <div className={styles.BTW_containerWrap}>
            {apiStatus === API_STATUS.SUCCESS || apiStatus === API_STATUS.FAILED ? (
              <FetchResult
                colorTheme={color}
                apiStatus={apiStatus}
                bodySuccess={bodySuccess}
                bodyFailed={bodyFailed}
                resetApiState={resetApiState}
                {...buttonProps}
              />
            ) : (
              // apiStatus === API_STATUS.LOADING
              <div className={styles.BTW_contentsWrap}>
                <h2 className={`text-2xl-bold ${styles.BTW_title}`}>{bodyLoading.title}</h2>
                {bodyLoading.bodyText.map((sentence, index) => (
                  <p key={`body-text-${index}`}>{sentence}</p>
                ))}
                <div className={styles.BTW_loading}>
                  <Loading />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

type FetchResultProps = Pick<
  ApiFetchDialogProps,
  'colorTheme' | 'apiStatus' | 'bodySuccess' | 'bodyFailed' | 'resetApiState'
> &
  React.ButtonHTMLAttributes<HTMLButtonElement>

const FetchResult = ({
  colorTheme,
  apiStatus,
  bodySuccess,
  bodyFailed,
  resetApiState
}: FetchResultProps) => {
  const { t } = useTranslation()

  const ariaLabelSuccess = bodySuccess.title ?? 'api_success_confirm_ok'
  const ariaLabelFailed = bodyFailed.title ?? 'api_failed_conform_ok'

  const successBtnStr = bodySuccess.buttonString ?? 'STRID_cmn_ok'
  const failedBtnStr = bodyFailed.buttonString ?? 'STRID_cmn_ok'

  const handlerConform = () => {
    if (apiStatus === API_STATUS.SUCCESS) {
      if (bodySuccess.onClick) bodySuccess.onClick()
    } else {
      // apiStatus === API_STATUS.FAILED
      if (bodyFailed.onClick) bodyFailed.onClick()
    }
    // Fetch reset function to close a dialog
    resetApiState()
  }

  return (
    <ConfirmDialog
      open={apiStatus === API_STATUS.SUCCESS || apiStatus === API_STATUS.FAILED}
      colorTheme={colorTheme}
      title={
        apiStatus === API_STATUS.SUCCESS
          ? (bodySuccess.title as string)
          : (bodyFailed.title as string)
      }
      ariaLabel={apiStatus === API_STATUS.SUCCESS ? ariaLabelSuccess : ariaLabelFailed}
      buttonString={
        apiStatus === API_STATUS.SUCCESS ? t(`${successBtnStr}`) : t(`${failedBtnStr}`)
      }
      onConfirm={handlerConform}>
      <>
        {apiStatus === API_STATUS.SUCCESS
          ? bodySuccess.bodyText.map((sentence, index) => (
              <p key={`body-text-${index}`}>{sentence}</p>
            ))
          : bodyFailed.bodyText.map((sentence, index) => (
              <p key={`body-text-${index}`}>{sentence}</p>
            ))}
      </>
    </ConfirmDialog>
  )
}
