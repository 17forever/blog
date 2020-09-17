import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { Dropdown, IDropdownOption } from '@fluentui/react'
import styled from 'styled-components'

const StyledDropdown = styled(Dropdown)`
  width: 90px;
  .ms-Dropdown-title {
    border: none;
  }
`

interface IProps {
  data: string[]
  value: string
}

const DateSelectInInfoPage: React.FC<IProps> = (props) => {
  const { data = [], value: valueFormProps = null } = props
  const [value, setValue] = useState(valueFormProps)
  const options: IDropdownOption[] = data.map((item) => ({
    key: item,
    text: item,
  }))
  const router = useRouter()
  const handleChange = (e: React.FormEvent<HTMLDivElement>, option: IDropdownOption): void => {
    const value = option.key
    setValue(value as string)
    router.push(`/timeline/${value}`)
  }

  return <StyledDropdown placeholder="选择回去的时间" selectedKey={value} options={options} onChange={handleChange} />
}

export default DateSelectInInfoPage
