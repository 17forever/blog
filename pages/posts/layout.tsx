// @ts-nocheck
import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import {
  Dropdown,
  DropdownMenuItemType,
  IDropdownStyles,
  IDropdownOption,
  Icon,
  DefaultButton,
  IContextualMenuProps,
  IContextualMenuItem,
} from '@fluentui/react'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import FixedTopLayout from '../../components/Layout/FixedTop'
import { isMobile as checkIsMobile } from '../../components/Responsive'
import theme from '../../utils/getTheme'
import IconFont from '../../components/IconFont'

const StyledBreadcrumb = styled.div`
  display: flex;
  align-items: center;
`

const StyledBreadcrumbItem = styled.div`
  display: flex;
  align-items: center;
  white-space: nowrap;
  /* mobile first */
  &:last-child {
    padding-left: 4px;
  }
  &:not(:last-child) {
    &:after {
      content: '/';
      padding: 0 5px;
      color: ${theme.palette.neutralSecondary};
    }
  }
  .ms-Dropdown-title {
    border: none;
    padding: 0 4px;
    font-size: 17px;
    color: ${theme.palette.neutralDark};
  }
  button {
    padding: 0 10px;
    border: none;
    font-size: 17px;
    color: ${theme.palette.neutralDark};
    min-width: unset;
    .ms-Button-flexContainer {
      .ms-Button-label {
        margin: 0;
        font-weight: normal;
      }
      & > i[data-icon-name='ChevronDown'] {
        display: none;
      }
    }
  }
  &.pc {
    &:last-child {
      padding-left: 10px;
    }
  }
`

const getPostIndexIcon = (): JSX.Element => {
  // return <Icon iconName="ChevronDown" />
  return <IconFont icon="icon-down" />
}

export default function PostsLayout(props) {
  const { children, current, data = [] } = props

  const getDropdownOptions = (data) => {
    const options = []
    data.forEach((dataItem) => {
      const { date, list = [] } = dataItem
      options.push({
        key: date,
        text: date,
        itemType: DropdownMenuItemType.Header,
      })
      list.forEach((listItem) => {
        const { name, path, groupDate } = listItem
        options.push({
          key: name,
          text: name,
          groupDate: groupDate || date,
          path,
        })
      })
    })
    return options
  }

  const router = useRouter()
  const handleChange = (e, option) => {
    const { groupDate, path } = option
    router.push(`/posts/${groupDate}/${path}`)
  }

  const mobileBreadcrumb = (
    <StyledBreadcrumb>
      {data.map((item, idx) => {
        const { name, list } = item
        return (
          <StyledBreadcrumbItem key={`${idx}`}>
            {list.length ? (
              <Dropdown
                placeholder={name || getPostIndexIcon()}
                options={getDropdownOptions(list)}
                selectedKey=""
                onChange={handleChange}
                onRenderCaretDown={() => null}
              />
            ) : (
              name
            )}
          </StyledBreadcrumbItem>
        )
      })}
    </StyledBreadcrumb>
  )

  const getMenuItems = (data) => {
    // console.log(data)
    if (data.length === 1) {
      const { date, list } = data[0]
      return list.map((listItem) => {
        const { name, path } = listItem
        return {
          key: name,
          text: name,
          onClick: () => {
            router.push(`/posts/${date}/${path}`)
          },
        }
      })
    } else {
      return data.map((dataItem) => {
        const { date, list } = dataItem
        return {
          key: date,
          text: `${date} (${list.length})`,
          split: true,
          onClick: () => {
            router.push(`/posts/${date}`)
          },
          subMenuProps: {
            items: list.map((listItem) => {
              const { name, path } = listItem
              return {
                key: name,
                text: name,
                onClick: () => {
                  router.push(`/posts/${date}/${path}`)
                },
              }
            }),
          },
        }
      })
    }
  }

  const defaultBreadcrumb = (
    <StyledBreadcrumb>
      {data.map((item, idx) => {
        const { name, list } = item
        return (
          <StyledBreadcrumbItem key={`${idx}`} className="pc">
            {list.length ? (
              <DefaultButton
                text={name || getPostIndexIcon()}
                menuProps={{
                  shouldFocusOnMount: true,
                  subMenuHoverDelay: 20,
                  items: getMenuItems(list),
                }}
              />
            ) : (
              name
            )}
          </StyledBreadcrumbItem>
        )
      })}
    </StyledBreadcrumb>
  )

  const isMobile = checkIsMobile()
  return <FixedTopLayout top={isMobile ? mobileBreadcrumb : defaultBreadcrumb}>{children}</FixedTopLayout>
}

PostsLayout.propTypes = {}
