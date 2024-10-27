import { List } from '@/stories/List/List'
import { HamburgerDrawer } from '@/components/molecules/hamburgerDrawer'
import { ListItem } from '@/stories/List/ListItem'

type SelectAnimeDrawerMenuProps = {
  onSelect: (anime: string) => void
}
export const SelectAnimeDrawerMenu = ({ onSelect }: SelectAnimeDrawerMenuProps) => {
  return (
    <HamburgerDrawer>
      <List>
        <ListItem
          onClick={() => {
            onSelect('Test')
          }}>
          TEst
        </ListItem>
        <ListItem
          onClick={() => {
            onSelect('Test')
          }}>
          TEst
        </ListItem>
      </List>
    </HamburgerDrawer>
  )
}
