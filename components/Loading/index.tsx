import React from 'react'
import PropTypes from 'prop-types'
import { Spinner, SpinnerSize } from '@fluentui/react'

export default function Loading({ label = '加载中' }) {
  return <Spinner label={label} size={SpinnerSize.large} />
}

Loading.propTypes = {}
