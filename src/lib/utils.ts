/**
 * @param eventHandler
 * @returns void exec props event
 */
export const fireOnEnterKey = (eventHandler: (e: React.KeyboardEvent) => void) => {
  return (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      eventHandler(e)
      e.preventDefault()
    }
  }
}

/**
 * @param list
 * @param resLength
 * @returns T[] return shuffled list
 */
export const shuffleList = <T>(list: T[], resLength: number): T[] => {
  const shuffle = [...list].sort(() => 0.5 - Math.random())

  if (list.length < resLength) {
    return shuffle
  } else {
    return shuffle.slice(0, resLength)
  }
}

/**
 * @returns string unique string value
 */
export const createUUID = () => {
  return ([1e7] + '-1e3-4e3-8e3-1e11').replace(/[018]/g, (c) =>
    (
      parseInt(c) ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (parseInt(c) / 4)))
    ).toString(16)
  )
}
