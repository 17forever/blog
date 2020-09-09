import React, { useState, useEffect } from 'react'
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
  StyledPanel,
  StyledMenuToggle,
} from '../../styled/layout'
import Menu from './Menu'
import { Link, PanelType } from '@fluentui/react'
import { basePath } from '../../next.config'
import Default, { Mobile } from '../Responsive'

const LeftComponent = () => {
  return (
    <>
      <LeftTop>
        <StyledLogoWrap>
          <Logo>
            <Link href={`${basePath || '/'}`} style={{ fontSize: 20 }}>
              17 Forever
            </Link>
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
  const [panelVisible, setPanelVisible] = useState(false)
  const togglePanelVisible = () => {
    setPanelVisible(!panelVisible)
  }
  return (
    <StyledLayout>
      <Mobile>
        <StyledPanel
          isOpen={panelVisible}
          isLightDismiss
          customWidth="70vw"
          type={PanelType.customNear}
          onDismiss={togglePanelVisible}
          closeButtonAriaLabel="关闭"
        >
          <LeftComponent />
        </StyledPanel>
        <StyledMenuToggle
          primary
          iconProps={{
            iconName: 'CollapseMenu',
          }}
          title="打开导航"
          ariaLabel="打开导航"
          onClick={togglePanelVisible}
        />
      </Mobile>
      <Default>
        <StyledLayoutLeft>
          <LeftComponent />
        </StyledLayoutLeft>
      </Default>
      <StyledLayoutRight>{children}</StyledLayoutRight>
    </StyledLayout>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}
