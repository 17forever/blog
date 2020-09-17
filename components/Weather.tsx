import React from 'react'
import IconFont from './IconFont'

interface IProps {
  children: string
}

const Weather: React.FC<IProps> = ({ children = '' }) => {
  return (
    <>
      {children.split('、').map((weather) => (
        <IconFont key={weather} weather={weather} />
      ))}
    </>
  )
}

export default Weather
