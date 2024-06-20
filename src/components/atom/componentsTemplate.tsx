import { useCustomContext } from '@/components/customProvider'

type TextProps = {
  children: React.ReactNode
  className?: string
}

export const HeadlineText = ({ children, className }: TextProps) => {
  const { isPortrait } = useCustomContext()

  return (
    <p
      className={`${isPortrait ? 'text-base-bold' : 'text-xl-bold'} ${className ? className : ''}`}>
      {children}
    </p>
  )
}
