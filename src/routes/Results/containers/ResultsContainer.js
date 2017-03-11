import React, { PropTypes } from 'react'
import Result from '../components/Result'
import { connect } from 'react-redux'
import { getResults } from '../../../services/resultsService'

const mapDispatchToProps = {
  getResults
}

const mapStateToProps = (state) => ({
  rankingTotals : state.results.rankingTotals
})

class ResultsContainer extends React.Component {
  static propTypes = {
    rankingTotals: PropTypes.array,
    getResults: PropTypes.func.isRequired
  }

  constructor (props) {
    super(props)

    this.props.getResults()
  }

  render () {
    return (
      <div>
        {this.props.rankingTotals.map((rankingTotal, i) => {
          return (
            <Result
              key={rankingTotal.id}
              total={rankingTotal.total}
              flavor={rankingTotal.name} />
          )
        })}
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ResultsContainer)
