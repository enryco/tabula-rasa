import React from 'react'

const Result = props => {

  const { html } = props
  return (
    <div className="tr-result" >
      <div className="tr-result__textarea" dangerouslySetInnerHTML={{ __html: html }}>
      </div>
    </div>
  )
}

export default Result
