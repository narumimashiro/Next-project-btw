import styles from '@/styles/molecules/pageComponents.module.scss'
import { useCustomContext } from '@/components/customProvider'

type PageTemplateProps = {
  children: React.ReactNode
}
export const PageTemplate = ({ children }: PageTemplateProps) => {
  const { isPortrait, isTabletSize } = useCustomContext()
  const pageSize = isTabletSize ? 'tablet' : isPortrait ? 'portrait' : 'landscape'

  return <div className={styles[`page-contents-wrap-${pageSize}`]}>{children}</div>
}
