const request = require('superagent')

// ------------------------------------
// Constants
// ------------------------------------
export const SET_PHOTOS = 'SET_PHOTOS'
export const SET_PAGINATION = 'SET_PAGINATION'
const UNSPLASH_CLIENT_ID = '8f113d7ffc06c7a8f4c8a397dd5b1fd01d884211225ba623ca4a9d4c96097572'

// ------------------------------------
// Actions
// ------------------------------------
function setPhotos (value) {
  return {
    type: SET_PHOTOS,
    payload: value
  }
}

function setPagination (value) {
  return {
    type: SET_PAGINATION,
    payload: value
  }
}

export const fetchPhotos = (query) => {
  return (dispatch) => {
    return new Promise((resolve) => {
      request
      .get('https://api.unsplash.com/photos/search/')
      .query({
        'client_id': UNSPLASH_CLIENT_ID,
        'query': query.photoSearchQuery
      })
      .end((err, res) => {
        if (err) {
          throw err
        }
        const photos = getPhotosData(res.body)
        const links = getPaginationHeaders(res.headers)
        dispatch(setPhotos(photos))
        console.log(links)
        dispatch(setPagination(links))
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

const PAGINATION_ACTION_HANDLER = {
  [SET_PAGINATION]: (state, action) => action.payload
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialPhotosState = []
export function photosReducer (state = initialPhotosState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}

const initialPaginationState = {}
export function paginationReducer (state = initialPaginationState, action) {
  const handler = PAGINATION_ACTION_HANDLER[action.type]
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

function getLinkFromText (linkText) {
  const httpsLinkText = linkText.split(';')[0]
  const httpsLink = httpsLinkText.substring(httpsLinkText.indexOf('<') + 1, httpsLinkText.indexOf('>'))
  return httpsLink
}

function getPaginationHeaders (headers) {
  const links = {}
  const linkHeaders = headers.link
  if (!linkHeaders) {
    return links
  }
  const linkHeadersArray = linkHeaders.split(',')
  linkHeadersArray.forEach((link) => {
    if (link.indexOf('rel="prev"') > -1) {
      links.prev = getLinkFromText(link)
    }
    if (link.indexOf('rel="next"') > -1) {
      links.next = getLinkFromText(link)
    }
  })
  return links
}
