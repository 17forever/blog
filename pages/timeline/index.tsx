// @ts-nocheck
import React from 'react'
import PropTypes from 'prop-types'
import { getTimelineFileList } from '../../lib/getTimeline'
import { Dropdown, IDropdownOption, IDropdownStyles } from '@fluentui/react'

const dropdownStyles: Partial<IDropdownStyles> = {
  dropdown: { width: 300 },
};

export default function TimeLineIndex(props) {
  const { data = [] } = props
  const options: IDropdownOption[] = data.map(
    item => ({
      key: item,
      text: item
    })
  )
  return (
    <>
      <Dropdown
        placeholder="选择时间"
        defaultSelectedKey={data[0]}
        options={options}
        styles={dropdownStyles}
      />
    </>
  );
}

TimeLineIndex.propTypes = {
}

export async function getStaticProps() {
  return {
    props: {
      data: getTimelineFileList()
    }
  }
}
