import React, { Component } from 'react'
import Photo from 'components/Photo'

export default class Gallery extends Component {
  componentDidMount () {
    this.props.fetchPhotos()
  }

  render () {
    const { photos } = this.props
    const photoItems = photos.map((photo) => {
      return <Photo id={photo.id} likes={photo.likes} name={photo.name} url={photo.url} key={photo.id} />
    })
    return (
      <div>
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
