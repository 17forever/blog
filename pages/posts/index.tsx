// @ts-nocheck
import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { getPostsFileList } from '../../lib/getPosts'
import styled from 'styled-components'
import GroupList from './GroupList'
import { isMobile } from '../../components/Responsive'

const StyledLayout = styled.div`
  padding: ${({ isMobile }) => (isMobile ? '20px' : '0 0 0 40px')};
`

export const PostsIndex: React.FunctionComponent = (props) => {
  const { files } = props
  let data = []
  // const groups = files.concat(...[files], ...[files]).map((file) => {
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
  return (
    <StyledLayout isMobile={isMobile()}>
      <GroupList items={data} groups={groups} />
    </StyledLayout>
  )
}

export default PostsIndex

export async function getStaticProps() {
  return {
    props: {
      files: getPostsFileList(),
    },
  }
}
