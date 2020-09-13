import React from 'react'
import { getTimelineFileList, getTimelineData } from '../../lib/getTimeline'
import styled from 'styled-components'
import theme from '../../utils/getTheme'
import Markdown from '../../components/Markdown'
import { differenceInDays, differenceInMonths, startOfMonth, endOfMonth } from 'date-fns'
import FixedTopLayout from '../../components/Layout/FixedTop'
import DateSelectInInfoPage from './DateSelectInInfoPage'
import { isMobile as cheeckIsMobile } from '../../components/Responsive'
import cx from 'classnames'

const LEFT_WIDTH = 170
const LEFT_WIDTH_MOBILE = 100
const DAY_SIZE = 20

const StyledBlockWrap = styled.div`
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
const StyledLineEndIndicatorCircle = styled.div`
  width: 7px;
  height: 7px;
  border-radius: 50%;
  position: absolute;
  left: ${({ isMobile }) => (isMobile ? LEFT_WIDTH_MOBILE - 4 : LEFT_WIDTH - 4)}px;
  top: -8px;
  border: 1px solid ${theme.palette.neutralQuaternary};
  /* background: ${theme.palette.neutralQuaternary}; */
`

const StyledLineEndIndicatorArrow = styled.div`
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

const StyledItemBlock = styled.div`
  display: flex;
  line-height: 1.6;
  padding-top: ${({ size }) => size * DAY_SIZE}px;
`
const StyledItemLeft = styled.div`
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
    margin-top: 2px;
    padding-right: 10px;
    white-space: nowrap;
    span {
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

const StyledMbOfStartMonth = styled.div`
  height: ${({ size }) => size * DAY_SIZE}px;
`

interface IProps {
  paths: string
  data: any[]
  id: string
}

const populateData = (data, date: string) => {
  const START_OF_MONTH = startOfMonth(new Date(date))
  const END_OF_MONTH = endOfMonth(new Date(date))
  const dataList: [] = data.map((item, idx) => {
    const itemDate = new Date(item!.date)
    return {
      ...item,
      // isEndOfMonth: differenceInDays(END_OF_MONTH, itemDate) === 0,
      intervalDaysOfPrevOrEnd:
        idx === 0
          ? // ? differenceInDays(END_OF_MONTH, itemDate)
            0
          : differenceInDays(new Date(data[idx - 1]!.date), itemDate) - 1,
    }
  })
  return [dataList, differenceInDays(new Date(dataList.slice(-1)[0].date), START_OF_MONTH)]
}

export default function Timeline(props: IProps) {
  const { data, id, date } = props
  const [dataList, fromStartOfMonth] = populateData(data, id)

  const dataMonthIsBeforeMonth = differenceInMonths(new Date(), new Date(id)) > 0

  const isMobile = cheeckIsMobile()

  return (
    <FixedTopLayout top={<DateSelectInInfoPage data={date} value={id} isMobile={isMobile} />}>
      <StyledBlockWrap isMobile={isMobile}>
        {dataMonthIsBeforeMonth ? (
          <StyledLineEndIndicatorCircle isMobile={isMobile} />
        ) : (
          <StyledLineEndIndicatorArrow isMobile={isMobile} />
        )}
        {dataList.map((item, idx) => {
          const { date, body, intervalDaysOfPrevOrEnd, ...rest } = item
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

interface IParams {
  params: {
    id: string
  }
}

export async function getStaticProps({ params }: IParams) {
  const data = getTimelineData(params.id)
  const date = getTimelineFileList().map((item) => item.params.id)
  return {
    props: {
      ...data,
      date,
    },
  }
}

export async function getStaticPaths() {
  const paths = getTimelineFileList()
  return {
    paths,
    fallback: false,
  }
}
