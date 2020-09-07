import React from 'react'
import PropTypes from 'prop-types'

export default function MopanSvg() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      style={{
        margin: 'auto',
        background: 'rgb(255, 255, 255)',
        display: 'block',
        shapeRendering: 'auto',
        width: 100,
        height: 100
      }}
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid"
    >
      <g transform="translate(50,50)">
        <g transform="scale(0.7)">
          <circle cx="0" cy="0" r="50" fill="#85a2b6" />
          <circle cx="0" cy="-28" r="15" fill="#bbcedd">
            <animateTransform
              attributeName="transform"
              type="rotate"
              dur="1s"
              repeatCount="indefinite"
              keyTimes="0;1"
              values="0 0 0;360 0 0"
            />
          </circle>
        </g>
      </g>
    </svg>
  )
}

MopanSvg.propTypes = {}
