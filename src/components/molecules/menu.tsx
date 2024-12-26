import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

import AccountTreeIcon from '@mui/icons-material/AccountTree'
import Brightness4Icon from '@mui/icons-material/Brightness4'
import LanguageIcon from '@mui/icons-material/Language'
import { useTheme } from '@mui/material'
import { useTranslation } from 'next-i18next'

import styles from '@/styles/molecules/Menu.module.scss'

import {
  AnnotationText,
  CheckListItem,
  SubTitleText,
  WebHorizon
} from '@/components/atom/componentsTemplate'
import { useLocaleSlug, useRouterLocale } from '@/hooks/useLocaleSlug'
import {
  ColorTheme,
  CUSTOM_MODE,
  DARK_MODE,
  LIGHT_MODE,
  useUserColorTheme
} from '@/hooks/useThemeStyle'

import ArrowPrevDark from '@/img/dark/arrow_down_dark.svg'
import ArrowPrevLight from '@/img/light/arrow_down_light.svg'
import { List } from '@/stories/List/List'
import { ListItem } from '@/stories/List/ListItem'
import { Menu, MenuContext } from '@/stories/Menu/Menu'

export const UserMenu = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)

  const handleSetAnchor = (
    e: React.MouseEvent<HTMLElement> | React.TouchEvent<HTMLElement>
  ) => {
    setAnchorEl(e.currentTarget)
  }

  const handleReleaseAnchor = () => setAnchorEl(null)

  return (
    <>
      <button onClick={handleSetAnchor} className={styles.menuIcon}>
        <img src="/btw_icon.png" alt="" />
      </button>
      <Menu anchorEl={anchorEl} handleReleaseAnchor={handleReleaseAnchor}>
        <DefaultMenuContents />
      </Menu>
    </>
  )
}

// Menu contents list
const ALL_CONTENTS = 'all_contents'
const ENVIRONMENT_SETTING = 'environment_setting'
const OTHERS_CONTENTS = 'others_contents'

