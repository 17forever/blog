import React, { useState, useEffect } from 'react'
import { useMediaQuery, Context as ResponsiveContext } from 'react-responsive'

export const Desktop = ({ children }) => {
  const isDesktop = useMediaQuery({ minWidth: 992 })
  return isDesktop ? children : null
}
export const Tablet = ({ children }) => {
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 })
  return isTablet ? children : null
}
export const Mobile = ({ children }) => {
  const isMobile = useMediaQuery({ maxWidth: 767 })
  return isMobile ? children : null
}
export default ({ children }) => {
  const isNotMobile = useMediaQuery({ minWidth: 768 })
  return isNotMobile ? children : null
}

export const isMobile = () => {
  const [result, setResult] = useState(false)
  useEffect(() => {
    setResult(window?.screen?.availWidth <= 767 || false)
  }, [])
  return result
}
