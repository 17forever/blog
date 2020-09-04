// @ts-nocheck
import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { getPostsFileList } from '../../lib/getPosts'
import RouteLink from 'next/link'
import {
  GroupedList,
  IGroup,
  IGroupHeaderProps,
  IGroupFooterProps,
  Link,
  getTheme,
  mergeStyleSets,
  IRawStyle,
} from '@fluentui/react'
import styled from 'styled-components'

const theme = getTheme()
const headerStyles: IRawStyle = {
  minWidth: 300,
  minHeight: 40,
  lineHeight: 40,
  paddingLeft: 16,
}
const titleStyles: IRawStyle = {}
const toggleStyles: IRawStyle = {
  marginLeft: 10,
  color: theme.palette.neutralTertiary,
}
const classNames = mergeStyleSets({
  header: [headerStyles],
  title: [titleStyles, theme.fonts.mediumPlus],
  toggle: [toggleStyles, theme.fonts.small],
  name: {
    paddingLeft: 32,
    fontSize: 14,
  },
})

const StyledGroupedList = styled(GroupedList)`
  .ms-List-page {
    .ms-List-cell {
      min-height: 30px;
    }
  }
`

const StyledHeaderTitle = styled.span`
  a {
    text-decoration: none;
    font-size: 16px;
    color: ${theme.palette.neutralSecondary};
    &:hover {
      text-decoration: underline;
    }
  }
`
const StyledListName = styled.span`
  a {
    text-decoration: none;
    color: ${theme.palette.themePrimary};
  }
`

const onRenderHeader = (props) => {
  if (props) {
    const { group } = props
    const toggleCollapse = (): void => {
      props.onToggleCollapse!(group!)
    }
    return (
      <div className={classNames.header}>
        <StyledHeaderTitle>
          <RouteLink href={`/posts/${group!.name}`}>{group!.name}</RouteLink>
        </StyledHeaderTitle>
        <Link onClick={toggleCollapse} className={classNames.toggle}>
          {group!.isCollapsed ? '展开' : '收起'}
        </Link>
      </div>
    )
  }

  return null
}

const onRenderCell = (nestingDepth?: number, item?: any, itemIndex?: number): React.ReactNode => {
  return item ? (
    <div role="row" data-selection-index={itemIndex}>
      <StyledListName role="cell" className={classNames.name}>
        <RouteLink href='/posts/[...id]' as={`/posts/${item!.date}/${item!.path}`}>{item!.name}</RouteLink>
      </StyledListName>
    </div>
  ) : null
}

const groupedListProps = {
  onRenderHeader,
}

export const PostsIndex: React.FunctionComponent = (props) => {
  const { files } = props
  let data = []
  const groups = files.map((file) => {
    const { date, list } = file
    data = [...data, ...list]
    return {
      count: list.length,
      key: date,
      name: date,
      startIndex: data.length - list.length,
    }
  })
  return <StyledGroupedList items={data} onRenderCell={onRenderCell} groupProps={groupedListProps} groups={groups} />
}

export default PostsIndex

export async function getStaticProps() {
  return {
    props: {
      files: getPostsFileList(),
    },
  }
}
