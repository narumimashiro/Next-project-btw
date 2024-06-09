import styles from '@/styles/molecules/pageTemplate.module.scss'

import { useCustomContext } from "@/components/customProvider"
import { ORIENTATION } from "@/hooks/useWindowSize"

type PageTemplateProps = {
  children: React.ReactNode
}
export const PageTemplate = ({
  children,
}: PageTemplateProps) => {

  const { orientation } = useCustomContext()
  const isPortrait = orientation === ORIENTATION.PORTRAIT.HARD

  return (
    <div className={styles[`page-contents-wrap-${isPortrait ? 'portrait' : 'landscape'}`]}>
      { children }
    </div>
  )
}