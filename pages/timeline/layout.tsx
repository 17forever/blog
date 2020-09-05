// @ts-nocheck
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Dropdown, IDropdownOption, IDropdownStyles } from '@fluentui/react';
import { useRouter } from 'next/router';

const dropdownStyles: Partial<IDropdownStyles> = {
  dropdown: { width: 300 },
};

interface Iprops {
  children: JSX.Element[],
  data: string,
  value: string
}

export default function TimeLineLayout(props: Iprops) {
  const { data = [], value: valueFormProps = null, children } = props;
  const [value, setValue] = useState(valueFormProps);
  const options: IDropdownOption[] = data.map((item) => ({
    key: item,
    text: item,
  }));
  const router = useRouter();
  // useEffect(() => {
  //   router.push(`/timeline/${value}`)
  // }, [value])

  const handleChange = (e, option) => {
    const value = option.key;
    setValue(value);
    router.push(`/timeline/${value}`);
  };

  return (
    <>
      <Dropdown
        placeholder="选择回去的时间"
        selectedKey={value}
        options={options}
        styles={dropdownStyles}
        onChange={handleChange}
      />
      {children}
    </>
  );
}

TimeLineLayout.propTypes = {};
