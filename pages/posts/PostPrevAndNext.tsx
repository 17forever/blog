import React from 'react'
import PropTypes from 'prop-types'
import Link from '../../components/Link'
import styled from 'styled-components'
import theme from '../../utils/getTheme'

const StyledPrevAndNext = styled.div`
  margin: 40px 0 50px;
  padding-top: 20px;
  font-size: 14px;
  border-top: 1px solid #eee;
`
const StyledItem = styled.div`
  display: flex;
  align-items: flex-start;
  line-height: 1.6;
  &:first-child {
    margin-bottom: 7px;
  }
  .label {
    font-weight: bold;
    width: 60px;
    flex: none;
  }
  .value {
    display: flex;
    align-items: center;
  }
`
const StyledNone = styled.span`
  color: ${theme.palette.neutralTertiary};
`

const ValueNone = () => <StyledNone>没有了</StyledNone>

export default function PostPrevAndNext(props) {
  const { currentPath = '', allPosts = [] } = props
  const { prev, next } =
    allPosts
      .map((item) =>
        (item?.list || []).map((post) => ({
          ...post,
          combinePath: `${post?.groupDate}/${post?.path}`,
        })),
      )
      .flat(Infinity)
      .reduce((prev, next, idx, list) => {
        prev[next?.combinePath] = {
          ...next,
          prev: list[idx - 1] || null,
          next: list[idx + 1] || null,
        }
        return prev
      }, {})?.[currentPath] || {}
  return (
    <StyledPrevAndNext>
      <StyledItem>
        <div className="label">上一篇：</div>
        <div className="value">
          {prev ? <Link href={`/posts/${prev.groupDate}/${prev.path}`}>{prev.name}</Link> : <ValueNone />}
        </div>
      </StyledItem>
      <StyledItem>
        <div className="label">下一篇：</div>
        <div className="value">
          {next ? (
            <Link disabled={true} href={`/posts/${next.groupDate}/${next.path}`}>
              {next.name}
            </Link>
          ) : (
            <ValueNone />
          )}
        </div>
      </StyledItem>
    </StyledPrevAndNext>
  )
}

PostPrevAndNext.propspropTypes = {}
