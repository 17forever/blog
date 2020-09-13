import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'

export default function HelmetComponent(props) {
  const { title = '' } = props
  return (
    <Helmet>
      <title>{`${title ? `${title} - ` : ''}17 Forever`}</title>
    </Helmet>
  )
}

HelmetComponent.propTypes = {}
