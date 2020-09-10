import React from 'react'
import PropTypes from 'prop-types'
import {
  StyledLayout,
  StyledLayoutLeft,
  StyledLayoutRight,
  Logo,
  LeftTop,
  LeftBottom,
  StyledLogoWrap,
  Divider,
} from '../../styled/layout'
import Menu from './Menu'
import { Link } from '@fluentui/react'
import { basePath } from '../../next.config'

const LeftComponent = () => {
  return (
    <>
      <LeftTop>
        <StyledLogoWrap>
          <Logo>
            <Link href={`${basePath || '/'}`}>17 Forever</Link>
          </Logo>
        </StyledLogoWrap>
        <Divider />
        <Menu />
      </LeftTop>
      <LeftBottom>
        <Link href="https://github.com/7inFen/blog/actions" target="_blank">
          <img src="https://github.com/7inFen/blog/workflows/CI/badge.svg" />
        </Link>
      </LeftBottom>
    </>
  )
}

// @ts-ignore
export default function Layout(props) {
  const { children } = props
  return (
    <StyledLayout>
      <StyledLayoutLeft>
        <LeftComponent />
      </StyledLayoutLeft>
      <StyledLayoutRight>{children}</StyledLayoutRight>
    </StyledLayout>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}
