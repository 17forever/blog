// @ts-nocheck
import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { getTimelineFileListWithHotWords } from '../../lib/getTimeline'
import TagCloud from 'react-tag-cloud'
import styled from 'styled-components'
import WordCloud from './WordCloud'
import times from '../../utils/times'
import dynamic from 'next/dynamic'

// Coachmark 无法在服务端渲染
const Dropdown = dynamic(
  () => {
    return import('./DateSelect')
  },
  { ssr: false },
)

const StyledLayout = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const StyledTitle = styled.h2`
  font-size: ${times.myAge}px;
  letter-spacing: 7px;
  font-family: fangsong, system-ui;
`
const StyledTop = styled.div`
  flex: 3;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  width: calc(100% - 40px);
`
const StyledBottom = styled.div`
  flex: 4;
  display: flex;
  padding: 20px;
  width: calc(100% - 40px);
  justify-content: center;
  align-items: flex-start;
`

export default function TimeLineIndex(props) {
  const { data } = props
  const [selectedItem, setSelectedItem] = useState()

  const handleChange = (value) => {
    setSelectedItem(value)
  }

  return (
    <StyledLayout>
      <StyledTop>
        {selectedItem ? <WordCloud data={selectedItem.words} /> : <StyledTitle>回到过去</StyledTitle>}
      </StyledTop>
      <StyledBottom>
        <Dropdown data={data} onChange={handleChange} />
      </StyledBottom>
    </StyledLayout>
  )
}

TimeLineIndex.propTypes = {}

export async function getStaticProps() {
  return {
    props: {
      data: getTimelineFileListWithHotWords(),
    },
  }
}
