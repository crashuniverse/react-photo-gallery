import React from 'react'

type Props = {
  id: React.PropTypes.string,
  likes: React.PropTypes.number,
  name: React.PropTypes.string,
  url: React.PropTypes.string
};
export class Photo extends React.Component {
  props: Props;

  render () {
    const {likes, name, url} = this.props
    return (
      <div>
        <img src={url} alt='photo' width='800' />
        <div>{likes} Likes</div>
        <div>{name}</div>
      </div>
    )
  }
}

export default Photo
