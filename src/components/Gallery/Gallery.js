import React, { Component } from 'react'

export default class Gallery extends Component {
  componentDidMount () {
    this.props.fetchPhotos()
  }

  render () {
    const { photos } = this.props
    console.log(photos)
    return (
      <div>This component will show Photo Gallery.</div>
    )
  }

}

Gallery.propTypes = {
  fetchPhotos: React.PropTypes.func,
  photos: React.PropTypes.array
}

export default Gallery
