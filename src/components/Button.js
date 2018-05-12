import React from 'react'

const Button = props => {

  const { text, onClick } = props
  return (
    <div className="tr-button" onClick={onClick} >
      {text}
    </div>
  )
}

export default Button
