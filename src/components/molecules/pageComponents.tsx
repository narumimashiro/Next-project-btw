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

type ImageHeaderProps = {
  className?: string
  imgSrc: string
  title?: string
  subTitle?: string
}
export const ImageHeader = (props: ImageHeaderProps) => {
  const { className, imgSrc, title, subTitle } = props
  const { isPortrait } = useCustomContext()

  return (
    <div
      className={`${styles['image-header']} ${isPortrait ? styles.portrait : styles.landscape} ${className ? className : ''}`}>
      <img src={imgSrc} alt="" />
      <div
        className={`absolute-center ${styles.description} ${isPortrait ? styles.portrait : ''}`}>
        <p className={styles.title}>{title}</p>
        <p className={styles.subtitle}>{subTitle}</p>
      </div>
    </div>
  )
}

type PageTemplateWithHeaderProp = {
  children: React.ReactNode
} & ImageHeaderProps

export const PageTemplateWithHeader = (props: PageTemplateWithHeaderProp) => {
  const { children } = props

  return (
    <>
      <ImageHeader
        className="mb-16"
        imgSrc={props.imgSrc}
        title={props.title}
        subTitle={props.subTitle}
      />
      <PageTemplate>{children}</PageTemplate>
    </>
  )
}
