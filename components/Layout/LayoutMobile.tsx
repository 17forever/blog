import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {
  StyledPanel,
  StyledMenuToggle,
  StyledMobileLayout,
  StyledMobileTopBanner,
  StyledMobileContent,
  StyledMobileFooter,
} from '../../styled/mobile'
import { PanelType } from '@fluentui/react'
import { LeftComponent } from './LayoutDefault'
import { useRouter } from 'next/router'
import BackTop, { BackTopAnchor } from '../BackTop'

// @ts-ignore
export default function Layout(props) {
  const { children } = props
  const [panelVisible, setPanelVisible] = useState(false)
  const togglePanelVisible = () => {
    setPanelVisible(!panelVisible)
  }

  const router = useRouter()
  const hideTopBannerBorder = ['/timeline'].includes(router.pathname)
  return (
    <StyledMobileLayout>
      <BackTopAnchor />
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
      <StyledMobileTopBanner hideBorder={hideTopBannerBorder}>
        <StyledMenuToggle
          iconProps={{
            iconName: 'CollapseMenu',
          }}
          title="打开导航"
          ariaLabel="打开导航"
          onClick={togglePanelVisible}
        />
      </StyledMobileTopBanner>
      <StyledMobileContent>{children}</StyledMobileContent>
      <StyledMobileFooter />
      <BackTop />
    </StyledMobileLayout>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}
