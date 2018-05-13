import React, { Component } from 'react'
import { getPlaceholder } from '../../functions'

class Input extends Component {

  state = {
    value: "",
    placeholder: getPlaceholder()
  }

  componentDidMount() {
    if (this.props.data) {
      this.setState({ value: this.props.data })
    } else {
      this.props.updatePlaceholder(this.state.placeholder)
    }
  }

  updateData = value => {
    this.setState({ value })
    this.props.setData(value)
  }

  handleBlur = e => {
    const value = this.state.value.replace(/\n+\s+/g, '')
    if (!value) {
      this.updateData('')
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
          placeholder={this.state.placeholder}
          onChange={e => this.updateData(e.target.value)}
          onFocus={() => this.textarea.select()}
          onBlur={this.handleBlur}
        ></textarea>
      </div>
    )
  }
}

export default Input
