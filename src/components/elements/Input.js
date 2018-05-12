import React, { Component } from 'react'
import { getPlaceholder } from '../../functions'

class Input extends Component {

  state = {
    value: "",
    placeholder: getPlaceholder()
  }

  componentDidMount() {

    this.props.setData(this.state.placeholder)
  }

  handleChange = e => {
    const value = e.target.value
    this.setState({ value })
    if (value) {
      this.props.setData(value)
    } else {
      this.props.setData(this.state.placeholder)
    }

  }

  render() {

    return (
      <div className="tr-input">
        <textarea
          ref={e => this.textarea = e}
          className="tr-input__textarea"
          name="test"
          id="test"
          cols="30"
          rows="10"
          value={this.state.value}
          onChange={this.handleChange}
          placeholder={this.state.placeholder}
        ></textarea>
      </div>
    )
  }
}

export default Input
