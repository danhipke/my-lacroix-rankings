import React, { PropTypes } from 'react'
import './Flavor.scss'

export const Flavor = (props) => {
  const { imageSrc, flavor, index, style, x, y } = props
  return (
    <div
      onMouseDown={props.handleMouseDown.bind(null, index, [x, y])}
      onTouchStart={props.handleTouchStart.bind(null, index, [x, y])}
      style={{ ...style }}
      className='flavor' >
      <img
        src={imageSrc}
        alt={flavor}
        draggable='false'
        style={{ width: '100%' }}
        className='flavor-image' />
      <span className='flavor-rank'>{index + 1}</span>
    </div>
  )
}

Flavor.propTypes = {
  index: PropTypes.number.isRequired,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  imageSrc: PropTypes.string.isRequired,
  id: PropTypes.any.isRequired,
  flavor: PropTypes.string.isRequired,
  moveFlavor: PropTypes.func.isRequired,
  style: PropTypes.object.isRequired,
  handleMouseDown: PropTypes.func.isRequired,
  handleTouchStart: PropTypes.func.isRequired
}

export default Flavor
