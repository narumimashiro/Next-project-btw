import { useState, useEffect } from 'react'
import { useTranslation } from 'next-i18next'

import { ConfirmDialog } from '@/stories/Dialog/ComfirmDialog/ConfirmDialog'
import { Checkbox } from '@/stories/Select/Checkbox/Checkbox'

export type ReDisplayOptionDialogProps = {
  open: boolean
  localStorageKey: string
  colorTheme?: 'light' | 'dark'
  title: string
  children: React.ReactNode
  buttonString?: string
  ariaLabel?: string
  onConfirm: () => void
}

export const ReDisplayOptionDialog = ({
  open,
  localStorageKey,
  colorTheme = 'light',
  title,
  children,
  buttonString,
  ariaLabel = 'Confirm_OK',
  onConfirm
}: ReDisplayOptionDialogProps) => {
  const { t } = useTranslation()

  const NOT_SHOW_AGAIN = 'do_not_show_again'
  const btnString = buttonString ? buttonString : t('STRID_cmn_ok')

  const [openDialog, setOpenDialog] = useState(false)
  const [isChecked, setIsChecked] = useState(false)

  useEffect(() => {
    if (localStorage.getItem(localStorageKey) === NOT_SHOW_AGAIN) {
      setOpenDialog(false)
    } else {
      setOpenDialog(open)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  const handleClick = () => {
    if (isChecked) {
      localStorage.setItem(localStorageKey, NOT_SHOW_AGAIN)
    }
    onConfirm()
  }

  return (
    <ConfirmDialog
      open={openDialog}
      title={title}
      buttonString={btnString}
      ariaLabel={ariaLabel}
      onConfirm={handleClick}>
      <>
        {children}
        <div className="flex-center text-sm">
          <Checkbox
            colorTheme={colorTheme}
            isChecked={isChecked}
            onChange={(value) => setIsChecked(value as boolean)}
            filling
          />
          <p>{t('STRID_dont_ask_again')}</p>
        </div>
      </>
    </ConfirmDialog>
  )
}
