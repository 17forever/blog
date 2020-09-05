import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

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
`
export default function FixedTop(props) {
  const { top, children } = props
  return (
    <StyledLayout>
      <StyledTop>{top}</StyledTop>
      <StyledBottom>{children}</StyledBottom>
    </StyledLayout>
  )
}

FixedTop.propTypes = {}
