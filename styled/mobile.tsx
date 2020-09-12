import styled, { createGlobalStyle } from 'styled-components'
import { Panel, DefaultButton } from '@fluentui/react'
import theme from '../utils/getTheme'
import { iconFontStyles, commonStyles, contentStyles } from './common'

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
      nav {
        .ms-Nav-linkText {
          & > div {
            padding-left: 70px;
          }
        }
      }
    }
  }
`
export const StyledMenuToggle = styled(DefaultButton)`
  border: none;
  padding: 0;
  min-width: unset;
  margin-left: 20px;
  i {
    font-size: 17px;
  }
`

export const StyledMobileLayout = styled.div`
  ${commonStyles};
  height: 100vh;
  overflow: auto;
  position: relative;
`
export const StyledMobileTopBanner = styled.div`
  height: 50px;
  border-bottom: ${({ hideBorder }) =>
    hideBorder ? '1px solid transparent' : `1px solid ${theme.palette.neutralLight}`};
  display: flex;
  align-items: center;
`
export const StyledMobileContent = styled.div`
  ${contentStyles};
  min-height: calc(100% - 101px);
  display: flex;
  flex-direction: column;
`
export const StyledMobileFooter = styled.div`
  height: 50px;
`
