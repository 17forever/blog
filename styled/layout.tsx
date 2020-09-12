import styled from 'styled-components'
import theme from '../utils/getTheme'
import { commonStyles, iconFontStyles, contentStyles } from './common'

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
  ${contentStyles};
  flex: 1;
  padding: 20px;
  overflow-y: auto;
  position: relative;
`

export const StyledLogoWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 71px;
`

export const Logo = styled.div`
  a {
    color: ${theme.palette.themePrimary};
    font-size: 17px;
    font-weight: 700;
    font-family: Monaco, Consolas, 'Courier New', '微软雅黑', monospace;
  }
`

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
