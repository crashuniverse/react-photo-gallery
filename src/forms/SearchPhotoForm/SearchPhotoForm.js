import React from 'react'
import { reduxForm } from 'redux-form'

export const fields = ['photoSearchQuery']

const validate = (values) => {
  const errors = {}
  return errors
}

type Props = {
  handleSubmit: Function,
  fields: Object,
}
export class SearchPhoto extends React.Component {
  props: Props;

  defaultProps = {
    fields: {}
  }

  render () {
    const { fields, handleSubmit } = this.props

    return (
      <form className='row' onSubmit={handleSubmit}>
        <div className='col-xs-12 col-md-6 col-md-offset-3'>
          <div className='input-group'>
            <input type='text' className='form-control' placeholder='Search Photos' autoComplete='off' required
              {...fields.photoSearchQuery} />
            <span className='input-group-btn'>
              <button className='btn btn-default' type='button' onClick={handleSubmit}>Search</button>
            </span>
          </div>
        </div>
      </form>
    )
  }
}

const SearchPhotoForm = reduxForm({
  form: 'SearchPhoto',
  fields,
  validate
})(SearchPhoto)

export default SearchPhotoForm
