import theme from '../utils/getTheme'

export const iconFontStyles = `
  .iconfont {
      width: 1em; height: 1em;
      vertical-align: -0.15em;
      fill: currentColor;
      overflow: hidden;
  }
`

export const commonStyles = `
  .center {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .full {
    width: 100%;
    height: 100%;
    flex: 1;
  }
  .hide {
    display: none;
  }
  .hide-v {
    visibility: hidden;
    &.h0 {
      height: 0;
    }
    &.w0 {
      width: 0;
    }
  }
`

export const contentStyles = `
  a {
    text-decoration: none;
    color: ${theme.palette.themePrimary};
    &:hover {
      text-decoration: underline;
    }
    &:visited {
      // color: ${theme.palette.neutralTertiary};
      color: ${theme.palette.neutralPrimary};
    }
  }
`
