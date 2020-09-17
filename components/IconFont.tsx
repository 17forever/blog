/* eslint-disable complexity */
import React from 'react'
import cx from 'classnames'
import styled from 'styled-components'

const StyledSpan = styled.span`
  &.weather {
    & > svg {
      font-size: 17px;
    }
  }
`

interface IProps {
  icon?: string
  weather?: string
}

const IconFont: React.FC<IProps> = (props) => {
  let { icon = '' } = props
  const weather = props.weather
  switch (weather) {
    case '风':
    case '大风':
      icon = 'icon-feng'
      break
    case '多云':
      icon = 'icon-duoyun'
      break
    case '雾霾':
    case '沙尘':
      icon = 'icon-shachen'
      break
    case '雾':
    case '大雾':
      icon = 'icon-wu'
      break
    case '阴':
      icon = 'icon-yintian'
      break
    case '雨':
    case '小雨':
      icon = 'icon-yutian'
      break
    case '大雨':
      icon = 'icon-zhongyu'
      break
    case '雪':
    case '小雪':
      icon = 'icon-xiaoxue'
      break
    case '大雪':
      icon = 'icon-daxue'
      break
    case '晴':
      icon = 'icon-qing'
      break
    case '雷':
    case '打雷':
      icon = 'icon-leiyu'
      break
    case '阵雨':
    case '雷阵雨':
      icon = 'icon-zhenyu'
      break
    default:
      break
  }
  return icon ? (
    <StyledSpan
      title={weather}
      className={cx({
        weather,
      })}
    >
      <svg className="iconfont" aria-hidden="true">
        <use xlinkHref={`#${icon}`} />
      </svg>
    </StyledSpan>
  ) : (
    ((icon as unknown) as React.ReactElement)
  )
}

export default IconFont
