import React, { PropTypes } from 'react'
import { DragSource, DropTarget } from 'react-dnd'
import flow from 'lodash.flow'
import './Flavor.scss'

export const FLAVOR_ITEM_TYPE = 'FLAVOR_ITEM_TYPE'

const flavorSource = {
  beginDrag (props) {
    return {
      id: props.id,
      index: props.index
    }
  }
}

const flavorTarget = {
  hover (props, monitor, component) {
    const dragIndex = monitor.getItem().index
    const hoverIndex = props.index

    if (dragIndex === hoverIndex) return

    props.moveFlavor(dragIndex, hoverIndex)
    monitor.getItem().index = hoverIndex
  }
}

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

export const Flavor = (props) => {
  const { isDragging, connectDragSource, connectDropTarget, imageSrc, flavor, index } = props
  const opacity = isDragging ? 0 : 1
  return connectDragSource(connectDropTarget(
    <div
      style={{ opacity }}
      className='flavor' >
      <img
        src={imageSrc}
        alt={flavor}
        style={{ width: '100%' }}
        className='flavor-image' />
      <span className='flavor-rank'>{index + 1}</span>
    </div>
   ))
}

Flavor.propTypes = {
  connectDragSource: PropTypes.func.isRequired,
  connectDropTarget: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  isDragging: PropTypes.bool.isRequired,
  imageSrc: PropTypes.string.isRequired,
  id: PropTypes.any.isRequired,
  flavor: PropTypes.string.isRequired,
  moveFlavor: PropTypes.func.isRequired
}

export default flow(
 DragSource(FLAVOR_ITEM_TYPE, flavorSource, collectDrag),
 DropTarget(FLAVOR_ITEM_TYPE, flavorTarget, collectDrop)
)(Flavor)
