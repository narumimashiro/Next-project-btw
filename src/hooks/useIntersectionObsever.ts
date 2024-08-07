/**
 * [Custom hook]
 * observer DOM is visible or not
 */

import { useEffect, useState } from 'react'

export const useIntersectionObserver = (
  elementRef: React.RefObject<Element>,
  option?: IntersectionObserverInit
) => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting)
      },
      {
        threshold: 0.5,
        ...option
      }
    )

    const currentElement = elementRef.current
    if (currentElement) {
      observer.observe(currentElement)
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement)
      }
    }
  }, [elementRef, option])

  return isVisible
}
