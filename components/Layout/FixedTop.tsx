import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import cx from 'classnames'

const StyledLayout = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`
const StyledTop = styled.div`
  height: 50px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #eee;
`
const StyledBottom = styled.div`
  height: calc(100% - 50px);
  overflow: auto;
  &.center {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`
export default function FixedTop(props) {
  const { top, center, children } = props
  return (
    <StyledLayout>
      <StyledTop>{top}</StyledTop>
      <StyledBottom
        className={cx({
          center,
        })}
      >
        {children}
      </StyledBottom>
    </StyledLayout>
  )
}

FixedTop.propTypes = {}
