// @ts-nocheck
import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { getTimelineFileListWithHotWords } from '../../lib/getTimeline'
import TagCloud from 'react-tag-cloud'
import styled from 'styled-components'
import WordCloud from './WordCloud'
import times from '../../utils/times'
import dynamic from 'next/dynamic'
import GearLoading from '../../components/Loading/timeline_gear'
import { Spinner, SpinnerSize } from '@fluentui/react'
import { isMobile } from '../../components/Responsive'
import cx from 'classnames'

// Coachmark 无法在服务端渲染
const Dropdown = dynamic(() => import('./DateSelect'), {
  loading: () => (
    <StyledGearLoading>
      <GearLoading />
      传送器部署中
    </StyledGearLoading>
    // <Spinner label="传送器部署中" size={SpinnerSize.large}  />
  ),
})

const StyledLayout = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  &.mobile {
    height: calc(100vh - 101px);
  }
`

const StyledTitle = styled.h2`
  font-size: ${times.myAge}px;
  letter-spacing: 7px;
  font-family: fangsong, serif, system-ui;
`
const StyledTop = styled.div`
  flex: 3;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  width: calc(100% - 60px);
`
const StyledBottom = styled.div`
  flex: 4;
  display: flex;
  padding: 20px;
  width: calc(100% - 60px);
  justify-content: center;
  align-items: flex-start;
`
const StyledGearLoading = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  color: grey;
  svg {
    margin-bottom: 5px;
  }
`

export default function TimeLineIndex(props) {
  const { data } = props
  const [selectedItem, setSelectedItem] = useState()

  const handleChange = (value) => {
    setSelectedItem(value)
  }

  const mobile = isMobile()

  return (
    <StyledLayout
      className={cx({
        mobile,
      })}
    >
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