const DefaultMenuContents = () => {
  const { t } = useTranslation()
  const locale = useLocaleSlug()
  const { anchorEl, handleCloseMenu } = React.useContext(MenuContext) || {}
  const theme = useTheme()
  const colorTheme = theme.palette.mode
  const router = useRouter()

  const BTW_ICON = '/btw_icon.png'
  const DEFAULT_TOP_TEXT = t('STRID_meta_top')

  const [openContent, setOpenContent] = useState(ALL_CONTENTS)
  const [topText, setTopText] = useState(DEFAULT_TOP_TEXT)

  const jumpToTop = () => {
    initMenu()
    if (handleCloseMenu) handleCloseMenu()
    router.push(`/${locale}`)
  }

  const initMenu = () => {
    setOpenContent(ALL_CONTENTS)
    setTopText(DEFAULT_TOP_TEXT)
  }

  useEffect(() => {
    if (anchorEl === null) {
      initMenu()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [anchorEl])

  return (
    <ul className={styles.menuContainer}>
      <li className={styles.menuTop}>
        {ALL_CONTENTS === openContent ? (
          <button className={styles.topIcon} onClick={jumpToTop}>
            <img src={BTW_ICON} alt="" />
          </button>
        ) : (
          <button className={`button-${colorTheme} ${styles.topBack}`} onClick={initMenu}>
            <img src={colorTheme === 'light' ? ArrowPrevLight.src : ArrowPrevDark.src} alt="" />
          </button>
        )}
        <SubTitleText>{topText}</SubTitleText>
      </li>
      <WebHorizon className="mb-8" />
      <EnvironmentSetting
        openContent={openContent}
        setOpenContent={setOpenContent}
        setTopTitleText={setTopText}
      />
      <OthersContents
        openContent={openContent}
        setOpenContent={setOpenContent}
        setTopTitleText={setTopText}
      />
    </ul>
  )
}

type SettingContent = {
  openContent: string
  setOpenContent: (content: string) => void
  setTopTitleText?: (title: string) => void
}
const EnvironmentSetting = ({
  openContent,
  setOpenContent,
  setTopTitleText
}: SettingContent) => {
  const { t } = useTranslation()
  const theme = useTheme()
  const colorTheme = theme.palette.mode

  const LANG_CHANGE = 'language_change'
  const MODE_CHANGE = 'mode_change'
  const [settingType, setSettingType] = useState('')

  const handleClickMenu = (mode: string, titleText: string) => {
    setOpenContent(ENVIRONMENT_SETTING)
    setSettingType(mode)
    if (setTopTitleText) setTopTitleText(titleText)
  }

  const environmentSettingItems = [
    {
      text: t('STRID_menu_language_change'),
      icon: <LanguageIcon />,
      onClick: () => handleClickMenu(LANG_CHANGE, t('STRID_menu_language_change'))
    },
    {
      text: t('STRID_menu_mode_change'),
      icon: <Brightness4Icon />,
      onClick: () => handleClickMenu(MODE_CHANGE, t('STRID_menu_mode_change'))
    }
  ]

  return openContent === ALL_CONTENTS ? (
    <List groupName={t('STRID_menu_environment_setting')} colorTheme={colorTheme}>
      {environmentSettingItems.map((el) => (
        <ListItem key={el.text} {...el} />
      ))}
    </List>
  ) : openContent === ENVIRONMENT_SETTING ? (
    LANG_CHANGE === settingType ? (
      <LanguageChange />
    ) : (
      <LightDarkModeChange />
    )
  ) : (
    <></>
  )
}

const LanguageChange = () => {
  const { t } = useTranslation()
  const { handleCloseMenu } = React.useContext(MenuContext) || {}
  const { localeSlug, routerNewUrl } = useRouterLocale()

  const jumpNewUrl = (locale: string) => {
    routerNewUrl(locale)
    if (handleCloseMenu) handleCloseMenu()
  }

  const languageList = [
    {
      language: t('STRID_menu_japanese'),
      locale: 'ja-jp'
    },
    {
      language: t('STRID_menu_english'),
      locale: 'en-us'
    }
  ]

  return languageList.map((el) => (
    <CheckListItem
      key={el.locale}
      text={el.language}
      onClick={() => jumpNewUrl(el.locale)}
      isChecked={localeSlug === el.locale}
    />
  ))
}

const LightDarkModeChange = () => {
  const { t } = useTranslation()
  const { setColorTheme, userColorTheme } = useUserColorTheme()
  const { handleCloseMenu } = React.useContext(MenuContext) || {}

  const onClickMode = (mode: ColorTheme) => {
    setColorTheme(mode)
    if (handleCloseMenu) handleCloseMenu()
  }

  const modeList = [
    {
      mode: LIGHT_MODE,
      text: t('STRID_menu_light_mode'),
      onClick: () => onClickMode(LIGHT_MODE)
    },
    {
      mode: DARK_MODE,
      text: t('STRID_menu_dark_mode'),
      onClick: () => onClickMode(DARK_MODE)
    },
    {
      mode: CUSTOM_MODE,
      text: t('STRID_menu_custom_mode'),
      onClick: () => onClickMode(CUSTOM_MODE)
    }
  ]

  return (
    <>
      <AnnotationText>{t('STRID_menu_annotation_mode_change')}</AnnotationText>
      {modeList.map((el) => (
        <CheckListItem
          key={el.mode}
          text={el.text}
          onClick={el.onClick}
          isChecked={userColorTheme === el.mode}
        />
      ))}
    </>
  )
}

const OthersContents = ({ openContent }: SettingContent) => {
  const { t } = useTranslation()
  const theme = useTheme()
  const colorTheme = theme.palette.mode
  const router = useRouter()
  const locale = useLocaleSlug()

  const { handleCloseMenu } = React.useContext(MenuContext) || {}

  const othersContentsItems = [
    {
      text: t('STRID_menu_sitemap'),
      icon: <AccountTreeIcon />,
      onClick: () => {
        router.push(`/${locale}/sitemap`)
        if (handleCloseMenu) handleCloseMenu()
      }
    }
  ]

  return (
    (openContent === ALL_CONTENTS || openContent === OTHERS_CONTENTS) && (
      <List groupName={t('STRID_menu_other_setting')} colorTheme={colorTheme}>
        {othersContentsItems.map((el) => (
          <ListItem key={el.text} {...el} />
        ))}
      </List>
    )
  )
}
