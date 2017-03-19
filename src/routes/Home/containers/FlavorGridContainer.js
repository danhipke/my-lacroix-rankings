import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { reorderFlavor } from '../modules/rankings'
import { setUserId } from '../modules/user'
import { submitRankings, getRankings } from '../../../services/rankingsService'
import { createUser } from '../../../services/userService'
import FlavorGrid from '../components/FlavorGrid'
import Fingerprint2 from 'fingerprintjs2'

const mapDispatchToProps = {
  reorderFlavor,
  submitRankings,
  getRankings,
  setUserId,
  createUser
}

const mapStateToProps = (state) => ({
  flavors : state.rankings.flavors,
  userId: state.user.userId,
  hasRankedBefore: state.rankings.hasRankedBefore
})

class FlavorGridContainer extends React.Component {
  static propTypes = {
    flavors: PropTypes.array.isRequired,
    userId: PropTypes.string,
    hasRankedBefore: PropTypes.bool.isRequired,
    reorderFlavor: PropTypes.func.isRequired,
    submitRankings: PropTypes.func.isRequired,
    getRankings: PropTypes.func.isRequired,
    setUserId: PropTypes.func.isRequired,
    createUser: PropTypes.func.isRequired
  }

  constructor (props) {
    super(props)

    this.moveFlavor = this.moveFlavor.bind(this)
    this.submitFlavorRankings = this.submitFlavorRankings.bind(this)

    new Fingerprint2().get((result, components) => {
      this.props.setUserId(result)
      this.props.getRankings(this.props.userId)
    })
  }

  moveFlavor (startIndex, endIndex) {
    let reorderVal = {
      startIndex: parseInt(startIndex),
      endIndex: parseInt(endIndex)
    }
    this.props.reorderFlavor(reorderVal)
  }

  submitFlavorRankings () {
    if (!this.props.hasRankedBefore) {
      this.props.createUser(this.props.userId)
    }

    let submitData = {
      userId: this.props.userId,
      hasRankedBefore: this.props.hasRankedBefore,
      flavors: this.props.flavors
    }
    this.props.submitRankings(submitData)
  }

  // TODO: Move button rendering and Flavor creation into separate component
  render () {
    return (
      <FlavorGrid
        moveFlavor={this.moveFlavor}
        submitFlavorRankings={this.submitFlavorRankings}
        flavors={this.props.flavors}
      />
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FlavorGridContainer)
