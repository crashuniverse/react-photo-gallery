import React, { Component } from 'react'
import Photo from 'components/Photo'
import SearchPhotoForm from 'forms/SearchPhotoForm'

export default class Gallery extends Component {
  render () {
    const { photos } = this.props
    const photoItems = photos.map((photo) => {
      return <Photo id={photo.id} likes={photo.likes} name={photo.name} url={photo.url} key={photo.id} />
    })
    return (
      <div>
        <SearchPhotoForm onSubmit={this.props.fetchPhotos} />
        {photoItems}
      </div>
    )
  }
}

Gallery.propTypes = {
  fetchPhotos: React.PropTypes.func,
  photos: React.PropTypes.array
}

export default Gallery
