import React, { useState, useEffect, useMemo } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import IconFont from './IconFont'
import { useRouter } from 'next/router'
import { isMobile as checkIsMobile } from './Responsive'
import cx from 'classnames'
import theme from '../utils/getTheme'

const StyledBackTop = styled.div`
  position: fixed;
  z-index: 2;
  right: 5%;
  bottom: 10%;
  cursor: pointer;
  width: 25px;
  height: 25px;
  svg {
    width: 100%;
    height: 100%;
  }
  &.isMobile {
    bottom: 7%;
    /* pc chrome color属性生效，移动要使用fill */
    svg {
      fill: ${theme.palette.neutralQuaternary};
    }
  }
`

const StyledAnchor = styled.div`
  position: absolute;
  top: 0;
`

export const BackTopAnchor = () => {
  return <StyledAnchor className="hide-v h0 w0 back_top_anchor" />
}

export default function Backtop() {
  const [visible, setVisible] = useState(false)
  const router = useRouter()

  const [backTopAnchor, setBackTopAnchor] = useState(null)
  // const [scrollNode, setScrollNode] = useState(null)
  const [isMobile, setIsMobile] = useState(checkIsMobile())

  const getNode = (mobile) => {
    let backTopAnchor = null
    let scrollNode = null
    if (typeof document !== 'undefined') {
      if (mobile) {
        backTopAnchor = Array.from(document?.getElementsByClassName?.('back_top_anchor'))?.[0]
      } else {
        backTopAnchor = Array.from(document?.getElementsByClassName?.('back_top_anchor')).slice(-1)?.[0]
      }
      if (backTopAnchor) {
        scrollNode = backTopAnchor.parentNode
      } else {
        scrollNode = document.getElementById('__next')
      }
    }
    setBackTopAnchor(backTopAnchor)
    return scrollNode
  }

  const addEvent = (node) => {
    return node.addEventListener('scroll', () => handleScrollEvent(node))
  }
  const removeEvent = (node) => {
    return node.removeEventListener('scroll', () => handleScrollEvent(node))
  }

  useEffect(() => {
    setIsMobile(window?.screen?.availWidth <= 767 || false)
  }, [])

  useEffect(() => {
    const scrollNode = getNode(isMobile)
    // TODO 进入二级页面后当前位置处于页中
    // 但是手动回到顶部会使记忆位置失效
    // scrollNode?.scrollTo(0, 0)
    const scrollEvent = addEvent(scrollNode)
    return () => {
      scrollEvent && removeEvent(scrollNode)
    }
  }, [router, isMobile])

  const handleScrollEvent = (node) => {
    const scrollTop = node?.scrollTop || 0
    if (scrollTop > 700) {
      setVisible(true)
    } else {
      setVisible(false)
    }
  }

  const handleTopTop = () => {
    // window.scrollTo(0, 0)
    backTopAnchor?.scrollIntoView?.({
      behavior: 'smooth',
    })
  }
  return visible ? (
    <StyledBackTop
      onClick={handleTopTop}
      title="回到顶部"
      className={cx({
        center: true,
        isMobile,
      })}
    >
      <IconFont icon="icon-icon" />
    </StyledBackTop>
  ) : null
}

Backtop.propTypes = {}
