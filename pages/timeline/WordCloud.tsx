import React, { FC } from 'react'
import TagCloud from 'react-tag-cloud'
import styled from 'styled-components'
import theme from '../../utils/getTheme'
import { isMobile } from '../../components/Responsive'
import { IWordItem } from '../../types/timeline'

const {
  themeDark,
  themePrimary,
  neutralDark,
  neutralPrimary,
  accent,
  yellowDark,
  orange,
  redDark,
  magentaDark,
  blueMidmagenta,
  purpleDark,
  blueMid,
  blue,
  tealDark,
  teal,
  greenDark,
} = theme.palette
const colorList = [
  themeDark,
  themePrimary,
  neutralDark,
  neutralPrimary,
  accent,
  yellowDark,
  orange,
  redDark,
  magentaDark,
  blueMidmagenta,
  purpleDark,
  blueMid,
  blue,
  tealDark,
  teal,
  greenDark,
]

interface IProps {
  data: IWordItem[]
}

const StyledTagItem = styled.div`
  @keyframes tagShow {
    from {
      opacity: 0;
    }
    to {
      opacity: ${({ opacity }) => opacity};
    }
  }
  animation: ${({ opacity }) => opacity * 0.5}s tagShow ease-in;
`

// min <= n < max
const random = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min)) + min
}

const MIN_FONT_SIZE = 20
const MIN_OPACITY = 0.7

const TimeLineWordCloud: FC<IProps> = (props) => {
  const { data = [] } = props

  const weightAll = data.reduce((prev, next) => prev + (next?.weight || 0), 0)

  const weightMin = data.reduce((prev, next) => (prev?.weight > next?.weight ? next : prev), data[0])?.weight

  const weightRate = (weight: number): number => weight / weightAll
  const getOpacity = (weight: number): number => MIN_OPACITY + weightRate(weight) * 2
  const getFontSize = (weight: number, weightMin: number, fontSizeWeight: number): number => {
    return MIN_FONT_SIZE + (weight / weightMin) * fontSizeWeight
  }

  const fontSizeWeight = isMobile() ? 0 : 10
  return (
    <TagCloud
      style={{
        width: '100%',
        height: '100%',
      }}
    >
      {data.map((item) => (
        <StyledTagItem
          key={item.word}
          weight={item.weight}
          opacity={getOpacity(item.weight)}
          style={{
            color: colorList[random(0, colorList.length)],
            fontSize: getFontSize(item?.weight, weightMin, fontSizeWeight),
            fontFamily: 'fangsong, serif, system-ui',
            padding: 10,
            fontWeight: 'bold',
            opacity: getOpacity(item?.weight),
          }}
        >
          {item.word}
        </StyledTagItem>
      ))}
    </TagCloud>
  )
}

export default TimeLineWordCloud
