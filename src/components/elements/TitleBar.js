import React from 'react'

const TitleBar = props => {

  const { text, onClick } = props
  const parentHeight = this.titleBarRef && this.titleBarRef.clientHeight
console.log(parentHeight)

  return (
    <div
      className="tr-title-bar"
      onClick={onClick}
      style={{ cursor: onClick ? 'pointer' : 'initial' }}
      ref={e => this.titleBarRef = e}
      >
      <div
      className="tr-title-bar__text"
      style={{width: parentHeight ? parentHeight : 374 }}
      >
        {text}
      </div>
    </div>
  )
}

export default TitleBar
