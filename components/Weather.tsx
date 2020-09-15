import React from 'react'
import PropTypes from 'prop-types'
import IconFont from './IconFont'

export default function Weather({ children = '' }) {
  return children.split('、').map((weather) => <IconFont key={weather} weather={weather} />)
}

Weather.propTypes = {}
