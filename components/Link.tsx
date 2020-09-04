import Link from 'next/link'
import styled from 'styled-components'
import { getTheme } from '@fluentui/react'

const theme = getTheme()

const StyledLink = styled.span`
  a {
    text-decoration: none;
    color: ${theme.palette.themePrimary};
    &:hover {
      text-decoration: underline;
    }
  }
`

const CustomLink = (props): JSX.Element => {
  return (
    <StyledLink>
      <Link {...props} />
    </StyledLink>
  )
}

export default CustomLink
