import React from 'react'
import PropTypes from 'prop-types'
import FixedTopLayout from '../../components/Layout/FixedTop'
import MopanSvg from './mopan'
import styled from 'styled-components'

const StyledWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: grey;
`

export default function TofuIndex() {
  return (
    <FixedTopLayout center>
      <StyledWrap>
        <MopanSvg />
        磨豆子中...
      </StyledWrap>
    </FixedTopLayout>
  )
}

TofuIndex.propTypes = {}
