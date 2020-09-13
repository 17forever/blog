import Link from 'next/link'
import { Link as FluentLink } from '@fluentui/react'

const CustomLink = (props): JSX.Element => {
  const { children, disabled = false, ...rest } = props
  return (
    <FluentLink as="span" disabled={disabled}>
      <Link {...rest}>
        <a>{children}</a>
      </Link>
    </FluentLink>
  )
}

export default CustomLink
