import React, { Component } from 'react'
import Photo from 'components/Photo'
import SearchPhotoForm from 'forms/SearchPhotoForm'
import classes from './Gallery.scss'

export default class Gallery extends Component {
  navigateToPrevPage () {
    const { fetchPhotos, photoSearchQuery, pagination } = this.props
    fetchPhotos({'photoSearchQuery': photoSearchQuery}, pagination.prev)
    scrollTo(0, 0)
  }

  navigateToNextPage () {
    const { fetchPhotos, photoSearchQuery, pagination } = this.props
    fetchPhotos({'photoSearchQuery': photoSearchQuery}, pagination.next)
    scrollTo(0, 0)
  }

  render () {
    const { photos, fetchPhotos, pagination } = this.props
    const photoItems = photos.map((photo) => {
      return <Photo id={photo.id} likes={photo.likes} name={photo.name} url={photo.url} key={photo.id} />
    })
    const paginationButtons = (
      <div className={'row ' + classes.pagination}>
        <div className='col-xs-6 text-right'>
          <button className='btn btn-primary' onClick={::this.navigateToPrevPage}
            disabled={!pagination.prev}>&lt;</button>
        </div>
        <div className='col-xs-6 text-left'>
          <button className='btn btn-primary' onClick={::this.navigateToNextPage}
            disabled={!pagination.next}>&gt;</button>
        </div>
      </div>
    )
    return (
      <div>
        <SearchPhotoForm onSubmit={fetchPhotos} />
        <div className={classes.gallery}>
          {photoItems}
        </div>
        {pagination.prev || pagination.next ? paginationButtons : null}
      </div>
    )
  }
}

Gallery.propTypes = {
  fetchPhotos: React.PropTypes.func,
  photos: React.PropTypes.array,
  photoSearchQuery: React.PropTypes.string,
  pagination: React.PropTypes.object
}

export default Gallery
