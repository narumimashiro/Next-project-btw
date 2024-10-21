import isMobile from 'ismobilejs'

/**
 * @returns boolean is mobile device
 */
export const isMobileDevice = () => {
  if (typeof window === 'undefined') return false

  return isMobile().any
}

/**
 * @returns boolean is apple mobile device
 */
export const isAppleDevice = () => {
  if (typeof window === 'undefined') return false

  return isMobile().apple.device
}

/**
 * @returns boolean is android mobile device
 */
export const isAndroidDevice = () => {
  if (typeof window === 'undefined') return false

  return isMobile().android.device
}
