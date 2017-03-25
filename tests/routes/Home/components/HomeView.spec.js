import React from 'react'
import { bindActionCreators } from 'redux'
import { HomeView } from 'routes/Home/components/HomeView'
import { shallow } from 'enzyme'

describe('(View) Home', () => {
  let _props, _spies, _wrapper

  beforeEach(() => {
    _spies = {}
    _props = {
      ...bindActionCreators({
        reorderFlavor : (_spies.reorderFlavor = sinon.spy())
      }, _spies.dispatch = sinon.spy())
    }
    _wrapper = shallow(<HomeView {..._props} />)
  })

  it('Should render as a <div>.', () => {
    expect(_wrapper.is('div')).to.equal(true)
  })
})
