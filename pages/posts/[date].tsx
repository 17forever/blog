import React from 'react'
import PropTypes from 'prop-types'
import { getPostsDateList, getPostsDateFileList } from '../../lib/getPosts'
import Layout from './layout'
import styled from 'styled-components'
import GroupList from './GroupList'
import { format } from 'date-fns'
import { isMobile } from '../../components/Responsive'

const StyledContent = styled.div`
  padding: ${({ isMobile }) => (isMobile ? '20px' : '40px 50px')};
`

export default function PostsDate(props) {
  const { date, data } = props
  const dateMap = {}
  const dataList = data.map((item) => ({
    ...item,
    groupDate: date,
  }))
  dataList.forEach((item, idx) => {
    const itemDate = format(new Date(item.date || date), 'MM-dd')
    const itemData = dateMap[itemDate] || {}
    dateMap[itemDate] = {
      startIndex: itemData.startIndex ?? idx,
      list: (itemData?.list || []).concat(item),
    }
  })
  const groups = Object.keys(dateMap).map((date) => ({
    count: dateMap[date]?.list?.length || 0,
    key: date,
    name: date,
    startIndex: dateMap[date]?.startIndex,
  }))

  return (
    <Layout>
      <StyledContent isMobile={isMobile()}>
        <GroupList items={dataList} groups={groups} labelLink={false} />
      </StyledContent>
    </Layout>
  )
}

PostsDate.propTypes = {}

export async function getStaticProps({ params }) {
  const date = params.date
  const data = getPostsDateFileList(date)
  return {
    props: {
      date,
      data,
    },
  }
}

export async function getStaticPaths() {
  const paths = getPostsDateList()
  return {
    paths,
    fallback: false,
  }
}
