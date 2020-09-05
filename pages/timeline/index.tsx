// @ts-nocheck
import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { getTimelineFileListWithHotWords } from '../../lib/getTimeline'
import { useRouter } from 'next/router'
import { Dropdown, IDropdownOption, PrimaryButton } from '@fluentui/react'
import TagCloud from 'react-tag-cloud'
import styled from 'styled-components'
import WordCloud from './WordCloud'
import { differenceInYears } from 'date-fns'

const StyledLayout = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
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
  font-size: 20px;
  margin-left: 20px;
  letter-spacing: 2px;
`

const StyledTitle = styled.h2`
  font-size: ${differenceInYears(new Date(), new Date(1993, 2, 17))}px;
  letter-spacing: 7px;
`
const StyledTop = styled.div`
  flex: 2;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  width: 100%;
`
const StyledBottom = styled.div`
  flex: 3;
  display: flex;
`

export default function TimeLineIndex(props) {
  const { data } = props
  const [selectedItem, setSelectedItem] = useState()
  const options: IDropdownOption[] = data.map((item) => ({
    key: item.id,
    text: item.id,
  }))

  const handleChange = (e, option) => {
    const value = option.key
    setSelectedItem(data.filter((item) => item.id === value)[0])
  }

  const router = useRouter()
  const handleFly = () => {
    const id = selectedItem?.id
    if (id) {
      router.push(`/timeline/${selectedItem.id}`)
    }
  }

  return (
    <StyledLayout>
      <StyledTop>
        {selectedItem ? <WordCloud data={selectedItem.words} /> : <StyledTitle>回到过去</StyledTitle>}
      </StyledTop>
      <StyledBottom>
        <StyledDropdown
          placeholder="选择时间"
          selectedKey={selectedItem?.id}
          options={options}
          onChange={handleChange}
        />
        <StyledButton text="出发" onClick={handleFly} />
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
