import React, { useState, useRef } from 'react'
import { useRouter } from 'next/router'
import { Dropdown, IDropdownOption, PrimaryButton, Coachmark, TeachingBubbleContent } from '@fluentui/react'
import styled from 'styled-components'
import { isMobile as checkIsMobile } from '../../components/Responsive'
import cx from 'classnames'

const StyledLayout = styled.div`
  display: flex;
  &.mobile {
    flex-direction: column;
    align-items: center;
  }
`

const StyledDropdown = styled(Dropdown)`
  width: 500px;
  .ms-Dropdown {
    .ms-Dropdown-title {
      height: 45px;
      display: flex;
      align-items: center;
      font-size: 17px;
      padding-left: 17px;
    }
    .ms-Dropdown-caretDownWrapper {
      height: 45px;
      display: flex;
      align-items: center;
      padding-right: 10px;
      .ms-Dropdown-caretDown {
        font-size: 17px;
      }
    }
  }
  &.mobile {
    width: 80vw;
  }
`

const StyledButton = styled(PrimaryButton)`
  height: 45px;
  margin-left: 17px;
  .ms-Button-label {
    font-size: 17px;
    letter-spacing: 2px;
  }
  &.mobile {
    margin: 50px 0 0 0;
    width: 170px;
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
  const mobile = checkIsMobile()
  return (
    <StyledLayout
      className={cx({
        mobile,
      })}
    >
      <div ref={target}>
        <StyledDropdown
          placeholder="选择时间"
          selectedKey={selectedItem?.id}
          options={options}
          onChange={handleChange}
          disabled={flyButtonText !== '出发'}
          className={cx({
            mobile,
          })}
        />
      </div>
      <StyledButton
        text={flyButtonText}
        onClick={handleFly}
        disabled={flyButtonText !== '出发'}
        className={cx({
          mobile,
        })}
      />
      {showCoachmark && (
        <Coachmark
          target={target.current}
          positioningContainerProps={{
            // directionalHint: 9,
            directionalHint: mobile ? 5 : 9,
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
