// @ts-nocheck
import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import TagCloud from 'react-tag-cloud'
import styled from 'styled-components'

const StyledLayout = styled.div`
  width: 100%;
  height: 100%;
`

const StyledTitle = styled.h2``
export default function TimeLineWordCloud(props) {
  const { data } = props

  return (
    <TagCloud
      style={{
        width: '100%',
        height: '100%',
      }}
    >
      {data.map((i) => (
        <div key={i}>{i}</div>
      ))}
    </TagCloud>
  )
}
