import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { getPostsFileIdList, getPostData, getPostsFileList, getPostsDateFileList } from '../../lib/getPosts'
import Markdown from '../../components/Markdown'
import { MessageBar, MessageBarType } from '@fluentui/react'
import Layout from './layout'
import theme from '../../utils/getTheme'
import styled from 'styled-components'
import { isMobile as checkIsMobile } from '../../components/Responsive'
import PostPrevAndNext from './PostPrevAndNext'
import Helmet from '../../components/Helmet'
import Weather from '../../components/Weather'

const StyledContent = styled.div`
  padding: ${({ isMobile }) => (isMobile ? '20px' : '40px')};
`
const StyledInfo = styled.div`
  color: ${theme.palette.neutralTertiary};
  font-size: 13px;
  text-align: right;
`
const StyledBody = styled.article``

const StyledInfoItem = styled.span`
  margin-left: 10px;
`

const StyledMessageBar = styled(MessageBar)`
  max-width: 600px;
  margin-top: 20px;
  .ms-MessageBar-icon {
    display: flex;
    align-items: center;
    i {
      min-height: unset;
    }
  }
  .ms-MessageBar-dismissSingleLine {
    i {
      min-height: unset;
    }
  }
`

const OUTDATE_TEXT = '文中涉及的技术可能已经过时，甚至无法正常运行，请参考其官网最新文档。'
export default function PostInfo(props) {
  const {
    name,
    data: { body, outdate, weather = '', date, update, ...restProps },
    id = [],
    allPosts = [],
    datePosts = [],
  } = props
  const [showMessage, setShowMessage] = useState(outdate !== undefined)
  const isMobile = checkIsMobile()
  const groupDate = id[0]
  return (
    <Layout
      current={name}
      data={[
        {
          name: '',
          list: allPosts,
        },
        {
          name: groupDate,
          list: [
            {
              date: groupDate,
              list: datePosts,
            },
          ],
        },
        {
          name,
          list: [],
        },
      ]}
    >
      <Helmet title={name} />
      <StyledContent isMobile={isMobile}>
        <StyledInfo>
          <Weather>{weather}</Weather>
    <StyledInfoItem title={update ? `更新时间：${update}` : ''}>{date}{update && ' *'}</StyledInfoItem>
          {Object.keys({ ...restProps }).map((key) => (
            <StyledInfoItem key={key}>{restProps[key]}</StyledInfoItem>
          ))}
        </StyledInfo>
        {showMessage && (
          <StyledMessageBar
            messageBarType={MessageBarType.warning}
            isMultiline={isMobile}
            // truncated
            onDismiss={() => {
              setShowMessage(false)
            }}
            dismissButtonAriaLabel="关闭"
          >
            {outdate || OUTDATE_TEXT}
          </StyledMessageBar>
        )}
        <StyledBody>
          <Markdown data={body} />
        </StyledBody>
        <PostPrevAndNext currentPath={id.join('/')} allPosts={allPosts} />
      </StyledContent>
    </Layout>
  )
}

PostInfo.propTypes = {}

export async function getStaticProps({ params }) {
  const data = getPostData(params.id)
  const allPosts = getPostsFileList()
  const datePosts = getPostsDateFileList(params.id[0])
  return {
    props: {
      ...data,
      allPosts,
      datePosts,
    },
  }
}

export async function getStaticPaths() {
  const paths = getPostsFileIdList()
  return {
    paths,
    fallback: false,
  }
}
