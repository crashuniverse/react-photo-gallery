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
      <form onSubmit={handleSubmit}>
        <input type='text' placeholder='Search Photos' autoComplete='off' required {...fields.photoSearchQuery} />
        <button type='submit' onClick={handleSubmit}>Search</button>
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
