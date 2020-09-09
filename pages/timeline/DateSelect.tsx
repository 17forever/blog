// @ts-nocheck
import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { getTimelineFileListWithHotWords } from '../../lib/getTimeline'
import { useRouter } from 'next/router'
import { Dropdown, IDropdownOption, PrimaryButton, Coachmark, TeachingBubbleContent } from '@fluentui/react'
import TagCloud from 'react-tag-cloud'
import styled from 'styled-components'
import WordCloud from './WordCloud'
import times from '../../utils/times'

const StyledLayout = styled.div`
  display: flex;
`

const StyledDropdown = styled(Dropdown)`
  width: 500px;
  .ms-Dropdown {
    .ms-Dropdown-title {
      height: 50px;
      display: flex;
      align-items: center;
      font-size: 20px;
      padding-left: 20px;
    }
    .ms-Dropdown-caretDownWrapper {
      height: 50px;
      display: flex;
      align-items: center;
      padding-right: 10px;
      .ms-Dropdown-caretDown {
        font-size: 16px;
      }
    }
  }
`

const StyledButton = styled(PrimaryButton)`
  height: 50px;
  margin-left: 20px;
  .ms-Button-label {
    font-size: 20px;
    letter-spacing: 2px;
  }
`
const StyledBubbleContent = styled.p`
  line-height: 1.6;
`

export default function TimeLineIndex(props) {
  const { data = [], onChange } = props
  const [selectedItem, setSelectedItem] = useState()
  const options: IDropdownOption[] = data.map((item) => ({
    key: item?.id,
    text: item?.id,
  }))

  const [showCoachmark, setShowCoachmark] = useState(false)

  const handleChange = (e, option) => {
    const value = option.key
    const item = data.filter((item) => item.id === value)[0]
    setSelectedItem(item)
    onChange(item)
    setShowCoachmark(false)
  }

  const [flyButtonText, setFlyButtonText] = useState('出发')
  const router = useRouter()
  const handleFly = () => {
    const id = selectedItem?.id
    if (id) {
      setTimeout(() => {
        setFlyButtonText('确认目的地')
      }, 0)
      setTimeout(() => {
        setFlyButtonText('传送器启动')
      }, 500)
      setTimeout(() => {
        setFlyButtonText('传送中...')
      }, 1000)
      setTimeout(() => {
        setFlyButtonText('即将到达...')
      }, 3000)
      router.push(`/timeline/${selectedItem.id}`)
    } else {
      setShowCoachmark(true)
    }
  }

  const hideCoachmark = () => {
    setShowCoachmark(false)
  }

  const target = useRef()
  return (
    <StyledLayout>
      <div ref={target}>
        <StyledDropdown
          placeholder="选择时间"
          selectedKey={selectedItem?.id}
          options={options}
          onChange={handleChange}
          disabled={flyButtonText !== '出发'}
        />
      </div>
      <StyledButton text={flyButtonText} onClick={handleFly} disabled={flyButtonText !== '出发'} />
      {showCoachmark && (
        <Coachmark
          target={target.current}
          positioningContainerProps={{
            directionalHint: 9,
            doNotLayer: false,
          }}
          ariaAlertText="A coachmark has appeared"
          ariaDescribedBy="coachmark-desc1"
          ariaLabelledBy="coachmark-label1"
          ariaDescribedByText="Press enter or alt + C to open the coachmark notification"
          ariaLabelledByText="Coachmark notification"
          delayBeforeMouseOpen={2000}
        >
          <TeachingBubbleContent
            hasCloseButton
            closeButtonAriaLabel="关闭"
            onDismiss={hideCoachmark}
            headline="请选择目的地时间"
          >
            <StyledBubbleContent>
              相传，有一位勇士因忘记设置目的地时间，被传送器从史前第七纪元遍历传送，足足经历了五百万个文明才回来。此后，为了安全，传送者必须选择目的地时间。
            </StyledBubbleContent>
          </TeachingBubbleContent>
        </Coachmark>
      )}
    </StyledLayout>
  )
}
