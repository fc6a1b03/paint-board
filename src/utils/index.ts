/**
 * get random integer
 * @param min min range
 * @param max max range
 */
export const getRandomInt = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

/**
 * get random float
 * @param min min range
 * @param max max range
 */
export const getRandomFloat = (min: number, max: number) => {
  return Math.random() * (max - min) + min
}

/**
 * handle static file paths in the public folder
 * @param originUrl
 * @returns publicDir + originUrl
 */
export const formatPublicUrl = (originUrl: string) => {
  if (originUrl && typeof originUrl === 'string') {
    return `${import.meta.env.BASE_URL}${originUrl}`
  }
  return ''
}

/**
 * get the distance between two points
 * @param start
 * @param end
 * @returns distance
 */
export const getDistance = (start: fabric.Point, end: fabric.Point) => {
  return Math.sqrt(Math.pow(start.x - end.x, 2) + Math.pow(start.y - end.y, 2))
}

/**
 * is it mobile
 */
export const isMobile = () => {
  return /phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone|Mobi|Android|iPhone|iPad/i.test(
    navigator.userAgent
  )
}
