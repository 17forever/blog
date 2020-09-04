import React from 'react'
import PropTypes from 'prop-types'
import { getPostsFileIdList, getPostData } from '../../lib/getPosts'
import Layout from './layout'
import styled from 'styled-components'
import theme from '../../utils/getTheme'
import Markdown from '../../components/Markdown'

const StyledContent = styled.div`
  padding: 30px;
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

export default function PostInfo(props) {
  const {
    name,
    data: { body, ...restProps },
  } = props
  return (
    <Layout current={name}>
      <StyledContent>
        <StyledInfo>
          {Object.keys({ ...restProps }).map((key) => (
            <StyledInfoItem key={key}>{restProps[key]}</StyledInfoItem>
          ))}
        </StyledInfo>
        <StyledBody>
          <Markdown data={body} />
        </StyledBody>
      </StyledContent>
    </Layout>
  )
}

PostInfo.propTypes = {}

export async function getStaticProps({ params }) {
  const data = getPostData(params.id)
  return {
    props: {
      ...data,
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
