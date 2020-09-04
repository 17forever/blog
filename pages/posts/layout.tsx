// @ts-nocheck
import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Breadcrumb, IBreadcrumbItem, IDividerAsProps, Icon, TooltipHost } from '@fluentui/react'
import { useRouter } from 'next/router'
import styled from 'styled-components'

const StyledContent = styled.div``
const StyledLayout = styled.div``
const StyledBreadcrumb = styled(Breadcrumb)`
  h4 {
    margin: 0;
  }
  .ms-Breadcrumb-list {
    display: flex;
    align-items: center;
  }
`

const getBreadcrumbItemDivider = (dividerProps: IDividerAsProps): JSX.Element => {
  return (
    <span aria-hidden="true" style={{ padding: 5 }}>
      /
    </span>
  )
}

const getCustomOverflowIcon = (): JSX.Element => {
  return <Icon iconName="ChevronDown" />
}

export default function PostsLayout(props) {
  const { children } = props
  const [data, setData] = useState([])

  const router = useRouter()
  useEffect(() => {
    const path = router.asPath
    const pathSplit = path.split('/')
    const pathData = pathSplit.slice(2).map((path) => ({
      text: path,
      key: path,
    }))
    // 设置可跳转处的点击事件
    if (pathData.length > 1) {
      pathData.slice(0, -1).forEach((item) => {
        item.onClick = onBreadcrumbItemClick
      })
    }
    // 设置当前页的属性
    pathData.slice(-1)[0].isCurrentItem = true
    pathData.slice(-1)[0].as = 'h4'
    // 设置posts首页
    pathData.unshift({
      text: <span title="文章首页">{'<'}</span>,
      key: '/posts',
      onClick: () => {
        router.push('/posts')
      },
    })

    setData(pathData)
  }, [])

  const onBreadcrumbItemClick = (ev: React.MouseEvent<HTMLElement>, item: IBreadcrumbItem): void => {
    router.push(`/posts/${item!.key}`)
  }
  return (
    <StyledLayout>
      <StyledBreadcrumb
        items={data}
        maxDisplayedItems={3}
        ariaLabel="页面导航"
        dividerAs={getBreadcrumbItemDivider}
        onRenderOverflowIcon={getCustomOverflowIcon}
        overflowAriaLabel="更多链接"
      />
      <StyledContent>
        {children}
      </StyledContent>
    </StyledLayout>
  )
}

PostsLayout.propTypes = {}
