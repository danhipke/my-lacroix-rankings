import { injectReducer } from '../../store/reducers'

export default (store) => ({
  // path : '/',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const HomeView = require('./components/HomeView').default
      const reducer = require('./modules/rankings').default

      /*  Add the reducer to the store on key 'rankings'  */
      injectReducer(store, { key: 'rankings', reducer })

      /*  Return getComponent   */
      cb(null, HomeView)

    /* Webpack named bundle   */
    }, 'home')
  }
})
