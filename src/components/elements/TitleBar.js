import React from 'react'

const TitleBar = props => {

  const { text, onClick } = props
  return (
    <div className="tr-title-bar" onClick={onClick} style={{cursor: onClick ? 'pointer' : 'initial'}} >
      <div className="tr-title-bar__text">
      {text}
      </div>
    </div>
  )
}

export default TitleBar
