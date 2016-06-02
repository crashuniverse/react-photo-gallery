import { injectReducer } from '../../store/reducers'

export default (store) => ({
  path: 'gallery',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const Gallery = require('./containers/GalleryContainer').default
      const photosReducer = require('./modules/gallery').photosReducer
      const paginationReducer = require('./modules/gallery').paginationReducer
      const statusReducer = require('./modules/gallery').statusReducer

      /*  Add the reducer to the store on key 'reducerKey'  */
      injectReducer(store, { key: 'photos', reducer: photosReducer })
      injectReducer(store, { key: 'pagination', reducer: paginationReducer })
      injectReducer(store, { key: 'status', reducer: statusReducer })

      /*  Return getComponent   */
      cb(null, Gallery)

    /* Webpack named bundle   */
    }, 'gallery')
  }
})
