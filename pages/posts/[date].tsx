import React from 'react'
import PropTypes from 'prop-types'
import { getPostsDateList, getPostsDateFileList } from '../../lib/getPosts'
import Layout from './layout'
import styled from 'styled-components'
import Link from '../../components/Link'

const StyledList = styled.ul`
  li {
    margin: 10px 0;
  }
`

export default function PostsDate(props) {
  const { date, data } = props
  return (
    <Layout>
      <StyledList>
        {data.map((item: string): JSX.Element => (
          <li key={item}>
            <Link href={`/posts/${date}/${item}`}>{item}</Link>
          </li>
        ))}
      </StyledList>
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
