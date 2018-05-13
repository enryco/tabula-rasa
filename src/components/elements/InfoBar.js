import React from 'react'

const InfoButton = props => {

  const { text, onClick } = props
  const parentHeight = this.titleBarRef && this.titleBarRef.clientHeight
  console.log(parentHeight)

  return (
    <div
      className="tr-info-bar"
      onClick={onClick}
      style={{ cursor: onClick ? 'pointer' : 'initial' }}
      ref={e => this.titleBarRef = e}
    >
      <div
        className="tr-info-bar__text"
        style={{ width: parentHeight ? parentHeight : 0 }}
      >
        {text}
      </div>
    </div>
  )
}

export default InfoButton
