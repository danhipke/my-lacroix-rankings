import React, { PropTypes } from 'react'

export const Result = (props) => {
  return (
    <div>
      <span>{props.flavor}: {props.total}</span>
    </div>
  )
}

Result.propTypes = {
  total: PropTypes.string.isRequired,
  flavor: PropTypes.string.isRequired
}

export default Result
