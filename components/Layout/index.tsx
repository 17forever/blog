import React from 'react'
import PropTypes from 'prop-types'
import { StyledLayout, StyledLayoutLeft, StyledLayoutRight, Logo, LeftTop, LeftBottom, StyledLogoWrap, Divider } from '../../styled/layout'
import Menu from './Menu'
import { Link, Text } from '@fluentui/react'

// @ts-ignore
export default function Layout(props) {
  const { children } = props
  return (
    <StyledLayout>
      <StyledLayoutLeft>
        <LeftTop>
          <StyledLogoWrap>
            <Logo>
              <Link href='https://github.com/7inFen' target='_blank'>
                7inFen
            </Link>
              <Text style={{ padding: '0 2px' }}>/</Text>
              <Link href='https://github.com/7inFen/blog' target='_blank' style={{ fontSize: 20 }}>
                Blog
            </Link>
            </Logo>
          </StyledLogoWrap>
          <Divider />
          <Menu />
        </LeftTop>
        <LeftBottom>
          <Link href='https://github.com/7inFen/blog/actions' target='_blank'>
            <img src='https://github.com/7inFen/blog/workflows/CI/badge.svg' />
          </Link>
        </LeftBottom>
      </StyledLayoutLeft>
      <StyledLayoutRight>
        {children}
      </StyledLayoutRight>
    </StyledLayout>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}
