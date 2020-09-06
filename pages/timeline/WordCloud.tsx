// @ts-nocheck
import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import TagCloud from 'react-tag-cloud'
import styled from 'styled-components'
import theme from '../../utils/getTheme'

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
function random(min, max) {
  return Math.floor(Math.random() * (max - min)) + min
}

const MIN_FONT_SIZE = 20
const getFontSize = (weight: number, weightMin: number): number => {
  return MIN_FONT_SIZE + (weight / weightMin) * 10
}

const MIN_OPACITY = 0.7

export default function TimeLineWordCloud(props) {
  const { data = [] } = props

  const weightAll = data.reduce((prev, next) => prev + (next?.weight || 0), 0)

  const weightMin = data.reduce((prev, next) => (prev?.weight > next?.weight ? next : prev), data[0])?.weight

  const weightRate = (weight) => weight / weightAll
  const getOpacity = (weight) => MIN_OPACITY + weightRate(weight) * 2

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
            fontSize: getFontSize(item?.weight, weightMin),
            fontFamily: 'fangsong, system-ui',
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
