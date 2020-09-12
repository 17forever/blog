import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import RouteLink from 'next/link'
import theme from '../../utils/getTheme'
import { isMobile } from '../../components/Responsive'

const GroupItem = styled.div`
  display: flex;
  &:not(:last-child) {
    margin-bottom: 30px;
  }
`
const GroupName = styled.div`
  font-size: 13px;
  margin-top: 3px;
  white-space: nowrap;
  a,
  span {
    color: ${theme.palette.neutralTertiary};
    position: sticky;
    top: -20px;
  }
`
const GroupValue = styled.ul`
  list-style-type: none;
  margin: 0;
  a {
    font-size: 14px;
  }
  li:not(:last-child) {
    margin-bottom: 10px;
  }
`

export default function GroupList(props) {
  const { groups = [], items = [], labelLink = true } = props
  return groups.map((group) => {
    const { key, name, count, startIndex } = group
    const list = items.slice(startIndex, startIndex + count)
    return (
      <GroupItem key={key}>
        <GroupName>{labelLink ? <RouteLink href={`/posts/${name}`}>{name}</RouteLink> : <span>{name}</span>}</GroupName>
        <GroupValue>
          {list.map((item) => {
            const { name, path, groupDate } = item
            return (
              <li key={path}>
                <RouteLink href="/posts/[...id]" as={`/posts/${groupDate}/${path}`}>
                  {name}
                </RouteLink>
              </li>
            )
          })}
        </GroupValue>
      </GroupItem>
    )
  })
}

GroupList.propTypes = {}
