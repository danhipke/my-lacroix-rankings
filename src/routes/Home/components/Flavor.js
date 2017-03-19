import React, { PropTypes } from 'react'
import './Flavor.scss'

class Flavor extends React.Component {
  static propTypes = {
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

  constructor (props) {
    super(props)

    this._onMouseDown = this._onMouseDown.bind(this)
    this._onTouchStart = this._onTouchStart.bind(this)
  }
  _onMouseDown (e) {
    this.props.handleMouseDown(this.props.index, [this.props.x, this.props.y], e)
  }

  _onTouchStart (e) {
    this.props.handleTouchStart(this.props.index, [this.props.x, this.props.y], e)
  }

  render () {
    const { imageSrc, flavor, index, style } = this.props
    return (
      <div
        onMouseDown={this._onMouseDown}
        onTouchStart={this._onTouchStart}
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
}

export default Flavor
