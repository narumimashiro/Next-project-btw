import styles from '@/styles/molecules/pageComponents.module.scss'

import { useCustomContext } from "@/components/customProvider"

type PageTemplateProps = {
  children: React.ReactNode
}
export const PageTemplate = ({
  children,
}: PageTemplateProps) => {

  const { isPortrait } = useCustomContext()

  return (
    <div className={styles[`page-contents-wrap-${isPortrait ? 'portrait' : 'landscape'}`]}>
      { children }
    </div>
  )
}