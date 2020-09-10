import React from 'react'
import PropTypes from 'prop-types'
import Default, { Mobile } from '../Responsive'
import LayoutDefault from './LayoutDefault'
import LayoutMobile from './LayoutMobile'

const LayoutIndex = ({ children }) => {
  return (
    <>
      <Default>
        <LayoutDefault>{children}</LayoutDefault>
      </Default>
      <Mobile>
        <LayoutMobile>{children}</LayoutMobile>
      </Mobile>
    </>
  )
}

LayoutIndex.propTypes = {}

export default LayoutIndex
