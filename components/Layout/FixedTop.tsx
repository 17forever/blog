import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import cx from 'classnames'
import { isMobile } from '../Responsive'
import { BackTopAnchor } from '../BackTop'

const StyledLayout = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  &.mobile {
    min-height: calc(100vh - 101px);
  }
`
const StyledTop = styled.div`
  height: 50px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #eee;
  &.mobile {
    padding-left: 20px;
    position: sticky;
    top: 0;
    background: #fff;
    z-index: 2;
  }
  & > div {
    overflow-x: auto;
    overflow-y: hidden;
  }
`
const StyledBottom = styled.div`
  position: relative;
  height: calc(100% - 50px);
  overflow: auto;
  &.center {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  &.mobile {
    min-height: calc(100vh - 152px);
  }
`
export default function FixedTop(props) {
  const { top, center, children } = props
  const mobile = isMobile()
  return (
    <StyledLayout
      className={cx({
        mobile,
      })}
    >
      <StyledTop
        className={cx({
          mobile,
        })}
      >
        {top}
      </StyledTop>
      <StyledBottom
        className={cx({
          center,
          mobile,
        })}
      >
        <BackTopAnchor />
        {children}
      </StyledBottom>
    </StyledLayout>
  )
}

FixedTop.propTypes = {}
