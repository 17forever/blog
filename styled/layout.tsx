import styled from 'styled-components'
import { Panel, DefaultButton } from '@fluentui/react'

const iconFontStyles = `
  .iconfont {
      width: 1em; height: 1em;
      vertical-align: -0.15em;
      fill: currentColor;
      overflow: hidden;
  }
`

const commonStyles = `
  .center {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .full {
    width: 100%;
    height: 100%;
  }
`

export const StyledLayout = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  ${iconFontStyles};
  ${commonStyles};
`
export const StyledLayoutLeft = styled.div`
  width: 200px;
  overflow-x: hidden;
  overflow-y: auto;
  border-right: 1px solid #eee;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

export const StyledLayoutRight = styled.div`
  flex: 1;
  padding: 20px;
`

export const StyledLogoWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 71px;
`

export const Logo = styled.div``

export const LeftTop = styled.div``
export const LeftBottom = styled.div`
  margin: 20px;
  text-align: center;
`

export const Divider = styled.div`
  width: 100%;
  height: 1px;
  background: #eee;
`

export const StyledPanel = styled(Panel)`
  ${iconFontStyles};
  .ms-Panel-scrollableContent {
    height: 100%;
    .ms-Panel-content {
      padding: 0;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
  }
`
export const StyledMenuToggle = styled(DefaultButton)`
  min-width: unset;
  width: 30px;
  height: 30px;
  position: fixed;
  z-index: 2;
  left: 30px;
  bottom: 50px;
`
