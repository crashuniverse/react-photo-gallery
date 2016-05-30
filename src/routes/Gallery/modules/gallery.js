const request = require('superagent')

// ------------------------------------
// Constants
// ------------------------------------
export const SET_PHOTOS = 'SET_PHOTOS'
const UNSPLASH_CLIENT_ID = '8f113d7ffc06c7a8f4c8a397dd5b1fd01d884211225ba623ca4a9d4c96097572'
const SEARCH_QUERY = 'paris'

// ------------------------------------
// Actions
// ------------------------------------
function setPhotos (value = SEARCH_QUERY) {
  return {
    type: SET_PHOTOS,
    payload: value
  }
}

export const fetchPhotos = (query = SEARCH_QUERY) => {
  console.log('an api request is made')
  return (dispatch) => {
    return new Promise((resolve) => {
      request
      .get('https://api.unsplash.com/photos/search/')
      .query({
        'client_id': UNSPLASH_CLIENT_ID,
        'query': SEARCH_QUERY
      })
      .end((err, res) => {
        if (err) {
          throw err
        }
        const photos = getPhotosData(res.body)
        dispatch(setPhotos(photos))
        resolve()
      })
    })
  }
}

export const actions = {
  fetchPhotos
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [SET_PHOTOS]: (state, action) => action.payload
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = []
export default function galleryReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}

// ------------------------------------
// Helpers
// ------------------------------------
function getPhotosData (rawData) {
  const processedData = rawData.map((photo) => {
    return {
      id: photo.id,
      likes: photo.likes,
      name: photo.user && photo.user.name,
      url: photo.urls && photo.urls.regular
    }
  })
  return processedData
}
