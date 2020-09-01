// @ts-nocheck
import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { getTimelineFileList, getTimelineFileInfo } from '../../lib/getTimeline'
import { Dropdown, IDropdownOption, IDropdownStyles } from '@fluentui/react'
import request from '../../lib/request'

const dropdownStyles: Partial<IDropdownStyles> = {
  dropdown: { width: 300 },
};

export default function TimeLineIndex(props) {
  const { files = [] } = props
  const [selectedFile, setSelectedFile] = useState(files?.[0])
  const options: IDropdownOption[] = files.map(
    item => ({
      key: item,
      text: item
    })
  )
  const [data, setData] = useState([])
  useEffect(() => {
    request('/getTimelineContent',
      {
        file: selectedFile
      }
    )
      .then(data => {
        setData(data)
      })
  }, [selectedFile])
  const handleChange = (e, option) => {
    const file = option.key
    setSelectedFile(file)
  }
  return (
    <>
      <Dropdown
        placeholder="选择时间"
        selectedKey={selectedFile}
        options={options}
        styles={dropdownStyles}
        onChange={handleChange}
      />
      {
        data.map(
          item => {
            const {
              date, weather, mood, body
            } = item
            return (
              <div key={date}>
                <div>{date}</div>
                <div>{weather}</div>
                <div>{mood}</div>
                <div>{body}</div>
              </div>
            )
          }
        )
      }
    </>
  );
}

TimeLineIndex.propTypes = {
}

export async function getStaticProps() {
  return {
    props: {
      files: getTimelineFileList(),
    }
  }
}
