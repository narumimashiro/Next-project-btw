import { useEffect, useState } from 'react'
import { useTranslation } from 'next-i18next'

import { List } from '@/stories/List/List'
import { HamburgerDrawer } from '@/components/molecules/hamburgerDrawer'
import { ListItem } from '@/stories/List/ListItem'

import styles from '@/styles/organisms/WebCameraComponents.module.scss'

// static variable list
export const CharacterList: { group: string; members: string[] }[] = [
  {
    group: 'TEMP_MyGO!!!!!',
    members: [
      'STRID_img_anon',
      'STRID_img_soyo',
      'STRID_img_tomori',
      'STRID_img_taki',
      'STRID_img_rana'
    ]
  },
  {
    group: 'TEMP_Ave Mujica',
    members: [
      'STRID_img_doloris',
      'STRID_img_mortis',
      'STRID_img_timoris',
      'STRID_img_amoris',
      'STRID_img_oblivionis'
    ]
  },
  {
    group: 'TEMP_25時、ナイトコードで。',
    members: ['STRID_img_mizuki', 'STRID_img_ena', 'STRID_img_kanade', 'STRID_img_mafuyu']
  },
  {
    group: 'TEMP_Leo/need',
    members: ['STRID_img_saki', 'STRID_img_shiho', 'STRID_img_ichika', 'STRID_img_honami']
  },
  {
    group: 'TEMP_MORE MORE JUMP！',
    members: ['STRID_img_shizuku', 'STRID_img_minori', 'STRID_img_haruka', 'STRID_img_airi']
  },
  {
    group: 'TEMP_アークナイツ',
    members: [
      'STRID_img_amiya_mage',
      'STRID_img_amiya_guard',
      'STRID_img_amiya_medic',
      'STRID_img_kaltsit',
      'STRID_img_ling',
      'STRID_img_shu',
      'STRID_img_nian',
      'STRID_img_dusk',
      'STRID_img_eyjafjalla',
      'STRID_img_goldenglow'
    ]
  }
]

export const convertStridToImgfilename = (strid: string) => {
  const parts = strid.split('_').slice(2)
  return `${parts.join('_')}.png`
}

type SelectAnimeDrawerMenuProps = {
  onSelect: (anime: string) => void
}
export const SelectAnimeDrawerMenu = ({ onSelect }: SelectAnimeDrawerMenuProps) => {
  const { t } = useTranslation()

  return (
    <HamburgerDrawer>
      <List>
        {CharacterList.map((el, index) => (
          <ListItem
            key={el.group}
            onClick={() => {
              onSelect(CharacterList[index].group)
            }}>
            {t(`${el.group}`)}
          </ListItem>
        ))}
      </List>
    </HamburgerDrawer>
  )
}

type SelectorCharacterProps = {
  characterList: string[]
  selectChara: (chara: string) => void
}
export const SelectorCharacter = ({ characterList, selectChara }: SelectorCharacterProps) => {
  const { t } = useTranslation()
  const [selectedIndex, setSelectedIndex] = useState(() => characterList.length / 2)

  useEffect(() => {
    selectChara(characterList[selectedIndex])
  }, [characterList, selectChara, selectedIndex])

  useEffect(() => {
    setSelectedIndex((characterList.length / 2) | 0)
  }, [characterList])

  const prev = () => {
    setSelectedIndex((pre) => Math.max(pre - 1, 0))
  }

  const next = () => {
    setSelectedIndex((pre) => Math.min(pre + 1, characterList.length - 1))
  }

  return (
    <div className={styles.container}>
      <button className={styles.selectButton} onClick={prev}>
        <p>{t(`${characterList[selectedIndex - 1] || ''}`)}</p>
      </button>
      <p className={`${styles.characterLabel} ${styles.selected}`}>
        {t(`${characterList[selectedIndex]}`)}
      </p>
      <button className={styles.selectButton} onClick={next}>
        <p>{t(`${characterList[selectedIndex + 1] || ''}`)}</p>
      </button>
    </div>
  )
}
