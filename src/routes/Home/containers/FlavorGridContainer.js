import { connect } from 'react-redux'
import { rankingsReorderItems } from '../modules/rankings'
import FlavorGrid from '../components/FlavorGrid'

const mapDispatchToProps = {
  rankingsReorderItems
}

const mapStateToProps = (state) => ({
  rankings : state.rankings
})

export default connect(mapStateToProps, mapDispatchToProps)(FlavorGrid)
