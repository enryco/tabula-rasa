import React, { Component } from 'react'
import faker from 'faker'

const getPlaceholder = () => {
  const reducer = (reducer, acc) => reducer + acc
  const line = () => `${faker.name.firstName()} ${Math.round(Math.random() * 10000) / 100} €\n`
  const rand = Math.round(Math.random() * 3 + 3)
  return Array(rand).fill('').map(line).reduce(reducer)
}

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
    this.props.setData(value)

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
