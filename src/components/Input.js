import React, { Component } from 'react'
import faker from 'faker'

const getPlaceholder = () => {
  const reducer = (reducer, acc) => reducer + acc
  const line = () => `${faker.name.firstName()} ${Math.round(Math.random() * 10000) / 100} €\n`
  const rand = Math.round(Math.random()*3 + 3)
  return Array(rand).fill('').map(line).reduce(reducer)
}

class Input extends Component {

  state = {
    content: ""
  }

  render() {

    return (
      <div className="tr-input">
        <textarea
          className="tr-input__textarea"
          name="test"
          id="test"
          cols="30"
          rows="10"
          value={this.state.content}
          onChange={e => this.setState({ content: e.target.value })}
          placeholder={getPlaceholder()}
        ></textarea>
      </div>
    )
  }
}

export default Input
