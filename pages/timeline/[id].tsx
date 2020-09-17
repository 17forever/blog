import React from 'react'
import { getTimelineFileList, getTimelineData } from '../../lib/getTimeline'
import { sortByDate } from '../../lib/common'
import styled from 'styled-components'
import theme from '../../utils/getTheme'
import Markdown from '../../components/Markdown'
import { differenceInDays, differenceInMonths, startOfMonth } from 'date-fns'
import FixedTopLayout from '../../components/Layout/FixedTop'
import DateSelectInInfoPage from './DateSelectInInfoPage'
import { isMobile as checkIsMobile } from '../../components/Responsive'
import Weather from '../../components/Weather'
import { GetStaticProps, GetStaticPaths } from 'next'

interface ITimelineInfoItem {
  body: string
  date: string
  mood?: string
  weather?: string
}

interface ITimelineInfoItemWithIntervalDaysItem extends ITimelineInfoItem {
  intervalDaysOfPrevOrEnd: number
}

interface IProps {
  data: ITimelineInfoItem[]
  id: string
  date: string
}

const LEFT_WIDTH = 170
const LEFT_WIDTH_MOBILE = 100
const DAY_SIZE = 20

const StyledBlockWrap = styled.div<{ isMobile: boolean }>`
  margin: ${({ isMobile }) => (isMobile ? '30px 20px 40px 10px' : '50px')};
  position: relative;
  &:before {
    content: '';
    display: block;
    width: 1px;
    height: 100%;
    background: ${theme.palette.neutralQuaternary};
    position: absolute;
    left: ${({ isMobile }) => (isMobile ? LEFT_WIDTH_MOBILE : LEFT_WIDTH)}px;
  }
  &:after {
    content: '';
    display: block;
    width: 10px;
    height: 1px;
    background: ${theme.palette.neutralQuaternary};
    position: absolute;
    left: ${({ isMobile }) => (isMobile ? LEFT_WIDTH_MOBILE - 5 : LEFT_WIDTH - 5)}px;
    bottom: 0;
  }
`
const StyledLineEndIndicatorCircle = styled.div<{ isMobile: boolean }>`
  width: 7px;
  height: 7px;
  border-radius: 50%;
  position: absolute;
  left: ${({ isMobile }) => (isMobile ? LEFT_WIDTH_MOBILE - 4 : LEFT_WIDTH - 4)}px;
  top: -8px;
  border: 1px solid ${theme.palette.neutralQuaternary};
  /* background: ${theme.palette.neutralQuaternary}; */
`

const StyledLineEndIndicatorArrow = styled.div<{ isMobile: boolean }>`
  width: 7px;
  height: 7px;
  border: 1px solid ${theme.palette.neutralQuaternary};
  border-right-color: transparent;
  border-bottom-color: transparent;
  transform: rotate(45deg);
  position: absolute;
  left: ${({ isMobile }) => (isMobile ? LEFT_WIDTH_MOBILE - 4 : LEFT_WIDTH - 4)}px;
  top: 1px;
`

const StyledItemBlock = styled.div<{ size: number; isMobile: boolean }>`
  display: flex;
  line-height: 1.6;
  padding-top: ${({ size }) => size * DAY_SIZE}px;
`
const StyledItemLeft = styled.div<{ isMobile: boolean }>`
  width: ${({ isMobile }) => (isMobile ? LEFT_WIDTH_MOBILE : LEFT_WIDTH)}px;
  flex: none;
  text-align: right;
  font-size: 13px;
  .top {
    color: ${theme.palette.neutralSecondary};
    border-bottom: 1px solid ${theme.palette.neutralQuaternary};
    padding-right: 10px;
    padding-bottom: 2px;
    white-space: nowrap;
  }
  .bottom {
    font-size: 12px;
    color: ${theme.palette.neutralTertiary};
    margin-top: 4px;
    padding-right: 10px;
    white-space: nowrap;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    span:not(.weather) {
      margin-left: 10px;
    }
  }
`
const StyledItemRight = styled.div`
  margin-left: 20px;
  font-size: 14px;
  #_markdown {
    & > :first-child {
      margin-top: 21px;
      padding-top: 0;
    }
    & > * {
      text-indent: 0;
    }
  }
`

const StyledMbOfStartMonth = styled.div<{ size: number }>`
  height: ${({ size }) => size * DAY_SIZE}px;
`

const populateData = (data: ITimelineInfoItem[], date: string): [ITimelineInfoItemWithIntervalDaysItem[], number] => {
  const START_OF_MONTH = startOfMonth(new Date(date))
  const dataList: ITimelineInfoItemWithIntervalDaysItem[] = data.map((item, idx) => {
    const itemDate = new Date(item.date)
    return {
      ...item,
      intervalDaysOfPrevOrEnd: idx === 0 ? 0 : differenceInDays(new Date(data[idx - 1].date), itemDate) - 1,
    }
  })
  return [dataList, differenceInDays(new Date(dataList.slice(-1)[0].date), START_OF_MONTH)]
}

const TimelineInfo: React.FC<IProps> = (props) => {
  const { data, id, date } = props
  const [dataList, fromStartOfMonth] = populateData(data, id)

  const dataMonthIsBeforeMonth = differenceInMonths(new Date(), new Date(id)) > 0

  const isMobile = checkIsMobile()
  return (
    <FixedTopLayout top={<DateSelectInInfoPage data={date} value={id} />}>
      <StyledBlockWrap isMobile={isMobile}>
        {dataMonthIsBeforeMonth ? (
          <StyledLineEndIndicatorCircle isMobile={isMobile} />
        ) : (
          <StyledLineEndIndicatorArrow isMobile={isMobile} />
        )}
        {dataList.map((item, idx) => {
          const { date, body, intervalDaysOfPrevOrEnd, weather = '', ...rest } = item
          return (
            <StyledItemBlock
              key={`${date} || ${idx}`}
              size={idx === 0 ? 2 : intervalDaysOfPrevOrEnd || 1}
              isMobile={isMobile}
            >
              <StyledItemLeft isMobile={isMobile}>
                <div>
                  <span className="top">{date}</span>
                  <div className="bottom">
                    <Weather>{weather}</Weather>
                    {Object.keys({ ...rest }).map((key) => (
                      <span key={key}>{rest[key]}</span>
                    ))}
                  </div>
                </div>
              </StyledItemLeft>
              <StyledItemRight>
                <Markdown data={body} />
              </StyledItemRight>
            </StyledItemBlock>
          )
        })}
        <StyledMbOfStartMonth size={fromStartOfMonth} />
      </StyledBlockWrap>
    </FixedTopLayout>
  )
}

export default TimelineInfo

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const data = getTimelineData(params.id)
  const date = sortByDate(getTimelineFileList().map((item) => item.params.id))
  return {
    props: {
      ...data,
      date,
    },
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getTimelineFileList()
  return {
    paths,
    fallback: false,
  }
}
