// @ts-nocheck
import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useRouter } from 'next/router'
import { Dropdown, IDropdownOption } from '@fluentui/react'
import styled from 'styled-components'

const StyledDropdown = styled(Dropdown)`
  width: 90px;
  .ms-Dropdown-title {
    border: none;
  }
`

interface Iprops {
  children: JSX.Element[]
  data: string
  value: string
}

export default function DateSelectInInfoPage(props: Iprops) {
  const { data = [], value: valueFormProps = null, children } = props
  const [value, setValue] = useState(valueFormProps)
  const options: IDropdownOption[] = data.map((item) => ({
    key: item,
    text: item,
  }))
  const router = useRouter()
  // useEffect(() => {
  //   router.push(`/timeline/${value}`)
  // }, [value])

  const handleChange = (e, option) => {
    const value = option.key
    setValue(value)
    router.push(`/timeline/${value}`)
  }

  return (
    <StyledDropdown placeholder="选择回去的时间" selectedKey={value} options={options} onChange={handleChange} />
  )
}

DateSelectInInfoPage.propTypes = {}
