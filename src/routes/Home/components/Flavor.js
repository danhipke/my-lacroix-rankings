import React, { PropTypes, Component } from 'react'
import { DragSource, DropTarget } from 'react-dnd'
import ItemTypes from '../modules/itemTypes'
import flow from 'lodash.flow'
import './FlavorGrid.scss'

const style = {
  border: '1px dashed gray',
  padding: '0.5rem 1rem',
  marginBottom: '.5rem',
  backgroundColor: 'white',
  cursor: 'move'
}

const flavorSource = {
  beginDrag (props) {
    return {
      id: props.id,
      index: props.index
    }
  }
}

/**
 * Specifies the props to inject into your component.
 */
function collectDrag (connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }
}

function collectDrop (connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget()
  }
}

const flavorTarget = {
  hover (props, monitor, component) {
    const dragIndex = monitor.getItem().index
    const hoverIndex = props.index

    // Don't replace items with themselves
    if (dragIndex === hoverIndex) {
      return
    }

    // Time to actually perform the action
    props.moveFlavor(dragIndex, hoverIndex)

    // Note: we're mutating the monitor item here!
    // Generally it's better to avoid mutations,
    // but it's good here for the sake of performance
    // to avoid expensive index searches.
    monitor.getItem().index = hoverIndex
  }
}

class Flavor extends Component {
  static propTypes = {
    connectDragSource: PropTypes.func.isRequired,
    connectDropTarget: PropTypes.func.isRequired,
    index: PropTypes.number.isRequired,
    isDragging: PropTypes.bool.isRequired,
    imageSrc: PropTypes.string.isRequired,
    id: PropTypes.any.isRequired,
    flavor: PropTypes.string.isRequired,
    moveFlavor: PropTypes.func.isRequired
  }

  render () {
    const { isDragging, connectDragSource, connectDropTarget, imageSrc, flavor, index } = this.props
    const opacity = isDragging ? 0 : 1
    return connectDragSource(connectDropTarget(
      <div
        style={{ ...style, opacity }}
        className='flavor' >
        <img
          src={imageSrc}
          alt={flavor}
          className='flavor-image' />
        <span className='flavor-ranking'>{index + 1}</span>
      </div>
   ))
  }
}

export default flow(
 DragSource(ItemTypes.FLAVOR, flavorSource, collectDrag),
 DropTarget(ItemTypes.FLAVOR, flavorTarget, collectDrop)
)(Flavor)
