import React from 'react'
import { bindActionCreators } from 'redux'
import { ResultsView } from 'routes/Results/components/ResultsView'
import { shallow } from 'enzyme'

describe('(Component) ResultsView', () => {
  let _props, _spies, _wrapper

  beforeEach(() => {
    _spies = {}
    _props = {
      counter : 5,
      ...bindActionCreators({
        doubleAsync : (_spies.doubleAsync = sinon.spy()),
        increment   : (_spies.increment = sinon.spy())
      }, _spies.dispatch = sinon.spy())
    }
    _wrapper = shallow(<ResultsView {..._props} />)
  })

  it('Should render as a <div>.', () => {
    expect(_wrapper.is('div')).to.equal(true)
  })

  it('Should render with an <h4> that includes results text.', () => {
    expect(_wrapper.find('h4').text()).to.match(/Results!/)
  })
})
