import React from 'react'
import { useRouter } from 'next/router'
import { Nav, INavStyles, INavLinkGroup } from '@fluentui/react'
import { basePath } from '../../next.config'
import IconFont from '../IconFont'
import styled from 'styled-components'

const StyledMenuLabel = styled.div`
  padding-left: 20px;
  .iconfont {
    padding-right: 10px
  }
`

const MenuLabel = ({ name, icon }) => (
  <StyledMenuLabel title={name}>
    <IconFont icon={icon} />
    {name}
  </StyledMenuLabel>
)

const resolvePath = (path: string): string => `${basePath}${path}`

const navLinkGroups: INavLinkGroup[] = [
  {
    links: [
      // {
      //   name: 'Home',
      //   url: '/blog/',
      //   key: 'key0',
      //   isExpanded: true,
      // },
      {
        name: <MenuLabel name="时光轴" icon="icon-shiguangjix" />,
        url: resolvePath('/timeline'),
        key: 'timeline',
      },
      {
        name: <MenuLabel name="文章" icon="icon-wenzhang" />,
        url: resolvePath('/posts'),
        key: 'posts',
      },
      {
        name: <MenuLabel name="豆腐" icon="icon-doufu" />,
        url: resolvePath('/tofu'),
        key: 'tofu',
      },
    ],
  },
]

const navStyles: Partial<INavStyles> = {
  root: {
    overflowY: 'auto',
  },
}

const Menu: React.FunctionComponent = () => {
  const router = useRouter()
  const { asPath } = router
  return <Nav selectedKey={asPath.split('/')[1]} ariaLabel="网站导航" styles={navStyles} groups={navLinkGroups} />
}

Menu.propTypes = {}

export default Menu
