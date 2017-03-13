import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { reorderFlavor } from '../modules/rankings'
import { setUserId } from '../modules/user'
import { submitRankings, getRankings } from '../../../services/rankingsService'
import { createUser } from '../../../services/userService'
import Flavor from '../components/Flavor'
import Fingerprint2 from 'fingerprintjs2'
import { Motion, spring } from 'react-motion'
import range from 'lodash.range'

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

const springSetting1 = { stiffness: 180, damping: 10 }
const springSetting2 = { stiffness: 120, damping: 17 }

function clamp (n, min, max) {
  return Math.max(Math.min(n, max), min)
}

const [count, width, height] = [20, 150, 150]

// indexed by visual position
const layout = range(count).map(n => {
  const row = Math.floor(n / 7)
  const col = n % 7
  return [width * col, height * row]
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

    this.handleTouchStart = this.handleTouchStart.bind(this)
    this.handleTouchMove = this.handleTouchMove.bind(this)
    this.handleMouseUp = this.handleMouseUp.bind(this)
    this.handleMouseMove = this.handleMouseMove.bind(this)
    this.handleMouseDown = this.handleMouseDown.bind(this)
    this.state = {
      mouseXY: [0, 0],
      mouseCircleDelta: [0, 0], // difference between mouse and circle pos for x + y coords, for dragging
      lastPress: null, // key of the last pressed component
      moved: null,
      isPressed: false
    }

    new Fingerprint2().get((result, components) => {
      this.props.setUserId(result)
      this.props.getRankings(this.props.userId)
    })
  }

  componentDidMount () {
    window.addEventListener('touchmove', this.handleTouchMove)
    window.addEventListener('touchend', this.handleMouseUp)
    window.addEventListener('mousemove', this.handleMouseMove)
    window.addEventListener('mouseup', this.handleMouseUp)
  }

  handleTouchStart (key, pressLocation, e) {
    this.handleMouseDown(key, pressLocation, e.touches[0])
  }

  handleTouchMove (e) {
    e.preventDefault()
    this.handleMouseMove(e.touches[0])
  }

  // TODO: fix janky moved + lastPress interaction. Basically, refactor this component
  handleMouseMove ({ pageX, pageY }) {
    const { lastPress, isPressed, mouseCircleDelta: [dx, dy] } = this.state
    if (isPressed) {
      const mouseXY = [pageX - dx, pageY - dy]
      const col = clamp(Math.floor(mouseXY[0] / width), 0, 6)
      const row = clamp(Math.floor(mouseXY[1] / height), 0, Math.floor(count / 7))
      const index = row * 7 + col
      this.setState({ mouseXY })
      if (lastPress === index) return
      this.setState({ moved: lastPress })
      this.moveFlavor(lastPress, index)
      this.setState({ lastPress: index })
    }
  }

  handleMouseDown (key, [pressX, pressY], { pageX, pageY }) {
    this.setState({
      lastPress: key,
      isPressed: true,
      mouseCircleDelta: [pageX - pressX, pageY - pressY],
      mouseXY: [pressX, pressY]
    })
  }

  handleMouseUp () {
    this.setState({ isPressed: false, mouseCircleDelta: [0, 0] })
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
    const { lastPress, isPressed, mouseXY, moved } = this.state
    return (
      <div>
        <div style={{ width: '1000px', height: '500px' }}>
          {this.props.flavors.map((flavor, i) => {
            let style
            let x
            let y
            const visualPosition = i
            if (i === lastPress && i !== moved && isPressed) {
              [x, y] = mouseXY
              style = {
                translateX: x,
                translateY: y,
                scale: spring(1.2, springSetting1),
                boxShadow: spring((x - (3 * width - 50) / 2) / 15, springSetting1)
              }
            } else {
              [x, y] = layout[visualPosition]
              style = {
                translateX: spring(x, springSetting2),
                translateY: spring(y, springSetting2),
                scale: spring(1, springSetting1),
                boxShadow: spring((x - (3 * width - 50) / 2) / 15, springSetting1)
              }
            }
            return (
              <Motion key={flavor.id} style={style} >
                {({ translateX, translateY, scale, boxShadow }) =>
                  <Flavor
                    handleMouseDown={this.handleMouseDown}
                    handleTouchStart={this.handleTouchStart}
                    x={x}
                    y={y}
                    index={i}
                    id={flavor.id}
                    imageSrc={flavor.imageSrc}
                    flavor={flavor.name}
                    moveFlavor={this.moveFlavor}
                    style={{
                      WebkitTransform: `translate3d(${translateX}px, ${translateY}px, 0) scale(${scale})`,
                      transform: `translate3d(${translateX}px, ${translateY}px, 0) scale(${scale})`,
                      zIndex: i === lastPress ? 99 : visualPosition,
                      boxShadow: `${boxShadow}px 5px 5px rgba(0,0,0,0.5)`
                    }} />
                }
              </Motion>
            )
          })}
        </div>
        <div>
          <button onClick={this.submitFlavorRankings}>
            Submit Rankings
          </button>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FlavorGridContainer)
