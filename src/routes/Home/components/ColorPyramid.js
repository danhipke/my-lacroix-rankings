import React, { PropTypes } from 'react'
import './ColorPyramid.scss'

export const ColorPyramid = (props) => {
  return (
    <div className='pyramid'>
      {props.colors.map((color, i) => {
        return (
          <div
            key={i}
            className='pyramid-level'
            style={{ borderBottom: '110px solid ' + color,
              width: 260 + (120 * i) }} />
        )
      })}
    </div>
  )
}

ColorPyramid.propTypes = {
  colors: PropTypes.array.isRequired
}

export default ColorPyramid
