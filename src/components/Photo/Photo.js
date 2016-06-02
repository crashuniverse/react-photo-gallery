import React from 'react'
import classes from './Photo.scss'

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
      <div className={'row ' + classes.photoContainer}>
        <div className='col-xs-12 col-md-10 col-md-offset-1'>
          <img className={classes.photo} src={url} alt='photo' />
          <div className={'row ' + classes.meta}>
            <div className='col-xs-4 text-left'>
              <span className='glyphicon glyphicon-heart'></span>&nbsp;
              {likes} Likes
            </div>
            <div className='col-xs-8 text-right'>{name}</div>
          </div>
        </div>
      </div>
    )
  }
}

export default Photo
