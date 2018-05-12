import React from 'react'

const Button = props => {

  const { firstline, secondline, onClick } = props
  return (
    <div className="tr-button" onClick={onClick} >
      <div>{firstline}</div>
      <div>{secondline}</div>
    </div>
  )
}

export default Button
