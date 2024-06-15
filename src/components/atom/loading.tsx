import { useTheme } from '@mui/material'
import styles from '@/styles/atom/Loading.module.scss'

const Loading = () => {

  const colorTheme = useTheme().palette.mode

  return (
    <div className={`${styles.loading} ${styles[colorTheme]}`}></div>
  )

}
export default Loading
