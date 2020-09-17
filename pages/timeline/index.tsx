import React, { useState, FC } from 'react'
import { getTimelineFileListWithHotWords } from '../../lib/getTimeline'
import dynamic from 'next/dynamic'
import cx from 'classnames'
import times from '../../utils/times'
import { isMobile } from '../../components/Responsive'
import styled from 'styled-components'
import Loading from '../../components/Loading'
import WordCloud from './WordCloud'
import { ITimeLineIndexProps, ITimelineIndexDropdownItem } from '../../types/timeline'
import { GetStaticProps } from 'next'

// Coachmark 无法在服务端渲染
const DateSelectDropdown = dynamic(() => import('./DateSelect'), {
  loading: () => <Loading label="传送器部署中" />,
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

const TimeLineIndex: FC<ITimeLineIndexProps> = (props) => {
  const { data } = props
  const [selectedItem, setSelectedItem] = useState<ITimelineIndexDropdownItem>()
  const handleChange = (value: ITimelineIndexDropdownItem): void => {
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
        <DateSelectDropdown data={data} onChange={handleChange} />
      </StyledBottom>
    </StyledLayout>
  )
}

export default TimeLineIndex

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      data: getTimelineFileListWithHotWords(),
    },
  }
}
