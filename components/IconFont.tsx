import React from 'react'
import PropTypes from 'prop-types'

export default function IconFont(props) {
  const { icon } = props
  return (
    <svg className="iconfont" aria-hidden="true">
      <use xlinkHref={`#${icon}`} />
    </svg>
  )
}

IconFont.propTypes = {}
