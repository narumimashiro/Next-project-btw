import { useState } from 'react'
import { useTranslation } from 'next-i18next'

import { BasicButton } from '@/stories/Button/BasicButton'
import { StrongButton } from '@/stories/Button/StrongButton'
import { Toast } from '@/stories/Toast/Toast'

export type UrlCopyButtonProps = {
  buttonClass?: string
  buttonType?: 'basic' | 'strong'
}

export const UrlCopyButton = ({
  buttonClass = '',
  buttonType = 'basic'
}: UrlCopyButtonProps) => {
  const { t } = useTranslation()
  const strongButton = 'strong' === buttonType

  const [openToast, setOpenToast] = useState(false)
  const [urlCopied, setUrlCopied] = useState(false)

  const copyUrl = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
      setUrlCopied(true)
    } catch {
      setUrlCopied(false)
    }
    setOpenToast(true)
  }

  return (
    <>
      {strongButton ? (
        <StrongButton className={buttonClass} onClick={copyUrl}>
          {t('STRID_url_copy_button')}
        </StrongButton>
      ) : (
        <BasicButton className={buttonClass} onClick={copyUrl}>
          {t('STRID_url_copy_button')}
        </BasicButton>
      )}
      <Toast
        open={openToast}
        message={urlCopied ? t('STRID_url_copy_success') : t('STRID_url_copy_failed')}
        isError={!urlCopied}
        onClose={() => setOpenToast(false)}
      />
    </>
  )
}
